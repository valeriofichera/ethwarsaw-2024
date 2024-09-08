"use client";

import { useContext } from "react";
import CartButton from "../_components/CartButton";
import ModuleSection from "../_components/ModuleSection";
import { Switch } from "~~/components/ui/switch";
import { FunnyContext } from "~~/services/funny/funnyContext";
import { NetworkSelector } from "../_components/NetworkSelector";

const Select = () => {
  const context = useContext(FunnyContext);
  return (
    <div className="w-full">
      <nav className="mb-5 border bg-muted/40 rounded-xl py-2 px-4 flex flex-row justify-between items-center w-full space-x-4">
<NetworkSelector />

        <div className="w-1/3">
          
        </div>

        <div className="flex flex-row gap-2">
          testnet only <Switch />
        </div>
      
        {context && (
          <CartButton />
        )}

      </nav>
      <div className="">
        <ModuleSection />
      </div>
    </div>
  );
};

export default Select;