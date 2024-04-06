import { FC, useState } from "react";
import toast from "react-hot-toast";
import DateField from "../fields/date/DateField";
import { DateFieldType } from "@/types/components.type";

interface HeaderCardProps {
  handleDateSubmit: (props: DateFieldType) => void;
}

const HeaderCard: FC<HeaderCardProps> = ({ handleDateSubmit }) => {
  const [dateField, setDateField] = useState<DateFieldType>({
    startDate: null,
    endDate: null,
  });

  const handleSubmit = () => {
    if (
      (dateField.startDate !== null && dateField.endDate === null) ||
      (dateField.startDate === null && dateField.endDate !== null)
    ) {
      toast.error("Please select all date fields", { duration: 1600 });
      return;
    }
    handleDateSubmit(dateField);
  };

  /**
   * TSX
   */
  return (
    <div
      className="rounded-md h-[8rem] pt-6 px-8 border shadow-md"
      style={{ width: "fit-content" }}
    >
      <div className="flex h-[100%] items-center gap-4">
        <div className="flex gap-2 justify-center items-center">
          <p className="text-xl">Select Date :-</p>
          <div className="flex gap-4">
            <DateField
              id="dateFrom"
              label="From"
              onChange={({ target }) =>
                setDateField((prev) => ({ ...prev, startDate: target.value }))
              }
              value={dateField.startDate}
            />
            <DateField
              label="to"
              id="dateTo"
              minDateValue={dateField.startDate}
              onChange={({ target }) =>
                setDateField((prev) => ({ ...prev, endDate: target.value }))
              }
              value={dateField.endDate}
            />
          </div>
        </div>
        <div>
          <button
            onClick={handleSubmit}
            className={`w-[5rem] ${
              true ? "" : "bg-slate-300 hover:bg-slate-300 cursor-not-allowed"
            } `}
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderCard;
