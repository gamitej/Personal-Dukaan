import { useQuery } from "@tanstack/react-query";
// components
import PaymentModel from "./PaymentModel";
import Table from "@/components/table/Table";
import CountCard from "@/components/card/CountCard";
import AddButton from "@/components/button/AddButton";
// data
import { paymentsCols } from "@/data/payments";
// store
import { usePaymentStore } from "@/store/payments/usePaymentStore";
// service
import { getPaymentsTableDataApi } from "@/services/APIs/payment.service";

const Expenses = () => {
  const { setIsModalOpen, setPaymentFormDataType } = usePaymentStore();

  // =================== API CALL'S START ======================

  // Query to fetch sales data
  const { data: paymentsRowsData = [] } = useQuery({
    queryKey: ["sales-row-data"],
    queryFn: () => getPaymentsTableDataApi(),
  });

  // Query to fetch sales data
  // const { data: totalSales = [] } = useQuery({
  //   queryKey: ["total-sales-data", salesRowsData],
  //   queryFn: () => getTotalPaymentDataApi(),
  // });

  // =================== API CALL'S END ======================

  /**
   * TSX
   */
  return (
    <div className="px-[2rem] py-[3rem] w-full flex flex-col justify-center items-center gap-12">
      <div className="w-full h-[100%] flex items-center gap-6 flex-wrap">
        <CountCard
          title="Pending Payment"
          label="rs"
          //   enableDetails
          value={0}
          //   modalTitle="Total Sales Details"
          //   totalDetails={formattedRows(totalSales)}
          //   modalTableCols={countCardSalesColsData}
        />
      </div>
      <Table
        title="Payment"
        enableDelete
        cols={paymentsCols}
        tableHeight="20rem"
        showEntriesPerPage={10}
        // handleEditRow={handleEditRow}
        // handleDeleteRow={(id) => mutateDeleteSalesData(id)}
        rows={paymentsRowsData || []}
        additionalLeftSideToolbarComp={
          <AddButton
            size="sm"
            handleClick={() => {
              setPaymentFormDataType("ADD");
              setIsModalOpen(true);
            }}
          />
        }
      />
      <PaymentModel />
    </div>
  );
};

export default Expenses;
