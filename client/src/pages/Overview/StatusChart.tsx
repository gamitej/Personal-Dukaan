import moment from "moment";
// componennts
import Dropdown from "@/components/dropdown/Dropdown";
import AreaChartCard from "@/components/card/AreaCard";

const options = [
  { label: "Sales", value: "sales" },
  { label: "Purchase", value: "purchase" },
  { label: "Expenses", value: "expenses" },
];

const StatusChart = () => {
  /**
   * TSX
   */
  return (
    <AreaChartCard
      id="perf-chart"
      strokeWidth={2}
      series={[]}
      markersSize={5}
      chartHeight={350}
      yAxisTitle="Price"
      title="Overview"
      xAxisData={[]}
      additionalRightHeadComp={
        <Dropdown
          label=""
          options={options}
          selectedValue={null}
          onChange={() => {}}
        />
      }
      xAxisFormatter={(value) => moment(value).format("DD MMM YY")}
    />
  );
};

export default StatusChart;
