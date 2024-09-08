import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { Badge } from "~~/components/ui/badge";
import { fetchAllModules } from "~~/services/funny/backendConnector";
import dragonswap from "~~/components/assets/modules/dragonswap.png";
import azero from "~~/components/assets/modules/azero.png";
import zircuit from "~~/components/assets/modules/zircuit.png";
import optimism from "~~/components/assets/modules/optimism.png";
import sei from "~~/components/assets/modules/sei.png";
import mantle from "~~/components/assets/modules/mantle.png";
import { useAccount } from "wagmi";
import ModuleSelectButton from "./ModuleSelectButton";
import { FunnyContext } from "~~/services/funny/funnyContext";

const imageMap: { [key: string]: string } = {
  dragonswap: dragonswap.src,
  azero: azero.src,
  zircuit: zircuit.src,
  optimism: optimism.src,
  sei: sei.src,
  mantle: mantle.src
};

const ModuleSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [modules, setModules] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const context = useContext(FunnyContext);

  const userAddress = useAccount();

  useEffect(() => {
    const getModules = async () => {
      try {
        const response = await fetchAllModules();
        setModules(response.message.data);
      } catch (error) {
        console.error("All module req failed:", error);
        setError((error as Error).message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    getModules();
  }, []);

  if (!context) {
    throw new Error("DataContext not found");
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-2 items-start justify-center min-h-fit w-full gap-5">
      {modules.map((module: any, index: number) => (
        <div key={index} className="card p-5 flex flex-row gap-5 min-w-fit">
          <div>
            <Image
              src={imageMap[module.image] || "/default.png"}
              alt={module.name}
              width={200}
              height={200}
            />
          </div>

          <div className="flex flex-col justify-between items-center">
            <div className="flex flex-col items-start gap-3">
              <h1 className="text-2xl">{module.name}</h1>

              <p className="text-slate-500 text-xs">{module.description}</p>

              <div className="flex flex-wrap">
                <Badge
                  key={index}
                  className="font-extralight bg-transparent border-destructive-foreground rounded-lg flex items-start px-1"
                >
                  {module.chain}
                </Badge>
                {module.badges.map((badge: any, index: number) => (
                  <Badge
                    key={index}
                    className="font-extralight bg-transparent border-accent rounded-lg flex items-start px-1"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-row items-center justify-start w-full">
                <p className="text-slate-500 text-xs text-right">
                  learn more <span className="text-[8px] text-slate-500">-{">"}</span>
                </p>
              </div>
            </div>
            <div className="w-full flex justify-end">
              <ModuleSelectButton
                moduleName={module.name}
                userAddress={`${userAddress}`}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModuleSection;
