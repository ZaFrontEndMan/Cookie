import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import CommonTable, { ColumnDef } from "@/components/common/table/CommonTable";

import { Flex } from "@/components/ui/flex";
import StatCard from "@/components/common/dashboard/StatCard";
import { useLanguage } from "@/contexts/LanguageContext";
import ChartFactory from "@/components/common/charts/ChartFactory";
import { cardData, chartData, tableData } from "./data";
import { CardData, TableData, ChartData } from "./types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/common/PageHeader";
import SEO from "@/components/common/SEO";

// Stats Cards Component with Carousel (only for StatCards)
const StatsCards = ({ t }: { t: (key: string) => string }) => {
  return (
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
  );
};

// Charts Section Component with Tabs
const ChartsSection = ({ t }: { t: (key: string) => string }) => {
  return (
    <Tabs defaultValue="0" className="w-full">
      <TabsList className="mb-4">
        {chartData.map((chart, index) => (
          <TabsTrigger key={index} value={index.toString()}>
            {t(chart.title)}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-6">
        {chartData.map((chart, index) => (
          <TabsContent key={index} value={index.toString()}>
            <ChartFactory
              type={chart.type}
              title={t(chart.title)}
              description={t(chart.description)}
              data={chart.data}
              height={chart.height}
              color={chart.color}
              upColor={chart.upColor}
              downColor={chart.downColor}
            />
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};

// Table Section Component
const ProductTable = ({ t }: { t: (key: string) => string }) => {
  const columnDefs: ColumnDef[] = [
    {
      key: "product",
      header: t("dashboard.overview.table.productName"),
      flex: 2,
      sortable: true,
    },
    {
      key: "category",
      header: t("dashboard.overview.table.category"),
      width: "120px",
    },
    {
      key: "revenue",
      header: t("dashboard.overview.table.revenue"),
      width: "100px",
      sortable: true,
      render: (value, row) => (
        <span className="font-semibold text-green-600">
          {row.revenueDisplay}
        </span>
      ),
    },
    {
      key: "growth",
      header: t("dashboard.overview.table.growth"),
      width: "100px",
      render: (value) => (
        <Badge variant={value.startsWith("+") ? "solid" : "outline"}>
          {value}
        </Badge>
      ),
    },
    {
      key: "status",
      header: t("dashboard.overview.table.status"),
      width: "100px",
      render: (value) => (
        <Badge color={value !== "Inactive" ? "success" : "danger"}>
          {t(value)}
        </Badge>
      ),
    },
  ];

  return (
    <CommonTable
      title={t("dashboard.overview.table.title")}
      subtitle={t("dashboard.overview.table.subtitle")}
      rowData={tableData}
      colDefs={columnDefs}
      itemsPerPage={8}
      exportable={true}
    />
  );
};

// Main Overview Component
const Overview = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 p-4 md:p-6"
    >
      <SEO title={t("dashboard.overview.link")} />
      <PageHeader
        title={t("dashboard.overview.overview")}
        description={t("dashboard.overview.title")}
      />
      <StatsCards t={t} />
      <ChartsSection t={t} />
      {/* <ProductTable t={t} /> */}
    </motion.div>
  );
};

export default Overview;
