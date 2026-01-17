
import { LineChartData } from '@/components/common/charts/LineChart';
import { AreaChartData } from '@/components/common/charts/AreaChart';
import { CandlestickData } from '@/components/common/charts/CandlestickChart';
import { BarChartData } from '@/components/common/charts/BarChart';

export const generateTimeSeriesData = (
  days: number = 30,
  baseValue: number = 100,
  volatility: number = 0.02
): LineChartData[] => {
  const data: LineChartData[] = [];
  let currentValue = baseValue;
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    const change = (Math.random() - 0.5) * 2 * volatility;
    currentValue *= (1 + change);
    
    data.push({
      time: Math.floor(date.getTime() / 1000) as any, // Convert to Unix timestamp
      value: Number(currentValue.toFixed(2)),
    });
  }

  return data;
};

export const generateAreaData = (
  days: number = 30,
  baseValue: number = 100,
  volatility: number = 0.02
): AreaChartData[] => {
  return generateTimeSeriesData(days, baseValue, volatility);
};

export const generateCandlestickData = (
  days: number = 30,
  baseValue: number = 100,
  volatility: number = 0.02
): CandlestickData[] => {
  const data: CandlestickData[] = [];
  let currentValue = baseValue;
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    const open = currentValue;
    const change = (Math.random() - 0.5) * 2 * volatility;
    const close = open * (1 + change);
    const high = Math.max(open, close) * (1 + Math.random() * volatility);
    const low = Math.min(open, close) * (1 - Math.random() * volatility);
    
    currentValue = close;
    
    data.push({
      time: Math.floor(date.getTime() / 1000) as any, // Convert to Unix timestamp
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
    });
  }

  return data;
};

export const generateBarData = (
  days: number = 30,
  baseValue: number = 100,
  volatility: number = 0.1
): BarChartData[] => {
  const data: BarChartData[] = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    const value = baseValue + (Math.random() - 0.5) * 2 * baseValue * volatility;
    
    data.push({
      time: Math.floor(date.getTime() / 1000) as any, // Convert to Unix timestamp
      value: Number(value.toFixed(2)),
    });
  }

  return data;
};

export const generateRevenueData = (months: number = 12): LineChartData[] => {
  const data: LineChartData[] = [];
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - months);
  
  let baseRevenue = 50000;
  
  for (let i = 0; i < months; i++) {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + i);
    date.setDate(1); // First day of month
    
    const seasonalFactor = 1 + 0.2 * Math.sin((i / 12) * 2 * Math.PI);
    const growth = 1 + (0.05 + Math.random() * 0.1);
    baseRevenue *= growth * seasonalFactor;
    
    data.push({
      time: Math.floor(date.getTime() / 1000) as any, // Convert to Unix timestamp
      value: Number(baseRevenue.toFixed(0)),
    });
  }
  
  return data;
};

export const generateUserGrowthData = (weeks: number = 26): AreaChartData[] => {
  const data: AreaChartData[] = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - weeks * 7);
  
  let userCount = 1000;
  
  for (let i = 0; i < weeks; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i * 7);
    
    const growthRate = 0.02 + Math.random() * 0.05;
    userCount *= (1 + growthRate);
    
    data.push({
      time: Math.floor(date.getTime() / 1000) as any, // Convert to Unix timestamp
      value: Math.floor(userCount),
    });
  }
  
  return data;
};
