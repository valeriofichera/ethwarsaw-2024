'use client';
import type { NextPage } from "next";
import { WriteOnlyFunctionForm } from "./_components/contract";

import externalContracts from "~~/contracts/externalContracts";


const yourOnChangeHandler = () => {
  // Handle the change event
};

const Debug: NextPage = () => {
  return (
    <>
      <WriteOnlyFunctionForm
        abi={externalContracts[11155111].MyToken.abi} 
        abiFunction={externalContracts[11155111].MyToken.abi[9]}  // Assuming 'transfer' is the 10th function in the ABI array
        onChange={yourOnChangeHandler} 
        contractAddress={externalContracts[11155111].MyToken.address} 
      />

    </>
  );
};

export default Debug;
