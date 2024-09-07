"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "~~/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-[#1A2C19] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#B5F327] to-[#FF82EC] text-[#1A2C19] hover:bg-opacity-90 hover:border-[#FF82EC]",
        destructive:
          "bg-gradient-to-r from-[#B5F327] to-[#FF82EC] text-[#1A2C19] hover:bg-opacity-90 hover:border-[#FF82EC]",
        outline:
          "border border-[#FF82EC] bg-background hover:bg-opacity-90 hover:bg-gradient-to-r from-[#B5F327] to-[#FF82EC] hover:text-[#1A2C19] hover:border-[#FF82EC]",
        secondary:
          "bg-background text-[#FF82EC] border border-[#FF82EC] hover:bg-gradient-to-r from-[#B5F327] to-[#FF82EC] hover:text-[#1A2C19] hover:border-[#FF82EC]",
        ghost: "hover:bg-opacity-90 hover:text-[#1A2C19] hover:border-[#FF82EC]",
        link: "text-[#1A2C19] underline-offset-4 hover:underline hover:border-[#FF82EC]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
CustomButton.displayName = "Button";

export { CustomButton, buttonVariants };
