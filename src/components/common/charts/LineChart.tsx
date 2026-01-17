import React, { useCallback } from "react";
import { IChartApi, Time } from "lightweight-charts";
import BaseChart, { BaseChartProps } from "./BaseChart";
import { getChartColors } from "@/utils/colorUtils";

export interface LineChartData {
  time: Time;
  value: number;
}

interface LineChartProps extends Omit<BaseChartProps, "data"> {
  data: LineChartData[];
  color?: string;
  lineWidth?: 1 | 2 | 3 | 4;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  color,
  lineWidth = 2,
  ...baseProps
}) => {
  const handleChartReady = useCallback(
    (chart: IChartApi) => {
      const colors = getChartColors();
      const lineColor =
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

      const lineSeries = chart.addLineSeries({
        color: lineColor,
        lineWidth,
      });

      lineSeries.setData(data);
      chart.timeScale().fitContent();

      if (baseProps.onChartReady) {
        baseProps.onChartReady(chart);
      }
    },
    [data, color, lineWidth, baseProps]
  );

  return (
    <BaseChart {...baseProps} data={data} onChartReady={handleChartReady} />
  );
};

export default LineChart;
