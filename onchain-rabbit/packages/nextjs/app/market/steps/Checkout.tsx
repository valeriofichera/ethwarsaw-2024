"use client";

import { useContext, useEffect, useState } from "react";
import CheckOutButton from "../_components/CheckOutButton";
import CheckOutTable from "../_components/CheckOutTable";
import { Trigger } from "@radix-ui/react-tooltip";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider } from "~~/components/ui/tooltip";
import { useAccount } from "wagmi";
import { Separator } from "~~/components/ui/separator";
import { fetchUserData } from "~~/services/funny/backendConnector";
import { FunnyContext } from "~~/services/funny/funnyContext";

const Checkout = () => {
  const userAddress = useAccount().address;
  const context = useContext(FunnyContext);
  const [userData, setUserData] = useState<any[]>([]);

  const fetchPendingTxs = async () => {
    try {
      const data = await fetchUserData(`${userAddress}`, "pending");
      setUserData(data);
      console.log("All pending Tx", data);
    } catch (error) {
      console.error("Error fetching pending transactions:", error);
    }
  };

  useEffect(() => {
    fetchPendingTxs();
  }, [userAddress]);

  if (!context) {
    console.error("Context is null");
    return null;
  }

  const isModulesEmpty = context.selectedModules.length === 0;

  return (
    <div className="grid grid-cols-8 gap-3 w-full h-full">
      <div className="col-span-5">
        <CheckOutTable />
      </div>

      <div className="col-span-3">
        <div className="card items-start p-5 flex flex-col">
          <div>
            <div className="flex flex-row gap-1 items-start">
              <h1 className="text-2xl">sign & forget</h1>
              <TooltipProvider>
                <Tooltip>
                  <Trigger className="items-start">
                    <Info className="h-4 w-4" />
                  </Trigger>
                  <TooltipContent className="w-[250px] border border-destructive-foreground overflow-visible absolute z-20">
                    <p className="text-xs">the funny.money engine generates a randomized set of transactions based on your selection & preferences</p>
                    <p className="text-[8px] text-slate-400">-{">"} activity is by default net balance neutral</p>
                    <p className="pt-1 text-xs text-slate-500">this includes:</p>
                    <ul>
                      <li className="text-xs text-slate-500">order & time of execution</li>
                      <li className="text-xs text-slate-500">values and assets</li>
                    </ul>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <p className="text-slate-500 text-xs">
              configure the
              <span>
                <TooltipProvider>
                  <Tooltip>
                    <Trigger className="text-slate-400 font-semibold underline px-1 relative z-10">
                      total balance
                    </Trigger>
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
                    <Trigger className="text-slate-400 font-semibold underline px-1 relative z-10">
                      duration
                    </Trigger>
                    <TooltipContent className="w-[250px] border border-destructive-foreground overflow-visible absolute z-20">
                      <p className="text-xs">The selected duration will affect the metrics to be achieved by the performed transactions <br />(e.g unique active days, activity period)</p>
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
            
          <div className={`relative w-full items-center justify-center ${isModulesEmpty ? '' : 'hidden'}`}>
            {isModulesEmpty && (
              <h1 className="absolute mt-5 z-10 inset-0 flex items-center justify-center text-xl text-destructive-foreground">
                select modules!
              </h1>
            )}
          </div>
          
          <div className={`relative w-full items-center justify-center ${isModulesEmpty ? 'blur-sm pointer-events-none' : ''}`}>
            {isModulesEmpty && (
              <div className="absolute z-10 inset-0 flex items-center justify-center">
              </div>
            )}
            <div className="w-full flex items-center justify-center">
              <CheckOutButton />
            </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Checkout;
