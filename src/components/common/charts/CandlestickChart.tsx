
import React, { useCallback } from "react";
import {
  IChartApi,
  Time,
  CandlestickData as LWCCandlestickData,
} from "lightweight-charts";
import BaseChart, { BaseChartProps } from "./BaseChart";

// ✅ Use correct 'Time' and data shape from lightweight-charts
export interface CandlestickData {
  time: Time;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface CandlestickChartProps extends Omit<BaseChartProps, "data"> {
  data: CandlestickData[];
  upColor?: string;
  downColor?: string;
  borderUpColor?: string;
  borderDownColor?: string;
  wickUpColor?: string;
  wickDownColor?: string;
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({
  data,
  upColor = "#26a69a",
  downColor = "#ef5350",
  borderUpColor = "#26a69a",
  borderDownColor = "#ef5350",
  wickUpColor = "#26a69a",
  wickDownColor = "#ef5350",
  ...baseProps
}) => {
  const handleChartReady = useCallback(
    (chart: IChartApi) => {
      const candlestickSeries = chart.addCandlestickSeries({
        upColor,
        downColor,
        borderUpColor,
        borderDownColor,
        wickUpColor,
        wickDownColor,
      });

      candlestickSeries.setData(data);
      chart.timeScale().fitContent();

      if (baseProps.onChartReady) {
        baseProps.onChartReady(chart);
      }
    },
    [
      data,
      upColor,
      downColor,
      borderUpColor,
      borderDownColor,
      wickUpColor,
      wickDownColor,
      baseProps,
    ]
  );

  return (
    <BaseChart {...baseProps} data={data} onChartReady={handleChartReady} />
  );
};

export default CandlestickChart;
