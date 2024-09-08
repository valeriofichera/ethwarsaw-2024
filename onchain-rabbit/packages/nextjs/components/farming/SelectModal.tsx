"use client";

import { Separator } from "../ui/separator";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";
import { Checkbox } from "~~/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~~/components/ui/form";
import { Skeleton } from "~~/components/ui/skeleton";
import { Slider } from "~~/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~~/components/ui/tooltip";
import { useWatchBalance } from "~~/hooks/scaffold-eth/useWatchBalance";

// import { FunnyContext } from "~~/services/funny/funnyContext";

export const userData: any[] = [];

export const SelectModal = (props: {
  projectsAndChains: any;
  selectedModules: any;
  setSelectedModules: any;
  isLoading: any;
  form: any;
  onSubmit: any;
  maxBalance: any;
  setMaxBalance: any;
  endTime: any;
  setEndTime: any;
}) => {
  const { address } = useAccount();

  const {
    projectsAndChains,
    // savedModules,
    // savedActions,
    selectedModules,
    setSelectedModules,
    isLoading,
    // setIsLoading,
    form,
    onSubmit,
    maxBalance,
    setMaxBalance,
    endTime,
    setEndTime,
  } = props;

  const { data: balance } = useWatchBalance({ address });
  const userBalance = balance ? Number(formatEther(balance.value)) : 5000;
  const maxEndTime = 24;

  return (
    <TooltipProvider>
      <div className="w-full lg:grid h-2/3 lg:grid-cols-8 px-10 py-2 items-center xl:mt-10 lg:mt-4">
        <div className="grid items-center justify-center lg:grid-cols-4 col-start-1 col-span-3">
          <div className="col-span-4 gap-6">
            {/* <Coverage selected={isCoverageSelected} /> */}
            <div className="w-7/8 pl-0 pr-4 py-8 items-center gap-3 h-1/2 flex justify-center">
              <div className="w-full">
                <h1 className="w-full text-center text-lg xl:text-xl font-bold mb-5">Select Project or Chain</h1>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="items"
                      render={() => (
                        <FormItem>
                          <div className="mb-4 mx-auto flex flex-col items-center">
                            <FormLabel className="text-base">Projects and Chains</FormLabel>
                            <FormDescription className="mx-auto flex flex-col">
                              Select the projects and chains you want to filter by.
                            </FormDescription>
                          </div>
                          {isLoading ? (
                            <div className="grid grid-cols-3 gap-4">
                              {Array.from({ length: 9 }).map((_, index) => (
                                <div
                                  key={index}
                                  className="flex flex-row items-start space-x-3 space-y-0 justify-center"
                                >
                                  <Skeleton className="h-[25px] w-[150px] rounded-xl" />
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex flex-col items-start gap-y-4 gap-x-4 w-full">
                              {projectsAndChains.map((item: { id: string; label: string }, index: number) => (
                                <FormField
                                  key={item.id}
                                  control={form.control}
                                  name="items"
                                  render={({ field }) => {
                                    const isLastRow =
                                      Math.floor(index / 3) === Math.floor((projectsAndChains.length - 1) / 3);
                                    const isSingleItemInLastRow =
                                      projectsAndChains.length % 3 === 1 && index === projectsAndChains.length - 1;
                                    const isTwoItemsInLastRow =
                                      projectsAndChains.length % 3 === 2 &&
                                      (index === projectsAndChains.length - 2 ||
                                        index === projectsAndChains.length - 1);
                                    const justifyClass =
                                      isLastRow &&
                                      (isSingleItemInLastRow
                                        ? "justify-center"
                                        : isTwoItemsInLastRow
                                          ? "justify-center first:justify-start"
                                          : "");
                                    const changeSelected = (checked: boolean, id: string) => {
                                      const newValue = checked
                                        ? [...field.value, id]
                                        : [...field.value?.filter((value: string) => value !== id)];
                                      field.onChange(newValue);
                                      if (checked) {
                                        setSelectedModules([...selectedModules, id]);
                                      } else {
                                        setSelectedModules(
                                          selectedModules.filter((selMod: string) => {
                                            return selMod !== id;
                                          }),
                                        );
                                      }
                                    };

                                    return (
                                      <FormItem
                                        key={item.id}
                                        className={`ml-1 mr-2 flex flex-row items-start space-x-2 space-y-0 ${justifyClass}`}
                                      >
                                        <FormControl>
                                          <Checkbox
                                            id={item.id}
                                            className="border-white bg-transparent"
                                            checked={selectedModules.includes(item.id)}
                                            onCheckedChange={checked => {
                                              changeSelected(checked as boolean, item?.id);
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel
                                          className="font-normal"
                                          onClick={() => {
                                            changeSelected(!selectedModules.includes(item.id), item.id);
                                          }}
                                        >
                                          <Tooltip>
                                            <TooltipTrigger>
                                              {item.id.length > 15 ? item.id.slice(0, 15) + "..." : item.id}
                                            </TooltipTrigger>
                                            <TooltipContent className="bg-black/40 backdrop-blur-md">
                                              <p className="">{item.id}</p>
                                            </TooltipContent>
                                          </Tooltip>
                                        </FormLabel>
                                      </FormItem>
                                    );
                                  }}
                                />
                              ))}
                            </div>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>

        <div className="grid items-center justify-center lg:grid-cols-5 col-start-5 col-span-5">
          <Separator orientation="vertical" className="my-1 h-2/3 items-center" />
          {/* {JSON.stringify(selectedModules)} */}
          <div className="grid col-span-4 gap-6">
            <div
              className="mx-1 p-5 mb-5 border-[1px] rounded-2xl shadow-sm"
              style={{ borderImage: "linear-gradient(to right, #B5F327, #FF82EC) 1" }}
            >
              <p className="text-base md:text-lg mb-2">
                max balance: <span className="font-bold">{formatEther(maxBalance)} ETH</span>
              </p>
              <Slider
                defaultValue={[0]}
                max={userBalance}
                step={0.0001}
                onValueChange={value => setMaxBalance(parseEther(`${value[0]}`).toString().replace("n", ""))}
              />
              <p className="text-right text-xs text-slate-500/80 mt-2">account for gas fees</p>
            </div>
            <div
              className="mx-1 p-5 border-[1px] rounded-2xl shadow-sm"
              style={{ borderImage: "linear-gradient(to right, #B5F327, #FF82EC) 1" }}
            >
              <p className="text-base md:text-lg mb-2">
                end time: <span className="font-bold">{endTime} hours</span>
              </p>
              <Slider
                defaultValue={[1]}
                min={1}
                max={maxEndTime}
                step={1}
                onValueChange={value => setEndTime(value[0])}
              />
              <p className="text-right text-xs text-slate-500/80 mt-2">defaults to 1h if nothing was selected</p>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};
