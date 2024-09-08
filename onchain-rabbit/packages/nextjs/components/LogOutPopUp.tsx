"use client";

import React, { useContext, useState, useEffect } from "react";
import { ConfirmedImage } from "~~/components/assets/ConfirmedImage";
import CircleLoading from "~~/components/loading/CircleLoading";
import { Separator } from "~~/components/ui/separator";
import { FunnyContext } from "~~/services/funny/funnyContext";
import { useDisconnect } from "wagmi";

export const LogOutPopUp = () => {
  const context = useContext(FunnyContext);
  const { disconnect } = useDisconnect();
  const [showConfirmedImage, setShowConfirmedImage] = useState(false);

  useEffect(() => {
    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;

    if (context?.logoutPopUp) {
      timer1 = setTimeout(() => {
        setShowConfirmedImage(true);
        timer2 = setTimeout(() => {
          context?.setLogoutPopUp(false);
          disconnect();
        }, 500);
      }, 2000);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [context?.logoutPopUp, disconnect]);

  const handleToggle = () => {
    context?.setLogoutPopUp(false);
  };

  const handleCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <>
      {!context?.logoutPopUp && <></>}
      {context?.logoutPopUp && (
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
                <h1 className="text-2xl">logging out ...</h1>
              </div>
              <p className="text-slate-400 text-xs text-left">
                all your progress is saved, see u soon!
              </p>
            </div>
            <div className="w-full">
              <div className="flex flex-row items-center justify-between w-full gap-4">
                {showConfirmedImage ? <ConfirmedImage /> : <CircleLoading />}
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
