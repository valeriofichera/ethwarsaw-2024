"use client";

import { useContext, useEffect, useState } from "react";
import PreferenceButton from "../_components/PreferenceButton";
import PreferenceSliders from "../_components/PreferenceSliders";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Info, Trash2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~~/components/ui/accordion";
import { Tooltip, TooltipContent, TooltipProvider } from "~~/components/ui/tooltip";
import { fetchAllModules } from "~~/services/funny/backendConnector";
import { FunnyContext } from "~~/services/funny/funnyContext";
import { Separator } from "~~/components/ui/separator";

const Summary = () => {
  const context = useContext(FunnyContext);
  const [selectedModulesObjects, setSelectedModulesObjects] = useState<any[]>([]);
  
  useEffect(() => {
    const getSelectedModulesObjects = async () => {
      if (!context) {
        console.error("Context is null");
        return;
      }

      try {
        const response = await fetchAllModules();
        const allModules = response.message.data;
        const selectedModules = context.selectedModules;
        const matchingModules = allModules.filter((module: any) => selectedModules.includes(module.name));
        setSelectedModulesObjects(matchingModules);
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    getSelectedModulesObjects();
  }, [context]);

  if (!context) {
    console.error("Context is null");
    return null;
  }

  const isModulesEmpty = context.selectedModules.length === 0;

  return (
    <div className="grid grid-cols-8 gap-3 w-full h-full">

      <div className="col-span-5">

      {selectedModulesObjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full h-full gap-5">
          <h1 className="text-xl">please select modules</h1>
        </div>
      ) : (
        selectedModulesObjects
          .sort((a, b) => a.chain.localeCompare(b.chain))
          .reduce((acc: any[], module: any) => {
            const lastGroup = acc[acc.length - 1];
            if (lastGroup && lastGroup.chain === module.chain) {
              lastGroup.modules.push(module);
            } else {
              acc.push({ chain: module.chain, modules: [module] });
            }
            return acc;
          }, [])
          .map((group: any, groupIndex: number) => (
            <div key={groupIndex} className="w-full">
              <div className="flex justify-between items-center">
                <h1 className="z-10000 text-2xl">{group.chain}</h1>
                {group.modules.some((module: any) => module.testnet) && (
                  <p className="items-center border rounded-2xl text-destructive-foreground px-4 text-sm">testnet</p>
                )}
              </div>
              <Separator />

              {group.modules.map((module: any, index: number) => (
                <div key={index} className="module-summary flex flex-col my-3">
                  <div className="flex flex-row items-center justify-between">
                    <h1>{module.name}</h1>
                    <Trash2 className="h-4 w-4" />
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger>
                        <p className="text-slate-500 text-xs">{module.description}</p>
                      </AccordionTrigger>
                      <AccordionContent>
                        <table className="w-full table-auto">
                          <thead>
                            <tr>
                              <th className="px-4 py-2 w-1/12">#</th>
                              <th className="px-4 py-2 text-left pl-5 w-5/12">Transaction</th>
                              <th className="px-4 py-2 text-right pr-5 w-6/12">Project</th>
                            </tr>
                          </thead>
                          <tbody>
                            {module.actions.map((action: string, actionIndex: number) => (
                              <tr key={actionIndex} className="items-center text-center text-xs">
                                <td className="py-2 border text-center w-1/12">{actionIndex + 1}</td>
                                <td className="py-2 border text-left pl-5 w-5/12">{action}</td>
                                <td className="py-2 border text-right pr-5 w-6/12">{module.project}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              ))}
            </div>
          ))
      )}

      </div>

      <div className="col-span-3 relative">

        <div className="card items-start p-5 flex flex-col">

          <div>
            <div className="flex flex-row gap-1 items-start">
              <h1 className="text-2xl">set preferences</h1>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="items-start">
                    <Info className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent className="w-[250px] border border-destructive-foreground overflow-visible absolute z-20">
                    <p className="text-xs">the funny.money engine generates a randomized set of transactions based on your selection & preferences</p>
                    <p className="text-[8px] text-slate-400">-{">"} activity is by default net balance neutral</p>
                    <p className="pt-1 text-xs text-slate-500">this includes:</p>
                    <li className="text-xs text-slate-500">order & time of execution</li>
                    <li className="text-xs text-slate-500">values and assets</li>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <p className="text-slate-500 text-xs">
              configure the 
              <span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="text-slate-400 font-semibold underline px-1 relative z-10">
                      total balance
                    </TooltipTrigger>
                    <TooltipContent className="w-[250px] border border-destructive-foreground overflow-visible absolute z-20">
                      <p className="text-xs">The selected balance will affect the metrics to be achieved by the performed transactions (e.g transaction volume)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </span>
              &
              <span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="text-slate-400 font-semibold underline px-1 relative z-10">
                      duration
                    </TooltipTrigger>
                    <TooltipContent className="w-[250px] border border-destructive-foreground overflow-visible absolute z-20">
                      <p className="text-xs">The selected duration will affect the metrics to be achieved by the performed transactions <br/>(e.g unique active days, activity period)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </span>
              for the selected activity.
            </p>
            <div className="py-5">
              <Separator />
            </div>
          </div>

          <div className={`relative h-full w-full ${isModulesEmpty ? '' : 'hidden'}`}>
            {isModulesEmpty && (
              <h1 className="absolute z-10 mt-20 h-1/2 inset-0 flex items-center justify-center text-xl text-destructive-foreground">
                select modules!
              </h1>
            )}
          </div>
          
          <div className={`relative w-full ${isModulesEmpty ? 'blur-sm pointer-events-none' : ''}`}>
            {isModulesEmpty && (
              <div className="absolute z-10 inset-0 flex items-center justify-center">
              </div>
            )}
            <PreferenceSliders />
            <PreferenceButton />
            
          </div>

        </div>

      </div>
    </div>
  );
};

export default Summary;
