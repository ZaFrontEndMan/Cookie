import { ChartType } from "@/components/common/charts/ChartFactory";

export interface CardData {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  percentageChange: number;
}

export interface TableData {
  product: string;
  category: string;
  revenue: number;
  revenueDisplay: string;
  growth: string;
  status: string;
}
export interface ChartData {
  type: ChartType;
  title: string;
  description: string;
  data: any[];
  height: number;
  color?: string;
  upColor?: string;
  downColor?: string;
}
