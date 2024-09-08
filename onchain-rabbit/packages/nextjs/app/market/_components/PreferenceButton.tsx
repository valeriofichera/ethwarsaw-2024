"use client";

import { useContext, useState } from "react";
import { useAccount } from "wagmi";
import { fetchUserData, prepareActions } from "~~/services/funny/backendConnector";
import { FunnyContext } from "~~/services/funny/funnyContext";
import { getFutureDateinHours, toTimestamp } from "~~/services/funny/funnyUtils";
import WorldId from "./WorldId";

export const userData: any[] = [];

const PreferenceButton = () => {
  const context = useContext(FunnyContext);
  const address = useAccount().toString();

  const selectedModules = context?.selectedModules || [];
  const maxBalance = context?.maxBalance?.toString().replace("n", "") || "0";
  const startTime = toTimestamp(new Date()).toString();
  const endTime = toTimestamp(getFutureDateinHours(context?.endTime || 1)).toString();

  const { setPendingTxs }: any = context;

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handlePrepareActions = async () => {
    if (context) {
      context.setPreparePopUp(true);
    }
    setLoading(true);
    console.log("Button clicked, preparing actions...");
    try {
      if (context) {
        context.setStartTime(toTimestamp(new Date()));
        context.setEndTime(toTimestamp(getFutureDateinHours(context.endTime || 1)));

        console.log("preparing actions based on this data:", {
          address,
          selectedModules,
          maxBalance,
          startTime,
          endTime
        });

        const result = await prepareActions(
          address,
          selectedModules,
          maxBalance,
          startTime,
          endTime
        );
        console.log("API Response:", result);
        console.log("Actions prepared successfully:", result);
        if (context) {
          context.setPreparePopUp(false);
          context.setFarmingStep(2);
        }
        setResponse(result);
      } else {
        console.error("Context is null");
      }
    } catch (error) {
      console.error("Error preparing actions:", error);
    } finally {
      setLoading(false);
      console.log("Action preparation completed.");
    }

    const userData = await fetchUserData(address, "pending");
    setPendingTxs(userData);
    console.log("All pending Tx", userData);
  };
  
  const [isWorldIdClicked, setIsWorldIdClicked] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const handleWorldIdClick = () => {
    setClickCount(prevCount => {
      const newCount = prevCount + 1;
      if (newCount >= 2) {
        setIsWorldIdClicked(true);
      }
      return newCount;
    });
  };
  return (
    <div className="flex flex-col mt-5 text-center">
      preparig activity once verified!
      {!isWorldIdClicked && <WorldId onClick={handleWorldIdClick} />}
      <button
        onClick={handlePrepareActions}
        disabled={loading}
        className="btn btn-primary mt-5 blur-sm"
      >
        {loading ? "Loading..." : "Prepare Actions"}
      </button>
      {response && (
        <div className="response">
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PreferenceButton;
