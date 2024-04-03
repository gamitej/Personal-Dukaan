import { FC } from "react";

interface CountCardProps {
  title: string;
  label?: string;
  value: number;
  enableDetails?: boolean;
  handleDetails?: () => void;
}

const CountCard: FC<CountCardProps> = ({
  label = "",
  value = "0",
  handleDetails,
  title = "Sales",
  enableDetails = false,
}) => {
  /**
   * TSX
   */
  return (
    <div className="relative h-[8rem] border px-6 py-4 rounded-md shadow-md">
      <div className="flex justify-between items-center w-[20rem] h-[100%]">
        <div className="text-blue-400 font-[500] text-xl font-sans">
          TOTAL
          <br />
          <span className="ml-6 uppercase">{title}</span>
        </div>
        <div>
          <p className="text-3xl font-[500] font-poppins text-slate-700">
            <span className="text-slate-500 font-poppins text-[16px] mr-1 uppercase">
              {label}
            </span>
            {value}
          </p>
        </div>
        {enableDetails && (
          <span
            onClick={handleDetails}
            className="absolute bottom-4 right-4 text-slate-600 hover:text-blue-500 cursor-pointer text-sm"
          >
            details
          </span>
        )}
      </div>
    </div>
  );
};

export default CountCard;
