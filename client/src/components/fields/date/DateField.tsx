import moment from "moment";
import "./DateField.scss";
import { FC, useMemo } from "react";

interface DateFieldProps {
  id: string;
  width?: string;
  label?: string;
  value: string | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateField: FC<DateFieldProps> = ({
  id = "date-id",
  value = null,
  width = "100%",
  label = "Select Date",
  onChange,
}) => {
  // Convert Date to string
  const newDate = useMemo(() => {
    if (!value) return null;
    const parts = value.split("-");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);

    return new Date(year, month, day);
  }, [value]);

  const formattedValue = newDate ? moment(newDate).format("YYYY-MM-DD") : "";

  /**
   * TSX
   */
  return (
    <div className="date-field" style={{ width: width }}>
      <label htmlFor={id}>{label}</label>
      <input value={formattedValue} type="date" id={id} onChange={onChange} />
    </div>
  );
};

export default DateField;
