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
import { salesFormType } from "@/types/sales";

const defaultFormData = {
  date: null,
  product: null,
  amount: null,
  quantity: null,
  weight: null,
  weightType: null,
};

const Sales = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<salesFormType>(defaultFormData);

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

  const reset = () => {
    setFormData(defaultFormData);
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
      <SalesModel
        reset={reset}
        formData={formData}
        isOpen={isModalOpen}
        onClose={setIsModalOpen}
        setFormData={setFormData}
      />
    </div>
  );
};

export default Sales;
