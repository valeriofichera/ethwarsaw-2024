// @ts-nocheck
"use client";

import { useContext, useEffect } from "react";
import { formatEther, parseEther } from "viem";
import { useAccount, useSendTransaction } from "wagmi";
import { fetchUserData } from "~~/services/funny/backendConnector";
import { FunnyContext } from "~~/services/funny/funnyContext";

export const SignTxBatch = () => {
  const { address } = useAccount();
  const { sendTransaction } = useSendTransaction();
  const context = useContext(FunnyContext);
  let { pendingTxs: userData } = context;
  const signTx = context.signTx;

  const fetchUser = async (address: string) => {
    console.log(userData, " ", address);
    if (address) {
      try {
        userData = await fetchUserData(address, "pending");
        if (userData.length > 0) {
          console.log(
            "Sending transaction with details:",
            `account: ${address} |`,
            `data: ${userData[0].unsigned_tx.data} |`,
            `to: ${userData[0].unsigned_tx.to} |`,
            `maxPriorityFeePerGas: ${userData[0].unsigned_tx.maxPriorityFeePerGas} |`,
            `maxFeePerGas: ${userData[0].unsigned_tx.maxFeePerGas} |`,
            `type: ${userData[0].unsigned_tx.type === 2 ? "eip1559" : "missing type"} |`,
            `chainId: ${userData[0].unsigned_tx.chainId} |`,
            `nonce: ${userData[0].unsigned_tx.nonce}`,
          );
          const userDataLength = userData.length;
          for (let i = 0; i < userDataLength; i++) {
            context?.setTxSuccess(false);
            const tx = userData[i].unsigned_tx;
            console.log(i, " ", formatEther(tx.value), " --> ", tx);
            try {
              const response = await sendTransaction({
                account: address,
                to: tx.to,
                data: tx.data,
                value: parseEther(formatEther(tx.value)),
                // maxPriorityFeePerGas: BigInt(tx.maxPriorityFeePerGas.hex),
                // maxFeePerGas: BigInt(tx.maxFeePerGas.hex),
                gas: BigInt(tx.gasLimit),
                chainId: tx.chainId,
                nonce: tx.nonce,
                type: tx.type === 2 ? "eip1559" : "legacy",
              });
              if (response) {
                console.log("Transaction signed:", response);
                context?.setTxSuccess(true);
              }
            } catch (error) {
              console.error("Transaction rejected:", error);
              context?.setTxSuccess(false);
              break;
            }
          }
          console.log("finished batch tx sign");
        } else {
          console.error("No data fetched. Cannot send transaction.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        return [];
      }
    }
    return [];
  };

  const handleTxBatch = async () => {
    if (address) {
      await fetchUser(address);
    } else {
      console.error("Address is undefined. Cannot fetch user data.");
    }
  };

  useEffect(() => {
    if (signTx) {
      handleTxBatch();
    }
  }, [signTx, handleTxBatch]);

  return (
    <></>
  );
};
