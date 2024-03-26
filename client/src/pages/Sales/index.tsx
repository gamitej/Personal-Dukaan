import { useState } from "react";
// components
import SalesModel from "./SalesModel";
import Table from "@/components/table/Table";
import AddButton from "@/components/button/AddButton";
// data
import { salesCols, salesRows } from "@/data/sales";

const Sales = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * TSX
   */
  return (
    <div className="px-[2rem] py-[3rem]">
      <Table
        showEntriesPerPage={5}
        cols={salesCols}
        rows={salesRows}
        title="Sales"
        tableHeight="10rem"
        additionalLeftSideToolbarComp={
          <AddButton handleClick={() => setIsModalOpen(true)} />
        }
      />
      <SalesModel isOpen={isModalOpen} onClose={setIsModalOpen} />
    </div>
  );
};

export default Sales;
