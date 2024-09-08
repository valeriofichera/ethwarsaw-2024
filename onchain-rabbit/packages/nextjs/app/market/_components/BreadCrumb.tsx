"use client";

import { useContext } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
  } from "~~/components/ui/breadcrumb"
import { FunnyContext } from "~~/services/funny/funnyContext";

const BreadCrumb = () => {
  const context = useContext(FunnyContext);
  const farmingStep = context?.farmingStep;

  const handleBreadcrumbClick = (step: number) => {
    if (context) {
      context.setFarmingStep(step);
    }
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            className={farmingStep === 0 ? "text-white cursor-pointer" : "text-slate-400 cursor-pointer"}
            onClick={() => handleBreadcrumbClick(0)}
          >
            Select
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            className={farmingStep === 1 ? "text-white cursor-pointer" : "text-slate-400 cursor-pointer"}
            onClick={() => handleBreadcrumbClick(1)}
          >
            Summary
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            className={farmingStep === 2 ? "text-white cursor-pointer" : "text-slate-400 cursor-pointer"}
            onClick={() => handleBreadcrumbClick(2)}
          >
            Checkout
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumb;