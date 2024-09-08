"use client"
import { IDKitWidget, VerificationLevel, ISuccessResult } from '@worldcoin/idkit'
import React from 'react';

const worldcoin_logo = 'https://docs.worldcoin.org/_next/static/media/worldcoin-logo.ad409aa2.svg';

interface WorldIdProps {
  onClick: () => void;
}

// Calls your implemented server route
const handleVerify = async (proof: any, close: () => void) => {
    const res = await fetch(
      `http://localhost:3000/verify-worldid`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(proof),
      }
    );
    if (!res.ok) {
        close(); // Close the widget if verification fails
        throw new Error("Verification failed."); // IDKit will display the error message to the user in the modal
    }
};

// Functionality after verifying
const onSuccess = (result: ISuccessResult) => {
  console.log("Success", result);
};

const WorldId: React.FC<WorldIdProps> = ({ onClick }) => {
  return (
    <IDKitWidget
      app_id="app_staging_05b42acd6f2c4cf0ad8856657e796e17"
      action="human_verify"
      verification_level={VerificationLevel.Device}
      handleVerify={close}
      onSuccess={onSuccess}>
      {({ open }) => (
        <div className="flex flex-col items-center mt-5">
          <button
            onClick={() => {
              open();
              onClick();
            }}
            className="card text-slate-300 py-1 px-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 text-lg"
          >
            Verify Humanity
          </button>
          <div className="flex items-center mt-4 bg-slate-200 px-3 py-1 rounded-full">
            <span className="text-black mr-2">powered by</span>
            <img src={worldcoin_logo} alt="Worldcoin Logo" className="h-6" />
          </div>
        </div>
      )}
    </IDKitWidget>
  );
};

export default WorldId;