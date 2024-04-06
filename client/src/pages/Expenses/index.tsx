import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// components
import ExpenseModal from "./ExpenseModal";
import Table from "@/components/table/Table";
import CountCard from "@/components/card/CountCard";
import AddButton from "@/components/button/AddButton";
// data
import { expenseCols } from "@/data/expenses";
// store
import { useExpenseStore } from "@/store/expenses/useExpenseStore";
// service
import {
  deleteExpenseDataApi,
  getExpenseDataApi,
} from "@/services/APIs/expense.service";
import toast from "react-hot-toast";
import moment from "moment";
import { useMemo, useState } from "react";
import HeaderCard from "@/components/card/HeaderCard";
import { DateFieldType } from "@/types/components.type";

const Expenses = () => {
  const queryClient = useQueryClient();
  const [dateField, setDateField] = useState<DateFieldType | null>({
    startDate: null,
    endDate: null,
  });
  const { setIsModalOpen, setExpenseFormDataType } = useExpenseStore();
  // =================== API CALL'S START ======================

  // Query to fetch expense data
  const { data: expenseRowsData = [] } = useQuery({
    queryKey: ["expense-row-data", dateField],
    queryFn: () => getExpenseDataApi(dateField),
  });

  // Mutation to delete sales data
  const { mutate: mutateDeleteExpenseData } = useMutation({
    mutationFn: deleteExpenseDataApi,
    onSuccess: () => {
      toast.success("Expense deleted added successfully", { duration: 1600 });
      queryClient.invalidateQueries({
        queryKey: ["expense-row-data"],
      });
    },
    onError: () => {
      console.error("Error delete expense data");
      toast.error("Error while deleting expense data", { duration: 1600 });
    },
  });

  // =================== API CALL'S END ======================

  const dateFormattedRowsData = useMemo(() => {
    return expenseRowsData.map((item: any) => ({
      ...item,
      date: moment(new Date(item.date)).format("DD-MM-YYYY"),
    }));
  }, [expenseRowsData]);

  /**
   * TSX
   */
  return (
    <div className="px-[2rem] py-[3rem] w-full flex flex-col justify-center items-center gap-12">
      <div className="w-full h-[100%] flex items-center gap-6 flex-wrap">
        <HeaderCard handleDateSubmit={setDateField} />
        <CountCard
          title="Expenses"
          label="rs"
          //   enableDetails
          value={0}
          //   modalTitle="Total Sales Details"
          //   totalDetails={formattedRows(totalSales)}
          //   modalTableCols={countCardSalesColsData}
        />
      </div>
      <Table
        title="Expenses"
        enableDelete
        cols={expenseCols}
        tableHeight="20rem"
        showEntriesPerPage={10}
        handleDeleteRow={(id) => mutateDeleteExpenseData(id)}
        rows={dateFormattedRowsData || []}
        additionalLeftSideToolbarComp={
          <AddButton
            size="sm"
            handleClick={() => {
              setExpenseFormDataType("ADD");
              setIsModalOpen(true);
            }}
          />
        }
      />
      <ExpenseModal />
    </div>
  );
};

export default Expenses;
