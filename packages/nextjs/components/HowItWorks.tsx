"use client";

import React, { useState } from "react";
import Image from "next/image";

export const HowItWorks = () => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <>
      {!isActive && (
        <button
          className="hidden lg:flex text-sm hover:text-[#FF82EC] hover:font-bold items-center gap-2 shrink-0"
          onClick={handleToggle}
        >
          [lorem ipsum]
        </button>
      )}
      {isActive && (
        <div
          className="fixed inset-0 w-screen h-screen bg-black bg-opacity-60 flex justify-center items-center z-40 cursor-pointer"
          onClick={handleToggle}
        >
          <div
            className="w-1/3 bg-[#1A2C19] p-4 rounded-lg relative text-center z-50 cursor-default flex flex-col items-center"
            onClick={handleCardClick}
          >
            <div className="w-4/5">
              {/* <Image
                src={}
                alt="lorem ipsum"
                width={200}
                height={200}
                className="mx-auto mb-4"
              /> */}
              <div className="pb-5">
                <h1 className="text-xl font-bold pb-1">lorem ipsum</h1>
                <h2 className="text-lg text-slate-400">
                  <span className="text-lg text-slate-400">Lorem Ipsum</span> dolor sit amet
                </h2>
              </div>

              <div className="font-light text-left">
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
                  <span className="font-bold text-red-400">Lorem ipsum</span> dolor sit amet.
                </p>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, <span className="font-bold text-blue-400">consectetur</span> adipiscing elit.{" "}
                  <span className="font-bold text-orange-400">Lorem ipsum</span> dolor sit amet.
                </p>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, <span className="font-bold text-yellow-400">consectetur</span> adipiscing elit.
                </p>
              </div>

              <div className="">
                <h2 className="text-xl text-bold pt-5 pb-2">lorem ipsum</h2>
                <ol className="list-decimal list-inside text-sm text-left mx-auto w-fit font-light">
                  <li>Lorem ipsum dolor sit amet</li>
                  <li>Consectetur adipiscing elit</li>
                  <li>Sed do eiusmod tempor</li>
                  <li>Incididunt ut labore</li>
                </ol>
                <p className="text-sm font-extralight text-pink-400 pt-3 pb-1">
                  [Lorem ipsum dolor sit amet
                  <br />
                  consectetur adipiscing elit!]
                </p>
              </div>

              <button onClick={handleToggle} className="hover:text-[#FBBF24] text-md mt-4">
                [Lorem ipsum]
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
