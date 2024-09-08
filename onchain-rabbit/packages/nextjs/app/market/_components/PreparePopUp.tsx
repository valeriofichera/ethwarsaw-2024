"use client";

import React, { useContext } from "react";
import { ConfirmedImage } from "~~/components/assets/ConfirmedImage";
import CircleLoading from "~~/components/loading/CircleLoading";
import { Separator } from "~~/components/ui/separator";
import { FunnyContext } from "~~/services/funny/funnyContext";

export const PreparePopUp = () => {
  const context = useContext(FunnyContext);

  const handleToggle = () => {
    context?.setPreparePopUp(false);
  };

  const handleCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <>
      {!context?.preparePopUp && <></>}
      {context?.preparePopUp && (
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
                <h1 className="text-2xl">preparing activity ...</h1>
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};
