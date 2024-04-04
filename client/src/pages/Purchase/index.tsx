import moment from "moment";
import { useMemo } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// components
import PurchaseModal from "./PurchaseModal";
import Table from "@/components/table/Table";
import AddButton from "@/components/button/AddButton";
// data
import { purchaseCols } from "@/data/purchase";
// store
import { usePurchaseStore } from "@/store/purchase/usePurchaseStore";
// services
import {
  deletePurchaseDataApi,
  getPurchaseTableDataApi,
} from "@/services/APIs/purchase.service";

const Purchase = () => {
  const queryClient = useQueryClient();

  const {
    setIsModalOpen,
    setPurchaseFormData: setFormData,
    setPurchaseFormDataType,
  } = usePurchaseStore();

  // Query to fetch sales data
  const { data: purchaseRowsData = [] } = useQuery({
    queryKey: ["purchase-row-data"],
    queryFn: () => getPurchaseTableDataApi(),
  });

  // Mutation to delete sales data
  const { mutate: mutateDeletePurchaseData } = useMutation({
    mutationFn: deletePurchaseDataApi,
    onSuccess: () => {
      toast.success("Purchase deleted added successfully", { duration: 1200 });
      queryClient.invalidateQueries({
        queryKey: ["purchase-row-data"],
      });
    },
    onError: () => {
      console.error("Error delete purchase data");
      toast.error("Error while deleting purchase data", { duration: 1200 });
    },
  });

  // ================== EVENT HANDLERS ==================

  const dateFormattedRowsData = useMemo(() => {
    return purchaseRowsData.map((item: any) => ({
      ...item,
      date: moment(new Date(item.date)).format("DD-MM-YYYY"),
      avg: Math.round(item.amount / item.quantity),
    }));
  }, [purchaseRowsData]);

  const handleEditRow = (rowData: any) => {
    setIsModalOpen(true);
    setFormData(rowData);
    setPurchaseFormDataType("EDIT");
  };

  /**
   * TSX
   */
  return (
    <div className="px-[2rem] py-[3rem]">
      <Table
        title="Purchase"
        enableDelete
        cols={purchaseCols}
        tableHeight="20rem"
        showEntriesPerPage={5}
        handleEditRow={handleEditRow}
        rows={dateFormattedRowsData || []}
        handleDeleteRow={(id) => mutateDeletePurchaseData(id)}
        additionalLeftSideToolbarComp={
          <AddButton
            size="sm"
            handleClick={() => {
              setPurchaseFormDataType("ADD");
              setIsModalOpen(true);
            }}
          />
        }
      />
      <PurchaseModal />
    </div>
  );
};

export default Purchase;
