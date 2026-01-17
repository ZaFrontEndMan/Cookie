
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Base styles shared across all buttons
const baseStyles =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition duration-300 ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

const buttonVariants = cva(baseStyles, {
  variants: {
    variant: {
      filled: "",
      outline: "border border-input bg-background",
      ghost: "",
      link: "underline-offset-4 hover:underline",
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 px-3",
      lg: "h-11 px-8",
      icon: "h-10 w-10",
    },
    color: {
      primary: "",
      secondary: "",
      danger: "",
      warning: "",
      success: "",
    },
  },
  compoundVariants: [
    // Primary variants
    {
      color: "primary",
      variant: "filled",
      className: "bg-primary text-primary-foreground hover:bg-primary/90",
    },
    {
      color: "primary",
      variant: "outline",
      className: "border-primary text-primary hover:bg-primary hover:text-primary-foreground",
    },
    {
      color: "primary",
      variant: "ghost",
      className: "text-primary hover:bg-primary/10",
    },
    {
      color: "primary",
      variant: "link",
      className: "text-primary",
    },
    // Secondary variants
    {
      color: "secondary",
      variant: "filled",
      className: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    },
    {
      color: "secondary",
      variant: "outline",
      className: "border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground",
    },
    {
      color: "secondary",
      variant: "ghost",
      className: "text-secondary hover:bg-secondary/10",
    },
    {
      color: "secondary",
      variant: "link",
      className: "text-secondary",
    },
    // Danger variants
    {
      color: "danger",
      variant: "filled",
      className: "bg-danger text-danger-foreground hover:bg-danger/90",
    },
    {
      color: "danger",
      variant: "outline",
      className: "border-danger text-danger hover:bg-danger hover:text-danger-foreground",
    },
    {
      color: "danger",
      variant: "ghost",
      className: "text-danger hover:bg-danger/10",
    },
    {
      color: "danger",
      variant: "link",
      className: "text-danger",
    },
    // Warning variants
    {
      color: "warning",
      variant: "filled",
      className: "bg-warning text-warning-foreground hover:bg-warning/90",
    },
    {
      color: "warning",
      variant: "outline",
      className: "border-warning text-warning hover:bg-warning hover:text-warning-foreground",
    },
    {
      color: "warning",
      variant: "ghost",
      className: "text-warning hover:bg-warning/10",
    },
    {
      color: "warning",
      variant: "link",
      className: "text-warning",
    },
    // Success variants
    {
      color: "success",
      variant: "filled",
      className: "bg-success text-success-foreground hover:bg-success/90",
    },
    {
      color: "success",
      variant: "outline",
      className: "border-success text-success hover:bg-success hover:text-success-foreground",
    },
    {
      color: "success",
      variant: "ghost",
      className: "text-success hover:bg-success/10",
    },
    {
      color: "success",
      variant: "link",
      className: "text-success",
    },
  ],
  defaultVariants: {
    variant: "filled",
    size: "default",
    color: "primary",
  },
});

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  tooltip?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      color,
      asChild = false,
      tooltip,
      tooltipPosition = "top",
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const buttonElement = (
      <Comp
        className={cn(buttonVariants({ variant, size, color, className }))}
        ref={ref}
        {...props}
      />
    );

    if (tooltip) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>{buttonElement}</TooltipTrigger>
            <TooltipContent side={tooltipPosition}>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return buttonElement;
  }
);
Button.displayName = "Button";

export {
  Button,
  buttonVariants,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
};
