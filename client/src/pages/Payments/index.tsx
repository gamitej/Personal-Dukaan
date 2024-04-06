import moment from "moment";
import { useMemo } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import {
  deletePaymentDataApi,
  getPaymentsTableDataApi,
} from "@/services/APIs/payment.service";

const Expenses = () => {
  const queryClient = useQueryClient();
  const { setIsModalOpen, setPaymentFormDataType } = usePaymentStore();

  // =================== API CALL'S START ======================

  // Query to fetch sales data
  const { data: paymentsRowsData = [] } = useQuery({
    queryKey: ["payment-row-data"],
    queryFn: () => getPaymentsTableDataApi(),
  });

  // Query to fetch sales data
  // const { data: totalSales = [] } = useQuery({
  //   queryKey: ["total-sales-data", salesRowsData],
  //   queryFn: () => getTotalPaymentDataApi(),
  // });

  // Mutation to delete sales data
  const { mutate: mutateDeletePaymentData } = useMutation({
    mutationFn: deletePaymentDataApi,
    onSuccess: () => {
      toast.success("Payment deleted added successfully", { duration: 1600 });
      queryClient.invalidateQueries({
        queryKey: ["payment-row-data"],
      });
    },
    onError: () => {
      console.error("Error delete payment data");
      toast.error("Error while deleting payment data", { duration: 1600 });
    },
  });

  // =================== API CALL'S END ======================

  const dateFormattedRowsData = useMemo(() => {
    return paymentsRowsData.map((item: any) => ({
      ...item,
      date: moment(new Date(item.date)).format("DD-MM-YYYY"),
    }));
  }, [paymentsRowsData]);

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
        handleDeleteRow={(id) => mutateDeletePaymentData(id)}
        rows={dateFormattedRowsData || []}
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
