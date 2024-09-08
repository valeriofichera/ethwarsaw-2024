"use client";

import React, { useContext, useEffect } from "react";
import { FunnyContext } from "~~/services/funny/funnyContext";

const CheckOutButton: React.FC = () => {
  const context = useContext(FunnyContext);

  const handleCheckout = () => {
    if (context) {
      context.setCheckoutPopUp(true);
      context.setSwitchToFunnyRpc(true);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (context?.checkoutPopUp && !context?.switchToFunnyRpc) {
        context.setSwitchToFunnyRpc(true);
      }
      if (context?.rpcSwitched && !context?.signTx) {
        context.setSignTx(true);
      }
      if (context?.txSuccess) {
        context.setCheckoutPopUp(false);
        context.setSwitchToFunnyRpc(false);
        context.setSignTx(false);
        context.setTxSuccess(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [context]);

  return (
    <button onClick={handleCheckout} className="btn btn-primary">
      Checkout
    </button>
  );
};

export default CheckOutButton;