import "./AreaChartCard.scss";
import AreaChart from "@/components/charts/AreaChart";
import { AreaChartProps } from "@/types/charts.type";

interface AreaChartCardProps extends AreaChartProps {
  title: string;
  additionalRightHeadComp?: React.ReactNode;
}

const AreaChartCard = ({
  title,
  additionalRightHeadComp,
  ...rest
}: AreaChartCardProps) => {
  return (
    <div className="area">
      <div className="container">
        {/* head */}
        <div className="head">
          <div className="head-left">
            <p>{title}</p>
          </div>
          <div className="head-right">{additionalRightHeadComp}</div>
        </div>
        {/* chart */}
        <div className="chart">
          <Chart {...rest} />
        </div>
      </div>
    </div>
  );
};

const Chart = (props: AreaChartProps) => {
  return <AreaChart {...props} />;
};

export default AreaChartCard;
