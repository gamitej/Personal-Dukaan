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
    <div className="w-full border rounded-lg shadow-md bg-slate-200">
      <div className="">
        {/* head */}
        <div className="flex justify-between items-center px-6 py-4">
          <div className="">
            <p className="text-2xl">{title}</p>
          </div>
          <div className="head-right">{additionalRightHeadComp}</div>
        </div>
        <div className="bg-slate-300 w-full h-[.05rem]"></div>
        {/* chart */}
        <div className="px-4 py-2">
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
