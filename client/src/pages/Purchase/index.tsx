import moment from "moment";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// components
import PurchaseModal from "./PurchaseModal";
import Table from "@/components/table/Table";
import AddButton from "@/components/button/AddButton";
// data
import { countCardPurchaseColsData, purchaseCols } from "@/data/purchase";
// store
import { usePurchaseStore } from "@/store/purchase/usePurchaseStore";
// services
import {
  deletePurchaseDataApi,
  getPurchaseTableDataApi,
  getTotalPurchaseDataApi,
} from "@/services/APIs/purchase.service";
import CountCard from "@/components/card/CountCard";
import { formattedRows, getTotalAmtAndQut } from "@/utils";
import HeaderCard from "@/components/card/HeaderCard";
import { DateFieldType } from "@/types/components.type";

const Purchase = () => {
  const queryClient = useQueryClient();
  const [dateField, setDateField] = useState<DateFieldType | null>({
    startDate: null,
    endDate: null,
  });

  const {
    setIsModalOpen,
    setPurchaseFormData: setFormData,
    setPurchaseFormDataType,
  } = usePurchaseStore();

  // =================== API CALL'S START ======================

  // Query to fetch purchase data
  const { data: purchaseRowsData = [] } = useQuery({
    queryKey: ["purchase-row-data", dateField],
    queryFn: () => getPurchaseTableDataApi(dateField),
  });

  // Query to fetch purchase data
  const { data: totalPurchase = [] } = useQuery({
    queryKey: ["total-purchase-data", purchaseRowsData, dateField],
    queryFn: () => getTotalPurchaseDataApi(dateField),
  });

  // Mutation to delete purchase data
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

  // =================== API CALL'S END ======================

  // ==================== EVENT HANDLERS =====================

  const { totalAmount, totalQuantity } = useMemo(() => {
    return getTotalAmtAndQut(totalPurchase);
  }, [totalPurchase]);

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
    <div className="px-[2rem] py-[3rem] w-full flex flex-col justify-center items-center gap-12">
      <div className="w-full h-[100%] flex items-center gap-6 flex-wrap">
        <HeaderCard handleDateSubmit={setDateField} />
        <CountCard
          label="rs"
          enableDetails
          title="Purchase"
          value={totalAmount}
          modalTitle="Total Purchase Details"
          modalTableCols={countCardPurchaseColsData}
          totalDetails={formattedRows(totalPurchase)}
        />
        <CountCard title="Quantity" value={totalQuantity} />
      </div>
      <Table
        title="Purchase"
        // enableDelete
        cols={purchaseCols}
        tableHeight="20rem"
        showEntriesPerPage={10}
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
