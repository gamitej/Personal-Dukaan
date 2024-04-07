import moment from "moment";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// components
import PaymentModel from "./PaymentModel";
import Table from "@/components/table/Table";
import CountCard from "@/components/card/CountCard";
import AddButton from "@/components/button/AddButton";
// data
import {
  countCardPendingPaymentsColsData,
  paymentsCols,
} from "@/data/payments";
// store
import { usePaymentStore } from "@/store/payments/usePaymentStore";
// service
import {
  deletePaymentDataApi,
  getPaymentsTableDataApi,
  getPendingPaymentsDataApi,
} from "@/services/APIs/payment.service";
import HeaderCard from "@/components/card/HeaderCard";
import { DateFieldType } from "@/types/components.type";
import { formattRowForPendingPayment } from "@/utils";

const Expenses = () => {
  const queryClient = useQueryClient();
  const [dateField, setDateField] = useState<DateFieldType | null>({
    startDate: null,
    endDate: null,
  });
  const { setIsModalOpen, setPaymentFormDataType } = usePaymentStore();

  // =================== API CALL'S START ======================

  // Query to fetch payment data
  const { data: paymentsRowsData = [] } = useQuery({
    queryKey: ["payment-row-data", dateField],
    queryFn: () => getPaymentsTableDataApi(dateField),
  });

  // Query to fetch payment data
  const { data: totalPendingPayment = [] } = useQuery({
    queryKey: ["pending-payment-data", dateField],
    queryFn: () => getPendingPaymentsDataApi(dateField),
  });

  console.log({ totalPendingPayment });

  // Mutation to delete payment data
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

  const { totalAmount: totalPendingAmount } = useMemo(() => {
    const totalAmount = totalPendingPayment.reduce(
      (acc: any, { amount }: { amount: number }) => {
        acc.totalAmount += amount;
        return acc;
      },
      { totalAmount: 0 }
    );

    return totalAmount;
  }, [totalPendingPayment]);

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
          title="Payment"
          topTitle="PENDING"
          value={totalPendingAmount}
          modalTitle="Total Sales Details"
          modalTableCols={countCardPendingPaymentsColsData}
          totalDetails={formattRowForPendingPayment(totalPendingPayment)}
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
