import "./AddButton.scss";
import { MouseEvent } from "react";
// icons
import { LuPlus } from "react-icons/lu";

interface AddButtonProps {
  label?: string;
  size?: "sm" | "md" | "lg";
  handleClick: (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
}

const sizeMapping = {
  sm: { fontSize: "0.8rem" },
  md: { fontSize: "1.1rem" },
  lg: { fontSize: "1.5rem" },
};

const AddButton = ({
  handleClick,
  label = "Add New",
  size = "md",
}: AddButtonProps) => {
  const { fontSize } = sizeMapping[size];

  /**
   * TSX
   */
  return (
    <button onClick={handleClick} style={{ fontSize }}>
      <LuPlus /> {label}
    </button>
  );
};

export default AddButton;
