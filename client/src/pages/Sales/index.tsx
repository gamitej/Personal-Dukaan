import { useMemo, useState } from "react";
// components
import SalesModel from "./SalesModel";
import Table from "@/components/table/Table";
import AddButton from "@/components/button/AddButton";
// data
import { salesCols } from "@/data/sales";
import { useQuery } from "@tanstack/react-query";
import { getSalesTableDataApi } from "@/services/APIs/sales.service";
import moment from "moment";

const Sales = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Query to fetch sales data
  const { data: salesRowsData = [] } = useQuery({
    queryKey: ["sales-row-data"],
    queryFn: () => getSalesTableDataApi(),
  });

  const dateFormattedRowsData = useMemo(() => {
    return salesRowsData.map((item: any) => ({
      ...item,
      date: moment(new Date(item.date)).format("DD-MM-YYYY"),
    }));
  }, [salesRowsData]);

  const handleEditRow = (rowData: any) => {
    console.log(rowData);
  };

  /**
   * TSX
   */
  return (
    <div className="px-[2rem] py-[3rem]">
      <Table
        enableEdit
        title="Sales"
        enableDelete
        tableHeight="20rem"
        showEntriesPerPage={5}
        cols={salesCols}
        handleEditRow={handleEditRow}
        rows={dateFormattedRowsData || []}
        additionalLeftSideToolbarComp={
          <AddButton handleClick={() => setIsModalOpen(true)} />
        }
      />
      <SalesModel isOpen={isModalOpen} onClose={setIsModalOpen} />
    </div>
  );
};

export default Sales;
