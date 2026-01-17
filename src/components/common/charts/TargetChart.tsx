import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Flex } from "@/components/ui/flex";
import { Text } from "@/components/ui/text";
import { PieChart, Pie, Cell } from "recharts";
import { Badge } from "@/components/ui/badge";
import { getBadgeColor } from "@/utils/badgeUtils";

interface TargetData {
  name: string;
  value: number;
  color: string;
}

interface TargetChartProps {
  titleKey: string;
  descriptionKey: string;
  data: TargetData[];
  percentage: number;
  percentageChange: number;
  t: (key: string) => string;
}

const TargetChart: React.FC<TargetChartProps> = ({
  titleKey,
  descriptionKey,
  data,
  percentage,
  percentageChange,
  t,
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <Flex direction="col" gap={1}>
          <CardTitle>{t(titleKey)}</CardTitle>
          <CardDescription>{t(descriptionKey)}</CardDescription>
        </Flex>
      </CardHeader>
      <CardContent>
        <Flex direction="col" align="center" gap={3}>
          <Flex align="center" justify="center">
            <div className="relative">
              <PieChart width={200} height={200}>
                <Pie
                  data={data}
                  cx={100}
                  cy={100}
                  innerRadius={60}
                  outerRadius={80}
                  startAngle={90}
                  endAngle={450}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
              <Flex
                className="absolute inset-0"
                direction="col"
                align="center"
                justify="center"
              >
                <Text size="2xl" weight="bold">
                  {percentage}%
                </Text>
                <Badge color={getBadgeColor(percentageChange)}>
                  {percentageChange >= 0
                    ? `+${percentageChange}%`
                    : `${percentageChange}%`}
                </Badge>
              </Flex>
            </div>
          </Flex>

          <Text size="sm" variant="muted" align="center">
            {t("dashboard.ecommerce.targetMessage1")}
          </Text>
          <Text size="sm" variant="muted" align="center">
            {t("dashboard.ecommerce.targetMessage2")}
          </Text>

          <Flex direction="row" gap={3}>
            <Flex direction="col" align="center" flex={1}>
              <Text size="sm" variant="muted">
                {t("dashboard.ecommerce.target")}
              </Text>
              <Text weight="semibold">
                {titleKey.includes("monthly") ? "$20K ↓" : "$5K ↓"}
              </Text>
            </Flex>
            <Flex direction="col" align="center" flex={1}>
              <Text size="sm" variant="muted">
                {t("dashboard.ecommerce.revenue")}
              </Text>
              <Text weight="semibold">
                {titleKey.includes("monthly") ? "$20K ↑" : "$4.5K ↑"}
              </Text>
            </Flex>
            <Flex direction="col" align="center" flex={1}>
              <Text size="sm" variant="muted">
                {t("dashboard.ecommerce.today")}
              </Text>
              <Text weight="semibold">
                {titleKey.includes("monthly") ? "$20K ↑" : "$1.2K ↑"}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </CardContent>
    </Card>
  );
};

export default TargetChart;
