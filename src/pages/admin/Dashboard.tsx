import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { DeliveryChart } from "@/components/dashboard/DeliveryChart";
import { VehicleWidget } from "@/components/dashboard/VehicleWidget";
import { TrackingWidget } from "@/components/dashboard/TrackingWidget";
import { ActivitiesTable } from "@/components/dashboard/ActivitiesTable";
import { DemographicsWidget } from "@/components/dashboard/DemographicsWidget";
import { RecentOrdersWidget } from "@/components/dashboard/RecentOrdersWidget";
import { Package, Truck, ShoppingCart } from "lucide-react";
import SEO from "@/components/common/SEO";

const Dashboard: React.FC = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <SEO title={t("dashboard.title")} />
      <PageHeader
        title={t("dashboard.title")}
        description={t("dashboard.description")}
      />

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={Package}
          value="12,384"
          label={t("dashboard.stats.totalOrders")}
          trend="up"
          trendValue="20%"
          iconColor="text-blue-600"
        />
        <StatCard
          icon={Truck}
          value="728"
          label={t("dashboard.stats.ordersInTransit")}
          trend="up"
          trendValue="20%"
          iconColor="text-orange-600"
        />
        <StatCard
          icon={ShoppingCart}
          value="12,384"
          label={t("dashboard.stats.deliveredOrders")}
          trend="up"
          trendValue="20%"
          iconColor="text-green-600"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          <DeliveryChart />
          <ActivitiesTable />
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          <VehicleWidget />
          <TrackingWidget />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <DemographicsWidget />
        <RecentOrdersWidget />
      </div>
    </motion.div>
  );
};

export default Dashboard;
