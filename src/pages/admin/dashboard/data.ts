import {
  HiChartBar,
  HiCurrencyDollar,
  HiTrendingUp,
  HiUsers,
} from "react-icons/hi";
import { CardData, ChartData, TableData } from "./types";
import {
  generateAreaData,
  generateCandlestickData,
  generateTimeSeriesData,
} from "@/utils/chartDataGenerator";

export const cardData: CardData[] = [
  {
    title: "dashboard.overview.totalRevenue",
    value: "$200,45.87",
    icon: HiCurrencyDollar,
    percentageChange: 2.5,
  },
  {
    title: "dashboard.overview.activeUsers",
    value: "9,528",
    icon: HiUsers,
    percentageChange: 9.5,
  },
  {
    title: "dashboard.overview.customerLifetimeValue",
    value: "$849.54",
    icon: HiChartBar,
    percentageChange: -1.6,
  },
  {
    title: "dashboard.overview.customerAcquisitionCost",
    value: "9,528",
    icon: HiTrendingUp,
    percentageChange: 3.5,
  },
];

export const tableData: TableData[] = [
  {
    product: "Digital Marketing Suite",
    category: "Software",
    revenue: 12450,
    revenueDisplay: "$12,450",
    growth: "+15.2%",
    status: "Active",
  },
  {
    product: "Analytics Dashboard",
    category: "Analytics",
    revenue: 8920,
    revenueDisplay: "$8,920",
    growth: "+8.7%",
    status: "Active",
  },
  {
    product: "E-commerce Platform",
    category: "Platform",
    revenue: 15680,
    revenueDisplay: "$15,680",
    growth: "+22.1%",
    status: "Active",
  },
  {
    product: "Mobile App Builder",
    category: "Development",
    revenue: 6340,
    revenueDisplay: "$6,340",
    growth: "-2.3%",
    status: "Inactive",
  },
  {
    product: "SEO Optimizer",
    category: "Marketing",
    revenue: 4780,
    revenueDisplay: "$4,780",
    growth: "+12.8%",
    status: "Active",
  },
  {
    product: "Social Media Manager",
    category: "Social",
    revenue: 9150,
    revenueDisplay: "$9,150",
    growth: "+18.5%",
    status: "Active",
  },
  {
    product: "Email Campaign Tool",
    category: "Marketing",
    revenue: 7420,
    revenueDisplay: "$7,420",
    growth: "+5.9%",
    status: "Active",
  },
  {
    product: "Customer Support Chat",
    category: "Support",
    revenue: 3290,
    revenueDisplay: "$3,290",
    growth: "+3.2%",
    status: "Active",
  },
];
export const chartData: ChartData[] = [
  {
    type: "area",
    title: "dashboard.overview.churnRate.title",
    description: "dashboard.overview.churnRate.description",
    data: generateAreaData(180, 4.26, 0.02),
    height: 250,
    color: "#ef4444",
    upColor: "rgba(239, 68, 68, 0.4)",
    downColor: "rgba(239, 68, 68, 0.0)",
  },
  {
    type: "line",
    title: "dashboard.overview.userGrowth.title",
    description: "dashboard.overview.userGrowth.description",
    data: generateTimeSeriesData(180, 3768, 0.04),
    height: 250,
    color: "hsl(var(--primary))",
  },
  {
    type: "candlestick",
    title: "dashboard.overview.marketAnalysis",
    description: "dashboard.overview.marketDescription",
    data: generateCandlestickData(90, 150, 0.05),
    height: 250,
    upColor: "#22c55e",
    downColor: "#ef4444",
  },
];
