import React, { useContext } from 'react';
import { ArrowUpRight, ShoppingCart } from 'lucide-react';
import { FunnyContext } from "~~/services/funny/funnyContext";
import { Badge } from '~~/components/ui/badge';

const CartButton = () => {
  const context = useContext(FunnyContext);

  if (!context) {
    console.error("Context is null");
    return null;
  }

  const selectedModulesCount = context.selectedModules.length;

  const handleFarmingStep = () => {
    context.setFarmingStep(1);
  }

  return (
    <button onClick={handleFarmingStep} className="cursor-pointer">
    <div className="flex flex-row items-start cursor-pointer">
        <ShoppingCart className="h-12 w-12" />
        <Badge className="z-10 ml-[-15px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
            {selectedModulesCount}
        </Badge>
        <ArrowUpRight className="h-6 w-6" />
    </div>
    </button>
  );
};

export default CartButton;