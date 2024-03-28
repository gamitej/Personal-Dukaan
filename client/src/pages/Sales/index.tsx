import moment from "moment";
import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// components
import SalesModel from "./SalesModel";
import Table from "@/components/table/Table";
import AddButton from "@/components/button/AddButton";
// data
import { salesCols } from "@/data/sales";
// store
import { useSalesStore } from "@/store/sales/useSalesStore";
// services
import {
  deleteSalesDataApi,
  getSalesTableDataApi,
} from "@/services/APIs/sales.service";
import toast from "react-hot-toast";
import HeaderCard from "@/components/card/HeaderCard";

const Sales = () => {
  const queryClient = useQueryClient();

  // =================== API CALL'S START ======================

  const {
    setIsModalOpen,
    setSalesFormData: setFormData,
    setSalesFormDataType,
  } = useSalesStore();

  // Query to fetch sales data
  const { data: salesRowsData = [] } = useQuery({
    queryKey: ["sales-row-data"],
    queryFn: () => getSalesTableDataApi(),
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
    setSalesFormDataType("EDIT");
  };

  /**
   * TSX
   */
  return (
    <div className="px-[2rem] py-[3rem] w-full flex flex-col justify-center items-center gap-8">
      <HeaderCard />
      <Table
        title="Sales"
        enableDelete
        cols={salesCols}
        tableHeight="20rem"
        showEntriesPerPage={5}
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
