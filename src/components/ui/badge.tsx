import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-primary-foreground text-primary",
  {
    variants: {
      size: {
        "1": "px-2 py-0.5 text-xs font-semibold",
        "2": "px-2.5 py-1 text-sm font-medium",
        "3": "px-3 py-1.5 text-base font-medium",
      },
      variant: {
        solid: "border-transparent",
        soft: "border-transparent bg-opacity-20",
        surface: "bg-opacity-10",
        outline: "bg-transparent",
      },
      color: {
        success: "bg-success-foreground text-success",
        warning: "bg-warning-foreground text-warning",
        danger: "bg-danger-foreground text-danger",
      },
      highContrast: {
        true: "text-white",
        false: "",
      },
      radius: {
        none: "rounded-none",
        small: "rounded-sm",
        medium: "rounded-md",
        large: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      size: "1",
      variant: "solid",
      highContrast: false,
      radius: "full",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  color?: "success" | "warning" | "danger"; // Explicitly define as optional
}

function Badge({
  className,
  size,
  variant,
  color,
  highContrast,
  radius,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        badgeVariants({ size, variant, color, highContrast, radius }),
        className
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
