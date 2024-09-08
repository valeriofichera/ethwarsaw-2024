import React, { useState, useContext } from 'react';
import { Button } from '~~/components/ui/button';
import { ShoppingBasket } from 'lucide-react';
import { enableModulesForUser } from '~~/services/funny/backendConnector';
import { FunnyContext } from "~~/services/funny/funnyContext";

const ModuleSelectButton = ({ moduleName, userAddress }: { moduleName: string; userAddress: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(FunnyContext);

  const handleSelectModule = async () => {
    setIsLoading(true);
    try {
      await enableModulesForUser(userAddress, [moduleName], [true]);
      if (context) {
        context.setSelectedModules((prev) => [...prev, moduleName]);
      } else {
        console.error("Context is null");
      }
    } catch (error) {
      console.error("Error enabling module:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isSelected = context?.selectedModules.includes(moduleName);

  return (
    <Button
      className={`justify-center rounded-lg ${isSelected ? 'bg-gray-400 text-white' : ''}`}
      onClick={handleSelectModule}
      disabled={isLoading || isSelected}
    >
      {isLoading ? (
        <div className='flex flex-row gap-3 items-center'>
          <ShoppingBasket className="h-5 w-5" />
          loading
        </div>
      ) : isSelected ? (
        <div className='flex flex-row gap-3 items-center'>
          <ShoppingBasket className="h-5 w-5" />
          selected !
        </div>
      ) : (
        <div className='flex flex-row gap-3 items-center'>
          <ShoppingBasket className="h-5 w-5" />
          select
        </div>
      )}
    </Button>
  );
};

export default ModuleSelectButton;