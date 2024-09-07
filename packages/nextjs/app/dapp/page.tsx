"use client";

import type { NextPage } from "next";
// import ForceRpcButton from "~~/components/ForceRpcButton";
import { HowItWorks } from "~~/components/HowItWorks";
import { Separator } from "~~/components/ui/separator";

const Dapp: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 w-full h-full">
      <div className="w-1/4 m-5">
        <Separator />
      </div>
      <HowItWorks />
    </div>
  );
};

export default Dapp;
