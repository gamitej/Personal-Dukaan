import { FC, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
// components
import CountCard from "@/components/card/CountCard";
// data
import { countCardSalesColsData } from "@/data/sales";
import { countCardProfitColsData } from "@/data/overview";
import {
  formattedRowForExpense,
  formattedRows,
  getTotalAmtAndQut,
} from "@/utils";
import { countCardPurchaseColsData } from "@/data/purchase";
// services
import { getProfitDataApi } from "@/services/APIs/overview.service";
import { getTotalSalesDataApi } from "@/services/APIs/sales.service";
import { getTotalPurchaseDataApi } from "@/services/APIs/purchase.service";
import { DateFieldType } from "@/types/components.type";
import { getTotalExpensesDataApi } from "@/services/APIs/expense.service";
import { GetOverallProfit } from "./data/func";
import { countCardExpensesColsData } from "@/data/expenses";

interface StatusCardProps {
  dateField: DateFieldType | null;
}

const StatusCard: FC<StatusCardProps> = ({ dateField }) => {
  // =================== API CALL'S START ======================

  // Query to fetch sales data
  const { data: totalProfit = [] } = useQuery({
    queryKey: ["total-profit-data", dateField],
    queryFn: () => getProfitDataApi(dateField),
  });

  // Query to fetch sales data
  const { data: totalSales = [] } = useQuery({
    queryKey: ["total-sales-data", dateField],
    queryFn: () => getTotalSalesDataApi(dateField),
  });

  // Query to fetch purchase data
  const { data: totalPurchase = [] } = useQuery({
    queryKey: ["total-purchase-data", dateField],
    queryFn: () => getTotalPurchaseDataApi(dateField),
  });

  // Query to fetch expense data
  const { data: totalExpenses = [] } = useQuery({
    queryKey: ["total-expense-data", dateField],
    queryFn: () => getTotalExpensesDataApi(dateField),
  });

  // =================== API CALL'S END ======================

  // ==================== EVENT HANDLERS =====================

  // total expenses amount
  const { totalAmount: totalExpenseAmount } = useMemo(() => {
    const totalAmount = totalExpenses.reduce(
      (acc: any, { amount }: { amount: number }) => {
        acc.totalAmount += amount;
        return acc;
      },
      { totalAmount: 0 }
    );

    return totalAmount;
  }, [totalExpenses]);

  // total sales data calculation
  const { totalAmount: totalAmtSales } = useMemo(() => {
    return getTotalAmtAndQut(totalSales);
  }, [totalSales]);

  // total purchase data calculation
  const { totalAmount: totalAmtPurchase } = useMemo(() => {
    return getTotalAmtAndQut(totalPurchase);
  }, [totalPurchase]);

  // total profit data calculation
  const { totalAmount: totalProfitAmt, totalDetails = [] } = useMemo(() => {
    return GetOverallProfit(totalProfit);
  }, [totalProfit]);

  /**
   * TSX
   */
  return (
    <div className="w-full flex items-center gap-6 flex-wrap">
      {/* ============ PROFIT =========== */}
      <CountCard
        label="Rs"
        enableDetails
        modalWidth="80%"
        title="Profit"
        value={totalProfitAmt}
        totalDetails={totalDetails}
        modalTitle="Total Profit Details"
        modalTableCols={countCardProfitColsData}
      />
      {/* ============ PURCHASE =========== */}
      <CountCard
        label="Rs"
        enableDetails
        title="Purchase"
        value={totalAmtPurchase}
        modalTitle="Total Purchase Details"
        modalTableCols={countCardPurchaseColsData}
        totalDetails={formattedRows(totalPurchase)}
      />
      {/* ============ SALES =========== */}
      <CountCard
        label="Rs"
        title="Sales"
        enableDetails
        value={totalAmtSales}
        modalTitle="Total Sales Details"
        modalTableCols={countCardSalesColsData}
        totalDetails={formattedRows(totalSales)}
      />
      {/* ============ EXPENSES =========== */}
      <CountCard
        label="Rs"
        title="Expenses"
        enableDetails
        value={totalExpenseAmount}
        modalTitle="Total Expenses Details"
        modalTableCols={countCardExpensesColsData}
        totalDetails={formattedRowForExpense(totalExpenses)}
      />
    </div>
  );
};

export default StatusCard;
