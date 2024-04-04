import CountCard from "@/components/card/CountCard";
import { countCardProfitColsData } from "@/data/overview";
import { countCardPurchaseColsData } from "@/data/purchase";
import { countCardSalesColsData } from "@/data/sales";
import { getProfitDataApi } from "@/services/APIs/overview.service";
import { getTotalPurchaseDataApi } from "@/services/APIs/purchase.service";
import { getTotalSalesDataApi } from "@/services/APIs/sales.service";
import { formattedRows, getTotalAmtAndQut } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const StatusCard = () => {
  // =================== API CALL'S START ======================

  // getProfitDataApi

  // Query to fetch sales data
  const { data: totalProfit = [] } = useQuery({
    queryKey: ["total-profit-data"],
    queryFn: () => getProfitDataApi(),
  });

  // Query to fetch sales data
  const { data: totalSales = [] } = useQuery({
    queryKey: ["total-sales-data"],
    queryFn: () => getTotalSalesDataApi(),
  });

  // Query to fetch purchase data
  const { data: totalPurchase = [] } = useQuery({
    queryKey: ["total-purchase-data"],
    queryFn: () => getTotalPurchaseDataApi(),
  });

  // =================== API CALL'S END ======================

  // ==================== EVENT HANDLERS =====================

  const { totalAmount: totalAmtSales } = useMemo(() => {
    return getTotalAmtAndQut(totalSales);
  }, [totalSales]);

  const { totalAmount: totalAmtPurchase } = useMemo(() => {
    return getTotalAmtAndQut(totalPurchase);
  }, [totalPurchase]);

  const { totalAmount: totalProfitAmt, totalDetails = [] } = useMemo(() => {
    const totalAmount = totalProfit.reduce(
      (acc: any, { profit }: { profit: number }) => {
        acc.totalAmount += profit;
        return acc;
      },
      { totalAmount: 0 }
    );

    const totalDetails = totalProfit.map((item: any) => {
      // console.log(item);

      return {
        product: item.type,
        quantity: `${item.total_sold_quantity}/${item.total_purchase_quantity}`,
        avg: `rs ${Math.round(
          item.total_sold_amount / item.total_sold_quantity
        )}/${Math.round(
          item.total_purchase_amount / item.total_purchase_quantity
        )}`,
        sold: `Rs ${item.total_sold_amount}`,
        purchased: `Rs ${item.total_purchase_amount}`,
        profit: `Rs ${item.profit}`,
      };
    });

    return { ...totalAmount, totalDetails };
  }, [totalProfit]);

  console.log({ totalProfit });

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
        totalDetails={totalSales}
        modalTitle="Total Sales Details"
        modalTableCols={countCardSalesColsData}
      />
    </div>
  );
};

export default StatusCard;
