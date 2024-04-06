import { useQuery } from "@tanstack/react-query";
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
import { getExpenseDataApi } from "@/services/APIs/expense.service";

const Expenses = () => {
  const { setIsModalOpen } = useExpenseStore();

  // =================== API CALL'S START ======================

  // Query to fetch expense data
  const { data: expenseRowsData = [] } = useQuery({
    queryKey: ["expense-row-data"],
    queryFn: () => getExpenseDataApi(),
  });

  /**
   * TSX
   */
  return (
    <div className="px-[2rem] py-[3rem] w-full flex flex-col justify-center items-center gap-12">
      <div className="w-full h-[100%] flex items-center gap-6 flex-wrap">
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
        // handleEditRow={handleEditRow}
        // handleDeleteRow={(id) => mutateDeleteSalesData(id)}
        rows={expenseRowsData || []}
        additionalLeftSideToolbarComp={
          <AddButton
            size="sm"
            handleClick={() => {
              //   setSalesFormDataType("ADD");
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
