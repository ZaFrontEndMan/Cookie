import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Flex } from "@/components/ui/flex";
import { Text } from "@/components/ui/text";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface BarData {
  value: number;
  height: string;
  color: string;
}

interface ComparisonItem {
  title: string;
  sep: BarData;
  nov: BarData;
}

interface ComparisonCardProps {
  title: string;
  visitors: number;
  comparisons: ComparisonItem[];
  updated: string;
  comparisonTitle: string;
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({
  title,
  visitors,
  comparisons,
  updated,
  comparisonTitle,
}) => {
  return (
    <TooltipProvider>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{updated}</CardDescription>
        </CardHeader>

        <CardContent className="pb-0">
          <Flex justify="end" gap={4} className="h-28">
            {["sep", "nov"].map((month) => (
              <Flex
                key={month}
                className={cn(
                  "relative h-full w-20 rounded-t-lg bg-primary/35",
                  "bg-[length:20px_20px]",
                  "bg-[linear-gradient(45deg,#0000_12.5%,#fff_12.5%,#fff_50%,#0000_50%,#0000_62.5%,#fff_62.5%,#fff_100%)]",
                  "dark:bg-[linear-gradient(45deg,#0000_12.5%,#000_12.5%,#000_50%,#0000_50%,#0000_62.5%,#000_62.5%,#000_100%)]"
                )}
              >
                <AnimatePresence>
                  {comparisons.map((data, dataIndex) => {
                    const { value } = data[
                      month as keyof ComparisonItem
                    ] as BarData;

                    // Sort comparisons by value for this month
                    const sortedComparisons = [...comparisons].sort(
                      (a, b) =>
                        (a[month as keyof ComparisonItem] as BarData).value -
                        (b[month as keyof ComparisonItem] as BarData).value
                    );

                    const sortedIndex = sortedComparisons.findIndex(
                      (d) => d === data
                    );

                    const isHighest =
                      sortedIndex === sortedComparisons.length - 1;
                    const isLowest = sortedIndex === 0;

                    const barColor = isHighest
                      ? "bg-primary text-primary-foreground"
                      : isLowest
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted text-muted-foreground"; // fallback for mid values

                    return (
                      <Tooltip key={`${month}-${dataIndex}`}>
                        <TooltipTrigger asChild>
                          <motion.div
                            className={cn(
                              "absolute bottom-0 w-full rounded-t-lg cursor-pointer",
                              barColor
                            )}
                            style={{
                              zIndex: sortedComparisons.length - sortedIndex,
                              height: `${value}%`,
                            }}
                            initial={{ height: 0 }}
                            animate={{ height: `${value}%` }}
                            transition={{
                              duration: 1.5,
                              ease: "easeOut",
                              delay: dataIndex * 0.2,
                            }}
                          >
                            <Text
                              size="xs"
                              className="absolute top-1 left-1"
                              style={{
                                zIndex:
                                  sortedComparisons.length + 1 - sortedIndex,
                              }}
                            >
                              {value}%
                            </Text>
                            <Text
                              size="xs"
                              className="absolute bottom-1 left-1"
                              style={{
                                zIndex:
                                  sortedComparisons.length + 1 - sortedIndex,
                              }}
                            >
                              {month === "sep" ? "September" : "November"}
                            </Text>
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <Text size="sm">{data.title}</Text>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </AnimatePresence>
              </Flex>
            ))}
          </Flex>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default ComparisonCard;
