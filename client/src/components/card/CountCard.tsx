import { FC, useState } from "react";
import Modal from "../modal/Modal";
import { spawn } from "child_process";

interface CountCardProps {
  title: string;
  label?: string;
  value: number;
  totalDetails?: any;
  enableDetails?: boolean;
}

const CountCard: FC<CountCardProps> = ({
  label = "",
  value = "0",
  title = "Sales",
  enableDetails = false,
  totalDetails = [],
}) => {
  const [isModelOpen, setIsModalOpen] = useState(false);

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
            onClick={() => setIsModalOpen(true)}
            className="absolute bottom-2 right-4 text-slate-600 hover:text-blue-500 cursor-pointer text-sm"
          >
            more
          </span>
        )}
      </div>
      <Modal
        modalWidth="35rem"
        isOpen={isModelOpen}
        onClose={() => setIsModalOpen(false)}
        title="Total Sales Detail"
      >
        <div className="overflow-auto h-[100%]">
          {totalDetails.length === 0 && (
            <div className="h-[100%] w-full flex justify-center items-center">
              <div>No record found</div>
            </div>
          )}
          {totalDetails.map((item: any, idx: number) => (
            <div
              key={idx}
              className="flex justify-between items-center py-1 px-2 text-lg"
            >
              <p className="uppercase">
                {item.type} <span className="text-sm">({item.quantity})</span>
              </p>
              <p>
                <span className="text-sm">(avg) Rs </span>
                {Math.round(item.amount / item.quantity)}
              </p>
              <p>
                {item.amount && <span className="text-sm">Rs</span>}
                {item.amount}
              </p>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default CountCard;
