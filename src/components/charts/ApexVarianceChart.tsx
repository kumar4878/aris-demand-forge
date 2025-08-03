import React from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface VarianceDataPoint {
  month: string;
  actual: number;
  forecast: number;
  variance: number;
}

interface ApexVarianceChartProps {
  data: VarianceDataPoint[];
  title?: string;
  height?: number;
}

export function ApexVarianceChart({ data, title = "Forecast vs Actual Variance", height = 350 }: ApexVarianceChartProps) {
  const chartOptions: ApexOptions = {
    chart: {
      type: 'line',
      height: height,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        },
      },
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    colors: ['hsl(142, 76%, 36%)', 'hsl(217, 91%, 60%)', 'hsl(45, 93%, 58%)'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    grid: {
      borderColor: 'hsl(220, 13%, 91%)',
      strokeDashArray: 3,
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    xaxis: {
      categories: data.map(item => item.month),
      labels: {
        style: {
          colors: 'hsl(220, 8%, 46%)',
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: [
      {
        title: {
          text: 'Volume (Units)',
          style: {
            color: 'hsl(220, 8%, 46%)',
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif',
          },
        },
        labels: {
          style: {
            colors: 'hsl(220, 8%, 46%)',
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif',
          },
          formatter: (value) => `${(value / 1000).toFixed(1)}K`,
        },
      },
      {
        opposite: true,
        title: {
          text: 'Variance (%)',
          style: {
            color: 'hsl(220, 8%, 46%)',
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif',
          },
        },
        labels: {
          style: {
            colors: 'hsl(220, 8%, 46%)',
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif',
          },
          formatter: (value) => `${value.toFixed(1)}%`,
        },
      },
    ],
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: {
        colors: 'hsl(220, 8%, 46%)',
      },
      markers: {
        size: 8,
        offsetX: 0,
        offsetY: 0,
      },
    },
    tooltip: {
      theme: 'light',
      shared: true,
      intersect: false,
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif',
      },
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
        const month = data[dataPointIndex].month;
        const actual = data[dataPointIndex].actual;
        const forecast = data[dataPointIndex].forecast;
        const variance = data[dataPointIndex].variance;
        
        return `
          <div class="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
            <div class="font-semibold text-gray-800 mb-2">${month}</div>
            <div class="space-y-1 text-sm">
              <div class="flex justify-between gap-4">
                <span class="text-green-600">Actual:</span>
                <span class="font-medium">${actual.toLocaleString()}</span>
              </div>
              <div class="flex justify-between gap-4">
                <span class="text-blue-600">Forecast:</span>
                <span class="font-medium">${forecast.toLocaleString()}</span>
              </div>
              <div class="flex justify-between gap-4 pt-1 border-t border-gray-100">
                <span class="text-yellow-600">Variance:</span>
                <span class="font-semibold ${variance >= 0 ? 'text-green-600' : 'text-red-600'}">${variance.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        `;
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 300,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  const chartSeries = [
    {
      name: 'Actual Sales',
      type: 'column',
      data: data.map(item => item.actual),
    },
    {
      name: 'AI Forecast',
      type: 'line',
      data: data.map(item => item.forecast),
    },
    {
      name: 'Variance %',
      type: 'line',
      yAxisIndex: 1,
      data: data.map(item => item.variance),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="chart-container"
    >
      <div className="chart-header">
        <h3 className="chart-title">{title}</h3>
        <p className="chart-description">
          Real-time comparison of AI forecasts vs actual performance
        </p>
      </div>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="line"
        height={height}
      />
    </motion.div>
  );
}