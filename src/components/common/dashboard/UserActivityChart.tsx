import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Flex } from "@/components/ui/flex";

interface DataPoint {
  day?: string;
  period?: string;
  activity: number;
}

interface DataSets {
  monthly: DataPoint[];
  quarterly: DataPoint[];
  annually: DataPoint[];
}

interface UserActivityChartProps {
  dataSets: DataSets;
  timePeriod: "monthly" | "quarterly" | "annually";
  setTimePeriod: (value: "monthly" | "quarterly" | "annually") => void;
  t: (key: string) => string;
}

const UserActivityChart: React.FC<UserActivityChartProps> = ({
  dataSets,
  timePeriod,
  setTimePeriod,
  t,
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <Flex
          direction="col"
          gap={4}
          className="sm:flex-row sm:justify-between sm:align-center"
        >
          <Flex direction="col" gap={1}>
            <CardTitle>{t("dashboard.analytics.userActivity")}</CardTitle>
            <CardDescription>{t("dashboard.analytics.title")}</CardDescription>
          </Flex>
          <Tabs defaultValue="monthly" onValueChange={setTimePeriod}>
            <TabsList>
              <TabsTrigger value="monthly">
                {t("dashboard.analytics.monthly")}
              </TabsTrigger>
              <TabsTrigger value="quarterly">
                {t("dashboard.analytics.quarterly")}
              </TabsTrigger>
              <TabsTrigger value="annually">
                {t("dashboard.analytics.annually")}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </Flex>
      </CardHeader>
      <CardContent >
        <Flex className="h-64 sm:h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dataSets[timePeriod]}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey={timePeriod === "monthly" ? "day" : "period"}
                className="text-muted-foreground"
                tick={{ fontSize: 12 }}
              />
              <YAxis
                className="text-muted-foreground"
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                }}
              />
              <Bar
                dataKey="activity"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Flex>
      </CardContent>
    </Card>
  );
};

export default UserActivityChart;
