import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Flex } from "@/components/ui/flex";
import { PageHeader } from "@/components/common/PageHeader";
import SEO from "@/components/common/SEO";
import { HiUsers, HiCube } from "react-icons/hi";
import StatCard from "@/components/common/dashboard/StatCard";
import TargetChart from "@/components/common/charts/TargetChart";
import AreaChart from "@/components/common/charts/AreaChart";
import BarChart from "@/components/common/charts/BarChart";
import LineChart from "@/components/common/charts/LineChart";
import {
  generateAreaData,
  generateBarData,
  generateTimeSeriesData,
} from "@/utils/chartDataGenerator";

interface CardData {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  percentageChange: number;
}

const Ecommerce: React.FC = () => {
  const { t } = useLanguage();

  // Stats card data
  const cardData: CardData[] = [
    {
      title: "dashboard.ecommerce.customers",
      value: "3,782",
      icon: HiUsers,
      percentageChange: 11.01,
    },
    {
      title: "dashboard.ecommerce.orders",
      value: "5,359",
      icon: HiCube,
      percentageChange: -9.05,
    },
  ];

  // Generate chart data
  const salesData = generateAreaData(30, 25000, 0.08);
  const orderVolumeData = generateBarData(30, 150, 0.15);
  const customerAcquisitionData = generateTimeSeriesData(30, 45, 0.06);

  const monthlyTargetData = [
    { name: "Completed", value: 75.55, color: "hsl(var(--primary))" },
    { name: "Remaining", value: 24.45, color: "hsl(var(--muted))" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 p-4 md:p-6"
    >
      <SEO title={t("dashboard.ecommerce.link")} />
      {/* Header */}
      <PageHeader
        title={t("dashboard.ecommerce.overview")}
        description={t("dashboard.ecommerce.title")}
      />

      {/* Top Stats */}
      <Flex direction="row" wrap="wrap" gap={4}>
        {cardData.map((card, index) => (
          <Flex key={index} className="flex-1 min-w-[280px]">
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

      {/* Charts Row */}
      <Flex direction="row" wrap="wrap" gap={4}>
        {/* Monthly Sales Chart */}
        <Flex className="flex-1 min-w-[280px]">
          <AreaChart
            title={t("dashboard.ecommerce.monthlySales")}
            description={t("dashboard.ecommerce.salesDescription")}
            data={salesData}
            height={300}
            topColor="rgba(59, 130, 246, 0.4)"
            bottomColor="rgba(59, 130, 246, 0.0)"
            lineColor="hsl(var(--primary))"
          />
        </Flex>

        {/* Monthly Target */}
        <Flex className="flex-1 min-w-[280px]">
          <TargetChart
            titleKey="dashboard.ecommerce.monthlyTarget"
            descriptionKey="dashboard.ecommerce.targetDescription"
            data={monthlyTargetData}
            percentage={75.55}
            percentageChange={10}
            t={t}
          />
        </Flex>
      </Flex>

      {/* Additional Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Volume */}
        <BarChart
          title={t("dashboard.ecommerce.orderVolume")}
          description={t("dashboard.ecommerce.orderDescription")}
          data={orderVolumeData}
          height={300}
          color="hsl(var(--secondary))"
        />

        {/* Customer Acquisition */}
        <LineChart
          title={t("dashboard.ecommerce.customerAcquisition")}
          description={t("dashboard.ecommerce.acquisitionDescription")}
          data={customerAcquisitionData}
          height={300}
          color="hsl(var(--primary))"
        />
      </div>
    </motion.div>
  );
};

export default Ecommerce;
