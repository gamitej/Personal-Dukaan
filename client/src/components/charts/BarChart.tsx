import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { BarChartProps } from "@/types/charts.type";

const BarChart = ({
  id = "chartId",
  xAxisFormatter,
  yAxisFormatter,
  series = [],
  xAxisData = [],
  chartHeight = 350,
  dataLabelFormatter,
  columnWidth = "45%",
  yAxisFontSize = "16px",
  xAxisFontSize = "16px",
  enableDataLabels = false,
  yAxisTitle = "y-axis-title",
}: BarChartProps) => {
  const options: ApexOptions = {
    chart: {
      id,
    },
    // colors: colors,
    plotOptions: {
      bar: {
        distributed: true,
        columnWidth: columnWidth,
      },
    },
    dataLabels: {
      enabled: enableDataLabels,
      formatter: (val, opts) =>
        dataLabelFormatter
          ? dataLabelFormatter(val, opts)
          : val instanceof Array
          ? ""
          : val,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: xAxisData,

      labels: {
        formatter: xAxisFormatter ? xAxisFormatter : (value) => value,
        style: {
          //   colors: colors,
          fontSize: xAxisFontSize,
        },
      },
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
      type="bar"
      series={series}
      options={options}
      height={chartHeight}
    />
  );
};

export default BarChart;
