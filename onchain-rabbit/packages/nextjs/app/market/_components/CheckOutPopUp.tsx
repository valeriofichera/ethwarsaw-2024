"use client";

import React, { useContext } from "react";
import { ConfirmedImage } from "~~/components/assets/ConfirmedImage";
import { ConfirmedImageSmall } from "~~/components/assets/ConfirmedImageSmall";
import CircleLoading from "~~/components/loading/CircleLoading";
import CircleLoadingSmall from "~~/components/loading/CircleLoadingSmall";
import { Separator } from "~~/components/ui/separator";
import { FunnyContext } from "~~/services/funny/funnyContext";
import SwitchFunnyRpc from "./SwitchFunnyRpc";
import { SignTxBatch } from "./SignTxBatch";

export const CheckOutPopUp = () => {
  const context = useContext(FunnyContext);

  const handleToggle = () => {
    context?.setCheckoutPopUp(false);
  };

  const handleCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <>
      {!context?.checkoutPopUp && (
          <></>
      )}
      {context?.checkoutPopUp && (
        <div
          className="fixed inset-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-40 cursor-pointer"
          onClick={handleToggle}
        >
          <div
            className="card w-1/3 rounded-lg relative z-50 cursor-default flex flex-col items-start p-5"
            onClick={handleCardClick}
          >

          <div className="mb-5">
            <div className="flex flex-row mb-2 items-start">
              <h1 className="text-2xl">processing ...</h1>
            </div>

            <p className="text-slate-400 text-xs text-left">
            please don’t leave this page and follow the instructions while processing
            </p>
          </div>

            <div className="w-full">
              <div className="flex flex-row items-center justify-between w-full gap-4">
                <CircleLoading />
                <Separator className="w-3/4 flex-shrink" />
                <ConfirmedImage />
              </div>
            
            <div className="pl-5 pt-5">
              <div className="flex flex-row gap-3 items-center">
                          <h1 className="">
                              Step 1: 
                            </h1>
                            <p className="text-slate-400 text-xs text-left">
                            go to the right network & sign all pending TX
                          </p>
              </div>

              <div className="pt-5 pl-3 flex flex-col gap-5">

              <div className="flex flex-row gap-4 items-center">
                <SwitchFunnyRpc />
              {!context?.rpcSwitched && (
                <CircleLoadingSmall />
              )}
              {context?.rpcSwitched && (
                  <ConfirmedImageSmall />
              )}
                  <p className="text-xs text-left">
                    switch the Network RPC
                  </p>
              </div>

              <div className="flex flex-row gap-4 items-center">
                <SignTxBatch />
              {!context.txSuccess && (
                <CircleLoadingSmall />
              )}
              {context.txSuccess && (
                  <ConfirmedImageSmall />
              )}
                  <p className="text-xs text-left">
                    sign all pending TX inside your wallet extension
                  </p>
              </div>

              </div>

            </div>
            </div>
          </div>
          </div>
      )}
    </>
  );
};
