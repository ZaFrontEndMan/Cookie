
import React, { useCallback } from "react";
import { IChartApi, Time } from "lightweight-charts";
import BaseChart, { BaseChartProps } from "./BaseChart";
import { getChartColors } from "@/utils/colorUtils";

export interface AreaChartData {
  time: Time;
  value: number;
}

interface AreaChartProps extends Omit<BaseChartProps, "data"> {
  data: AreaChartData[];
  topColor?: string;
  bottomColor?: string;
  lineColor?: string;
  lineWidth?: 1 | 2 | 3 | 4;
}

const AreaChart: React.FC<AreaChartProps> = ({
  data,
  topColor = "rgba(67, 56, 202, 0.4)",
  bottomColor = "rgba(67, 56, 202, 0.0)",
  lineColor,
  lineWidth = 2,
  ...baseProps
}) => {
  const handleChartReady = useCallback(
    (chart: IChartApi) => {
      const colors = getChartColors();
      const actualLineColor = lineColor === 'hsl(var(--chart-1))' ? colors.chart1 :
                             lineColor === 'hsl(var(--chart-2))' ? colors.chart2 :
                             lineColor === 'hsl(var(--chart-3))' ? colors.chart3 :
                             lineColor === 'hsl(var(--primary))' ? colors.primary :
                             lineColor || colors.primary;

      const areaSeries = chart.addAreaSeries({
        topColor,
        bottomColor,
        lineColor: actualLineColor,
        lineWidth,
      });

      areaSeries.setData(data);
      chart.timeScale().fitContent();

      if (baseProps.onChartReady) {
        baseProps.onChartReady(chart);
      }
    },
    [data, topColor, bottomColor, lineColor, lineWidth, baseProps]
  );

  return (
    <BaseChart {...baseProps} data={data} onChartReady={handleChartReady} />
  );
};

export default AreaChart;
