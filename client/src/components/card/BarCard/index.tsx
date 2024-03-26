import "./BarChartCard.scss";
import BarChart from "@/components/charts/BarChart";
import { BarChartProps } from "@/types/charts.type";

interface BarChartCardProps extends BarChartProps {
  title: string;
  additionalHeadLeftComp?: React.ReactNode;
}

const BarChartCard = ({
  title = "title",
  additionalHeadLeftComp,
  ...rest
}: BarChartCardProps) => {
  return (
    <div className="bar">
      <div className="container">
        <div className="head">
          <div className="left">
            <p>{title}</p>
          </div>
          <div className="right">{additionalHeadLeftComp}</div>
        </div>
        <div className="chart">
          <Chart {...rest} />
        </div>
      </div>
    </div>
  );
};

function Chart(props: BarChartProps) {
  return <BarChart {...props} />;
}

export default BarChartCard;
