"use client";

import type { NextPage } from "next";
import { WhiteList } from "~~/components/WhiteList";

const Sign: NextPage = () => {
  return (
    <>
      <WhiteList verified={false} />
      <div className=" flex items-center flex-col flex-grow pt-10 gap-2"></div>
    </>
  );
};

export default Sign;
