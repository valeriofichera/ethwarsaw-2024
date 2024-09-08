"use client";

import { formatEther, parseEther } from "viem";
import { Slider } from "~~/components/ui/slider";
import { useContext, useState, useEffect } from "react";
import { FunnyContext } from "~~/services/funny/funnyContext";
import { getFutureDateinHours, toTimestamp } from "~~/services/funny/funnyUtils";
import { useWatchBalance } from "~~/hooks/scaffold-eth";
import { useAccount } from "wagmi";

const PreferenceSliders = () => {
  const maxEndTime = 24;
  const context = useContext(FunnyContext);
  const { address } = useAccount();

  const [endTime, setEndTime] = useState(1);
  const [maxBalance, setMaxBalance] = useState(0); // Use number instead of BigInt

  const { data: balance } = useWatchBalance({ address });
  const userBalance = balance ? Number(formatEther(balance.value)) : 5000;

  useEffect(() => {
    const handleSetEndTimeEffect = async () => {
      try {
        if (context) {
          context.setEndTime(toTimestamp(getFutureDateinHours(endTime)));
        } else {
          console.error("Context is null");
        }
      } catch (error) {
        console.error("Error enabling module:", error);
      }
    };
    console.log("end time:", endTime);
    handleSetEndTimeEffect();
  }, [endTime, context]);

  useEffect(() => {
    if (context) {
      context.setMaxBalance(maxBalance); // Set maxBalance in context in wei
    }
  }, [maxBalance, context]);

  return (
    <div className="p-1 w-full">
        <p className="text-base font-extralight mb-3">
          max balance: <span className="font-thin">{formatEther(BigInt(context?.maxBalance || 0)).toString().replace("n", "")} ETH</span>
        </p>

        <Slider
                defaultValue={[0]}
                max={userBalance}
                step={0.0001}
                onValueChange={value => setMaxBalance(Number(parseEther(`${value[0]}`)))}
              />
        <p className="text-right text-xs text-slate-500/80 mt-2">account for gas fees</p>

        <div className="">
          <p className="text-base font-extralight mb-3">
            duration: <span className="font-thin">{endTime} hours</span>
          </p>

          <Slider
            defaultValue={[endTime]}
            min={1}
            max={maxEndTime}
            step={1}
            onValueChange={value => setEndTime(value[0])}
          />
          <p className="text-right text-xs text-slate-500/80 mt-2">defaults to 1h if nothing was selected</p>
        </div>
    </div>
  );
};

export default PreferenceSliders;