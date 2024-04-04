import CountCard from "@/components/card/CountCard";

const StatusCard = () => {
  /**
   * TSX
   */
  return (
    <div className="w-full flex items-center gap-6">
      <CountCard title="Profit" value={0} label="Rs" />
      <CountCard title="Purchase" value={0} label="Rs" />
      <CountCard title="Sales" value={0} label="Rs" />
    </div>
  );
};

export default StatusCard;
