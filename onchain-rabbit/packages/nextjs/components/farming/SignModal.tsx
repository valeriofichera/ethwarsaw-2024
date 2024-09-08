"use client";

import React from "react";
import { SignatureTable } from "../SignatureTable";

export const SignModal = () => {
  return (
    <div className="w-full lg:grid h-4/5 lg:grid-cols-1 px-10 items-center xl:mt-4 lg:mt-2">
      {/* <div className="grid items-center justify-center lg:grid-cols-1 col-start-1 col-span-3"> */}
      <SignatureTable />
      {/* </div> */}
    </div>
  );
};
