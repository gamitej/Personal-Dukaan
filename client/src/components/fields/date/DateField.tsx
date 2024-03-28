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

    const isValidDateFormat = /^\d{4}-\d{2}-\d{2}$/.test(value);
    if (isValidDateFormat) {
      return value;
    }

    const parts = value.split("-");
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];

    return new Date(`${year}-${month}-${day}`);
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
