import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { AreaChartProps } from "@/types/charts.type";

const AreaChart = ({
  id = "chartId",
  xAxisFormatter,
  yAxisFormatter,
  series = [],
  xAxisData = [],
  markersSize = 0,
  strokeWidth = 1,
  chartHeight = 350,
  enableGrid = false,
  yAxisFontSize = "16px",
  enableDataLabels = false,
  yAxisTitle = "y-axis-title",
}: AreaChartProps) => {
  const options: ApexOptions = {
    chart: {
      id,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: enableDataLabels,
    },
    grid: {
      show: enableGrid,
    },
    markers: {
      size: markersSize,
    },
    stroke: {
      width: strokeWidth,
    },
    xaxis: {
      type: "datetime",
      labels: {
        formatter: xAxisFormatter ? xAxisFormatter : (value) => value,
      },
      categories: xAxisData,
    },
    yaxis: {
      title: {
        text: yAxisTitle,
        style: {
          fontSize: yAxisFontSize,
        },
      },
      labels: {
        formatter: yAxisFormatter
          ? yAxisFormatter
          : (value) => value.toFixed(0),
      },
    },
  };

  return (
    <ReactApexChart
      type="area"
      series={series}
      options={options}
      height={chartHeight}
    />
  );
};

export default AreaChart;
