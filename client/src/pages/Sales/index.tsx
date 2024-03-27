import moment from "moment";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
// components
import SalesModel from "./SalesModel";
import Table from "@/components/table/Table";
import AddButton from "@/components/button/AddButton";
// data
import { salesCols } from "@/data/sales";
// store
import { useSalesStore } from "@/store/sales/useSalesStore";
// services
import { getSalesTableDataApi } from "@/services/APIs/sales.service";

const Sales = () => {
  const { setIsModalOpen, setSalesFormData: setFormData } = useSalesStore();

  // Query to fetch sales data
  const { data: salesRowsData = [] } = useQuery({
    queryKey: ["sales-row-data"],
    queryFn: () => getSalesTableDataApi(),
  });

  // ================== EVENT HANDLERS ==================

  const dateFormattedRowsData = useMemo(() => {
    return salesRowsData.map((item: any) => ({
      ...item,
      date: moment(new Date(item.date)).format("DD-MM-YYYY"),
    }));
  }, [salesRowsData]);

  const handleEditRow = (rowData: any) => {
    console.log(rowData);
    setIsModalOpen(true);
    setFormData(rowData);
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
        cols={salesCols}
        tableHeight="20rem"
        showEntriesPerPage={5}
        handleEditRow={handleEditRow}
        rows={dateFormattedRowsData || []}
        additionalLeftSideToolbarComp={
          <AddButton handleClick={() => setIsModalOpen(true)} />
        }
      />
      <SalesModel />
    </div>
  );
};

export default Sales;
