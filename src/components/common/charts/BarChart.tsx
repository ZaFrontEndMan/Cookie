import React, { useCallback } from "react";
import { IChartApi, Time } from "lightweight-charts";
import BaseChart, { BaseChartProps } from "./BaseChart";
import { getChartColors } from "@/utils/colorUtils";

export interface BarChartData {
  time: Time;
  value: number;
}

interface BarChartProps extends Omit<BaseChartProps, "data"> {
  data: BarChartData[];
  color?: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, color, ...baseProps }) => {
  const handleChartReady = useCallback(
    (chart: IChartApi) => {
      const colors = getChartColors();
      const barColor =
        color === "hsl(var(--chart-1))"
          ? colors.chart1
          : color === "hsl(var(--chart-2))"
          ? colors.chart2
          : color === "hsl(var(--chart-3))"
          ? colors.chart3
          : color === "hsl(var(--primary))"
          ? colors.primary
          : color === "hsl(var(--secondary))"
          ? colors.secondary
          : color || colors.primary;

      const barSeries = chart.addHistogramSeries({
        color: barColor,
      });

      barSeries.setData(data);
      chart.timeScale().fitContent();

      if (baseProps.onChartReady) {
        baseProps.onChartReady(chart);
      }
    },
    [data, color, baseProps]
  );

  return (
    <BaseChart {...baseProps} data={data} onChartReady={handleChartReady} />
  );
};

export default BarChart;
