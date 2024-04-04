import { FC, useState } from "react";
// components
import Modal from "../modal/Modal";
import NormalTable from "./NormalTable";

interface CountCardProps {
  title: string;
  label?: string;
  value: number;
  totalDetails?: any;
  modalTitle?: string;
  modalWidth?: string;
  enableDetails?: boolean;
  modalTableCols?: any[];
  modalHeight?: string;
}

const CountCard: FC<CountCardProps> = ({
  label = "",
  value = "0",
  title = "Sales",
  totalDetails = [],
  enableDetails = false,
  modalTitle = "Total Details",
  modalWidth = "45rem",
  modalTableCols = [],
  modalHeight = "25rem",
}) => {
  const [isModelOpen, setIsModalOpen] = useState(false);

  /**
   * TSX
   */
  return (
    <div className="relative h-[8rem] border px-6 py-4 rounded-lg shadow-md bg-slate-200">
      <div className="flex justify-between items-center w-[20rem] h-[100%]">
        <div className="text-slate-600 font-[500] text-xl font-sans">
          TOTAL
          <br />
          <span className="ml-6 uppercase">{title}</span>
        </div>
        <div>
          <p className={`text-3xl font-[500] font-poppins text-slate-700`}>
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
        title={modalTitle}
        isOpen={isModelOpen}
        modalHeight={modalHeight}
        modalWidth={modalWidth}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="overflow-auto h-[100%]">
          {totalDetails.length === 0 && (
            <div className="h-[70%] w-full flex justify-center items-center">
              <div className="text-slate-500 text-xl">No record found</div>
            </div>
          )}
          {totalDetails.length > 0 && (
            <NormalTable cols={modalTableCols} rows={totalDetails} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default CountCard;
