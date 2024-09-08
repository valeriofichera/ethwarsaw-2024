"use client";

import type { NextPage } from "next";
import { Separator } from "~~/components/ui/separator";
import { CheckOutPopUp } from "./_components/CheckOutPopUp";
import { PreparePopUp } from "./_components/PreparePopUp";
import Checkout from "./steps/Checkout";
import { useContext } from "react";
import { FunnyContext } from "~~/services/funny/funnyContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselSelect,
} from "~~/components/ui/custom-carousel";
import Select from "./steps/Select";
import Summary from "./steps/Summary";
import BreadCrumb from "./_components/BreadCrumb";

const Dapp: NextPage = () => {
  const context = useContext(FunnyContext);

  if (!context) {
    console.error("FunnyContext is null");
    return null;
  }

  const pageSelector = [
    {
      id: 0,
      name: "Select",
      component: <Select />
    },
    {
      id: 1,
      name: "Summary & Preferences",
      component: <Summary />
    },
    {
      id: 2,
      name: "Checkout",
      component: <Checkout />
    }
  ];

  return (
    <Carousel>
    <div className="flex flex-col items-start justify-start h-full gap-5">
      <div className="items-start">
        <h1 className="z-10000 text-2xl">Marketplace</h1>
        <CarouselSelect/>
      </div>
      <Separator />
      <BreadCrumb />
        <CarouselContent>
          {pageSelector.map((page, index) => (
            <CarouselItem key={index}>
              {page.component}
            </CarouselItem>
          ))}
        </CarouselContent>
    </div>
    <CheckOutPopUp />
    <PreparePopUp />
    </Carousel>
  );
};

export default Dapp;