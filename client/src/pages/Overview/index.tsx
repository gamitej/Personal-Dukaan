import StatusCard from "./StatusCard";
import StatusChart from "./StatusChart";

const Overview = () => {
  /**
   * TSX
   */
  return (
    <div className="px-[2rem] py-[3rem] w-full flex flex-col justify-center items-center gap-12">
      <StatusCard />
      <StatusChart />
    </div>
  );
};

export default Overview;
