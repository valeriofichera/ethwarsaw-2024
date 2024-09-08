"use client";

// import Alerting from "~~/components/Alerting";
// import { Testing } from "./auth/test";
import type { NextPage } from "next";
import { Separator } from "~~/components/ui/separator";
import ComingSoonSection from "~~/components/ComingSoonSection";
import { CalculatorSection } from "~~/components/CalculatorSection";
import { Badge } from "~~/components/ui/badge";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-start justify-start h-full gap-5">
      <div className="items-start">
        <h1 className="z-10000 text-2xl">what is ⛓🐰 onchain rabbit?</h1>
      </div>
      <Separator />

      <div className="items-start">
        <h1 className="z-10000 text-xl text-slate-500">an intent-marketplace to explore the world onchain, as fast as a rabbit !!!</h1>
      </div>

      <div className="grid grid-cols-4 gap-5 w-full px-5 pb-5">
        <div className="col-span-3">
          <p className="text-slate-400">
            Onchain Rabbit is an onchain intent marketplace that aggregates onchain opportunities for you all in one place. 
            It makes it easier for you to navigate the world of web3 and find new interesting things to be done across different ecosystems, powered by Worldcoin.
          </p>

        </div>
          <div className="border-l border-destructive-foreground p-5">
          <Badge className='card w-full flex flex-nowrap justify-start font-extraligh border-destructive-foreground rounded-full px-3 whitespace-nowrap shadow-md relative'>
          Supported Networks and Projects:
            </Badge >
            <ul className="list-disc pl-5 text-slate-400">
            <li className="text-slate-400">Dragonswap</li>
            <li className="text-slate-400">Worldcoin</li>
            <li className="text-slate-400">Mantle</li>
            <li className="text-slate-400">Optimism</li>
            <li className="text-slate-400">Sei Network</li>
          </ul>
        </div>
        </div>
    
        
      </div>
  );
};

export default Home;
