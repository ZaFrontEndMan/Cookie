import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const flexVariants = cva("flex", {
  variants: {
    direction: {
      row: "flex-row",
      "row-reverse": "flex-row-reverse",
      col: "flex-col",
      "col-reverse": "flex-col-reverse",
    },
    justify: {
      start: "justify-start",
      end: "justify-end",
      center: "justify-center",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    align: {
      start: "items-start",
      end: "items-end",
      center: "items-center",
      baseline: "items-baseline",
      stretch: "items-stretch",
    },
    flex: {
      1: "flex-1",
      auto: "flex-auto",
      initial: "flex-initial",
      none: "flex-none",
    },
    wrap: {
      nowrap: "flex-nowrap",
      wrap: "flex-wrap",
      "wrap-reverse": "flex-wrap-reverse",
    },
    gap: {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      8: "gap-8",
      10: "gap-10",
      12: "gap-12",
      16: "gap-16",
    },
  },
  defaultVariants: {
    direction: "row",
    justify: "start",
    align: "start",
    wrap: "nowrap",
    gap: 0,
    flex: undefined,
  },
});

export interface FlexProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {
  as?: "div" | "section" | "article" | "header" | "footer" | "nav";
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    { className, direction, justify, align, wrap, gap, as = "div", ...props },
    ref
  ) => {
    const Comp = as;
    return (
      <Comp
        className={cn(
          flexVariants({ direction, justify, align, wrap, gap, className })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Flex.displayName = "Flex";

export { Flex, flexVariants };
