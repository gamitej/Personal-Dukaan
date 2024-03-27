import moment from "moment";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
// components
import PurchaseModal from "./PurchaseModal";
import Table from "@/components/table/Table";
import AddButton from "@/components/button/AddButton";
// data
import { purchaseCols, purchaseRows } from "@/data/purchase";
// store
import { usePurchaseStore } from "@/store/purchase/usePurchaseStore";
// services
import { getSalesTableDataApi } from "@/services/APIs/sales.service";

const Purchase = () => {
  const {
    setIsModalOpen,
    setPurchaseFormData: setFormData,
    setPurchaseFormDataType,
  } = usePurchaseStore();

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
    setPurchaseFormDataType("EDIT");
  };

  /**
   * TSX
   */
  return (
    <div className="px-[2rem] py-[3rem]">
      <Table
        enableEdit
        title="Purchase"
        enableDelete
        cols={purchaseCols}
        tableHeight="20rem"
        showEntriesPerPage={5}
        handleEditRow={handleEditRow}
        rows={purchaseRows || []}
        additionalLeftSideToolbarComp={
          <AddButton
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
