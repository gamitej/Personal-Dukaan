import moment from "moment";
import toast from "react-hot-toast";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// components
import SalesModel from "./SalesModel";
import Table from "@/components/table/Table";
import CountCard from "@/components/card/CountCard";
import AddButton from "@/components/button/AddButton";
import HeaderCard from "@/components/card/HeaderCard";
// data
import { countCardSalesColsData, salesCols } from "@/data/sales";
// store
import { useSalesStore } from "@/store/sales/useSalesStore";
// services
import {
  deleteSalesDataApi,
  getSalesTableDataApi,
  getTotalSalesDataApi,
} from "@/services/APIs/sales.service";
// utils
import { DateFieldType } from "@/types/components.type";
import { formattedRows, getTotalAmtAndQut } from "@/utils";

const Sales = () => {
  const queryClient = useQueryClient();
  const [dateField, setDateField] = useState<DateFieldType | null>({
    startDate: null,
    endDate: null,
  });

  // =================== API CALL'S START ======================

  const {
    setIsModalOpen,
    setSalesFormData: setFormData,
    setSalesFormDataType,
  } = useSalesStore();

  // Query to fetch sales data
  const { data: salesRowsData = [] } = useQuery({
    queryKey: ["sales-row-data", dateField],
    queryFn: () => getSalesTableDataApi(dateField),
  });

  // Query to fetch sales data
  const { data: totalSales = [] } = useQuery({
    queryKey: ["total-sales-data", salesRowsData],
    queryFn: () => getTotalSalesDataApi(),
  });

  // Mutation to delete sales data
  const { mutate: mutateDeleteSalesData } = useMutation({
    mutationFn: deleteSalesDataApi,
    onSuccess: () => {
      toast.success("Sales deleted added successfully", { duration: 1200 });
      queryClient.invalidateQueries({
        queryKey: ["sales-row-data"],
      });
    },
    onError: () => {
      console.error("Error delete sales data");
      toast.error("Error while deleting sales data", { duration: 1200 });
    },
  });

  // =================== API CALL'S END ======================

  // ==================== EVENT HANDLERS =====================

  const { totalAmount, totalQuantity } = useMemo(() => {
    return getTotalAmtAndQut(totalSales);
  }, [totalSales]);

  const dateFormattedRowsData = useMemo(() => {
    return salesRowsData.map((item: any) => ({
      ...item,
      date: moment(new Date(item.date)).format("DD-MM-YYYY"),
      avg: Math.round(item.amount / item.quantity),
    }));
  }, [salesRowsData]);

  const handleEditRow = (rowData: any) => {
    setIsModalOpen(true);
    setFormData(rowData);
    setSalesFormDataType("EDIT");
  };

  /**
   * TSX
   */
  return (
    <div className="px-[2rem] py-[3rem] w-full flex flex-col justify-center items-center gap-12">
      <div className="w-full h-[100%] flex items-center gap-6 flex-wrap">
        <HeaderCard handleDateSubmit={setDateField} />
        <CountCard
          title="Sales"
          label="rs"
          enableDetails
          value={totalAmount}
          modalTitle="Total Sales Details"
          totalDetails={formattedRows(totalSales)}
          modalTableCols={countCardSalesColsData}
        />
        <CountCard title="Quantity" value={totalQuantity} />
      </div>
      <Table
        title="Sales"
        enableDelete
        cols={salesCols}
        tableHeight="20rem"
        showEntriesPerPage={10}
        handleEditRow={handleEditRow}
        handleDeleteRow={(id) => mutateDeleteSalesData(id)}
        rows={dateFormattedRowsData || []}
        additionalLeftSideToolbarComp={
          <AddButton
            size="sm"
            handleClick={() => {
              setSalesFormDataType("ADD");
              setIsModalOpen(true);
            }}
          />
        }
      />
      <SalesModel />
    </div>
  );
};

export default Sales;
