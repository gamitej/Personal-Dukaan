import moment from "moment";
import "./DateField.scss";
import { FC } from "react";

interface DateFieldProps {
  id: string;
  width?: string;
  label?: string;
  value: Date | null;
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
  const formattedValue = value ? moment(value).format("YYYY-MM-DD") : "";
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
