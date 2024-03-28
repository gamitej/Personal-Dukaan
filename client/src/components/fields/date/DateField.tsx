import moment from "moment";
import "./DateField.scss";
import { FC, useMemo } from "react";
import { convertToDefaultDateFormate } from "@/utils";

interface DateFieldProps {
  id: string;
  width?: string;
  label?: string;
  value: string | null;
  minDateValue?: string | string;
  maxDateValue?: string | string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateField: FC<DateFieldProps> = ({
  id = "date-id",
  value = null,
  width = "100%",
  label = "Select Date",
  minDateValue = null,
  maxDateValue = moment(new Date()).format("YYYY-MM-DD"),
  onChange,
}) => {
  // Convert Date to string
  const formattedValue = useMemo(() => {
    return {
      date: convertToDefaultDateFormate(value),
      maxDate: convertToDefaultDateFormate(maxDateValue),
      minDate: convertToDefaultDateFormate(minDateValue),
    };
  }, [value, minDateValue, maxDateValue]);

  /**
   * TSX
   */
  return (
    <div className="date-field" style={{ width: width }}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="date"
        onChange={onChange}
        min={formattedValue.minDate || ""}
        max={formattedValue.maxDate || ""}
        value={formattedValue.date || ""}
      />
    </div>
  );
};

export default DateField;
