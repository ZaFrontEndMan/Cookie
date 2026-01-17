
import React, { useEffect, useRef, useCallback } from 'react';
import { createChart, IChartApi, DeepPartial, ChartOptions } from 'lightweight-charts';
import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export interface BaseChartProps {
  title: string;
  description?: string;
  data: any[];
  height?: number;
  options?: DeepPartial<ChartOptions>;
  onChartReady?: (chart: IChartApi) => void;
  className?: string;
}

const BaseChart: React.FC<BaseChartProps> = ({
  title,
  description,
  data,
  height = 300,
  options = {},
  onChartReady,
  className = "",
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const { theme } = useTheme();

  const createChartInstance = useCallback(() => {
    if (!chartContainerRef.current) return;

    // Clean up existing chart
    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }

    const isDark = theme === 'dark';
    
    const defaultOptions: DeepPartial<ChartOptions> = {
      width: chartContainerRef.current.clientWidth,
      height,
      layout: {
        background: { color: 'transparent' },
        textColor: isDark ? '#ffffff' : '#374151',
      },
      grid: {
        vertLines: {
          color: isDark ? '#374151' : '#f3f4f6',
        },
        horzLines: {
          color: isDark ? '#374151' : '#f3f4f6',
        },
      },
      crosshair: {
        mode: 1,
      },
      rightPriceScale: {
        borderColor: isDark ? '#374151' : '#e5e7eb',
      },
      timeScale: {
        borderColor: isDark ? '#374151' : '#e5e7eb',
        timeVisible: true,
        secondsVisible: false,
      },
      ...options,
    };

    chartRef.current = createChart(chartContainerRef.current, defaultOptions);
    
    if (onChartReady) {
      onChartReady(chartRef.current);
    }
  }, [theme, height, options, onChartReady]);

  const handleResize = useCallback(() => {
    if (chartRef.current && chartContainerRef.current) {
      chartRef.current.applyOptions({
        width: chartContainerRef.current.clientWidth,
      });
    }
  }, []);

  useEffect(() => {
    createChartInstance();
    
    const resizeObserver = new ResizeObserver(handleResize);
    if (chartContainerRef.current) {
      resizeObserver.observe(chartContainerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [createChartInstance, handleResize]);

  useEffect(() => {
    if (chartRef.current) {
      const isDark = theme === 'dark';
      chartRef.current.applyOptions({
        layout: {
          textColor: isDark ? '#ffffff' : '#374151',
        },
        grid: {
          vertLines: {
            color: isDark ? '#374151' : '#f3f4f6',
          },
          horzLines: {
            color: isDark ? '#374151' : '#f3f4f6',
          },
        },
        rightPriceScale: {
          borderColor: isDark ? '#374151' : '#e5e7eb',
        },
        timeScale: {
          borderColor: isDark ? '#374151' : '#e5e7eb',
        },
      });
    }
  }, [theme]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div ref={chartContainerRef} style={{ height }} />
      </CardContent>
    </Card>
  );
};

export default BaseChart;
