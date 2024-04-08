import { useState } from "react";
// components
import StatusCard from "./StatusCard";
import StatusChart from "./StatusChart";
import HeaderCard from "@/components/card/HeaderCard";
// types
import { DateFieldType } from "@/types/components.type";

const Overview = () => {
  const [dateField, setDateField] = useState<DateFieldType | null>({
    startDate: null,
    endDate: null,
  });

  /**
   * TSX
   */
  return (
    <div className="px-[2rem] py-[3rem] w-full flex flex-col justify-center items-center gap-12">
      <HeaderCard handleDateSubmit={setDateField} />
      <StatusCard dateField={dateField} />
      <StatusChart />
    </div>
  );
};

export default Overview;
