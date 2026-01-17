
import React from 'react';
import LineChart, { LineChartData } from './LineChart';
import AreaChart, { AreaChartData } from './AreaChart';
import CandlestickChart, { CandlestickData } from './CandlestickChart';
import BarChart, { BarChartData } from './BarChart';

export type ChartType = 'line' | 'area' | 'candlestick' | 'bar';

export interface ChartFactoryProps {
  type: ChartType;
  title: string;
  description?: string;
  data: LineChartData[] | AreaChartData[] | CandlestickData[] | BarChartData[];
  height?: number;
  className?: string;
  color?: string;
  upColor?: string;
  downColor?: string;
}

const ChartFactory: React.FC<ChartFactoryProps> = ({
  type,
  title,
  description,
  data,
  height = 300,
  className,
  color,
  upColor,
  downColor,
}) => {
  switch (type) {
    case 'line':
      return (
        <LineChart
          title={title}
          description={description}
          data={data as LineChartData[]}
          height={height}
          className={className}
          color={color}
        />
      );
    case 'area':
      return (
        <AreaChart
          title={title}
          description={description}
          data={data as AreaChartData[]}
          height={height}
          className={className}
          lineColor={color}
        />
      );
    case 'candlestick':
      return (
        <CandlestickChart
          title={title}
          description={description}
          data={data as CandlestickData[]}
          height={height}
          className={className}
          upColor={upColor}
          downColor={downColor}
        />
      );
    case 'bar':
      return (
        <BarChart
          title={title}
          description={description}
          data={data as BarChartData[]}
          height={height}
          className={className}
          color={color}
        />
      );
    default:
      return null;
  }
};

export default ChartFactory;
