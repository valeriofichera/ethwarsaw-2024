"use client";

import { useContext, useEffect, useCallback } from "react";
import { Mantle, AlephZero, Sei } from "../../../components/scaffold-eth/RainbowKitCustomConnectButton/NetworkConfig";
import { toHex } from "viem";
import { FunnyContext } from "~~/services/funny/funnyContext";

const SwitchFunnyRpc = () => {
  const context = useContext(FunnyContext);

  const addToNetwork = useCallback(async () => {
    try {
      const sNet = Mantle;
      if (window.ethereum) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: toHex(sNet.id),
              chainName: `${sNet.name}`,
              rpcUrls: [...sNet.rpcUrls.default.http],
              iconUrls: [""],
              nativeCurrency: sNet.nativeCurrency,
              blockExplorerUrls: [sNet.blockExplorers.default.url],
            },
          ],
        });
        console.log("Switched to custom RPC");
        console.log("RPC switched:", context?.rpcSwitched);
        context?.setRpcSwitched(true); // Only set this if the network switch was successful
      } else {
        throw new Error("Ethereum object not found");
      }
    } catch (error) {
      console.error("Failed to add network", error);
    }
  }, [context]);

  useEffect(() => {
    if (context?.switchToFunnyRpc) {
      addToNetwork();
    }
  }, [context?.switchToFunnyRpc, addToNetwork]);

  return null;
};

export default SwitchFunnyRpc;
