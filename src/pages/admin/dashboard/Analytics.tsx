
import React, { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, Users, ShoppingCart, TrendingUp } from "lucide-react";
import StatCard from "@/components/common/dashboard/StatCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { Flex } from "@/components/ui/flex";
import LineChart from "@/components/common/charts/LineChart";
import { PageHeader } from "@/components/common/PageHeader";
import SEO from "@/components/common/SEO";
import AreaChart from "@/components/common/charts/AreaChart";
import CandlestickChart from "@/components/common/charts/CandlestickChart";
import {
  generateTimeSeriesData,
  generateAreaData,
  generateCandlestickData,
  generateRevenueData,
  generateUserGrowthData
} from "@/utils/chartDataGenerator";

interface CardData {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  percentageChange: number;
}

const Analytics: React.FC = () => {
  const { t } = useLanguage();

  // Array of card data
  const cardData: CardData[] = [
    {
      title: "dashboard.analytics.totalUsers",
      value: "24.7K",
      icon: Users,
      percentageChange: 20,
    },
    {
      title: "dashboard.analytics.revenue",
      value: "$55.9K",
      icon: DollarSign,
      percentageChange: 4,
    },
    {
      title: "dashboard.analytics.orders",
      value: "1,234",
      icon: ShoppingCart,
      percentageChange: -1.5,
    },
    {
      title: "dashboard.analytics.growth",
      value: "7.2%",
      icon: TrendingUp,
      percentageChange: 2.1,
    },
  ];

  // Generate chart data
  const revenueData = generateRevenueData(12);
  const userGrowthData = generateUserGrowthData(26);
  const conversionData = generateTimeSeriesData(30, 4.5, 0.05);
  const performanceData = generateCandlestickData(30, 100, 0.03);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 p-4 md:p-6"
    >
      <SEO title={t("dashboard.analytics.link")} />
      {/* Header */}
      <PageHeader
        title={t("dashboard.analytics.overview")}
        description={t("dashboard.analytics.title")}
      />

      {/* Stats Cards - Responsive Grid using Flex */}
      <Flex direction="row" wrap="wrap" gap={4}>
        {cardData.map((card, index) => (
          <Flex key={index} className="flex-1 min-w-[280px] sm:min-w-[180px]">
            <StatCard
              title={card.title}
              value={card.value}
              icon={card.icon}
              percentageChange={card.percentageChange}
              t={t}
            />
          </Flex>
        ))}
      </Flex>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <LineChart
          title={t("dashboard.analytics.revenueChart")}
          description={t("dashboard.analytics.revenueDescription")}
          data={revenueData}
          height={300}
          color="hsl(var(--primary))"
        />

        {/* User Growth Chart */}
        <AreaChart
          title={t("dashboard.analytics.userGrowth")}
          description={t("dashboard.analytics.userGrowthDescription")}
          data={userGrowthData}
          height={300}
          topColor="rgba(34, 197, 94, 0.4)"
          bottomColor="rgba(34, 197, 94, 0.0)"
          lineColor="hsl(var(--primary))"
        />

        {/* Conversion Rate Chart */}
        <LineChart
          title={t("dashboard.analytics.conversionRate")}
          description={t("dashboard.analytics.conversionDescription")}
          data={conversionData}
          height={300}
          color="hsl(var(--primary))"
        />

        {/* Performance Analysis */}
        <CandlestickChart
          title={t("dashboard.analytics.performance")}
          description={t("dashboard.analytics.performanceDescription")}
          data={performanceData}
          height={300}
          upColor="#22c55e"
          downColor="#ef4444"
        />
      </div>
    </motion.div>
  );
};

export default Analytics;
