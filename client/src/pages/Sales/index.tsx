import { useState } from "react";
// components
import SalesModel from "./SalesModel";
import Table from "@/components/table/Table";
import AddButton from "@/components/button/AddButton";
// data
import { salesCols } from "@/data/sales";
import { useQuery } from "@tanstack/react-query";
import { getSalesTableDataApi } from "@/services/APIs/sales.service";

const Sales = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Query to fetch sales data
  const { data: salesRowsData = [] } = useQuery({
    queryKey: ["sales-row-data"],
    queryFn: () => getSalesTableDataApi(),
  });

  /**
   * TSX
   */
  return (
    <div className="px-[2rem] py-[3rem]">
      <Table
        showEntriesPerPage={5}
        cols={salesCols}
        rows={salesRowsData || []}
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
