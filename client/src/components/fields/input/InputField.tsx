import "./InputField.scss";
import { FC } from "react";

interface InputFieldProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  label: string;
  width?: string;
  placeholder?: string;
  value: string | number | null;
  type: "text" | "number" | "password";
}

const InputField: FC<InputFieldProps> = ({
  onChange,
  value = "",
  type = "text",
  width = "100%",
  label = "Label",
  id = "input-id",
  placeholder = "Enter...",
}) => {
  /**
   * TSX
   */
  return (
    <div className="input-field" style={{ width: width }}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        value={value === null ? "" : value}
      />
    </div>
  );
};

export default InputField;
