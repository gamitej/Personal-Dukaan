import CountCard from "@/components/card/CountCard";
import { getProfitDataApi } from "@/services/APIs/overview.service";
import { getTotalPurchaseDataApi } from "@/services/APIs/purchase.service";
import { getTotalSalesDataApi } from "@/services/APIs/sales.service";
import { getTotalAmtAndQut } from "@/utils";
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
        product_type: item.type,
        quantity: `${item.total_sold_quantity}/${item.total_purchase_quantity}`,
        avg: Math.round(item.total_sold_amount / item.total_sold_quantity),
        profit: item.profit,
        profit1: item.profit,
        profit2: item.profit,
      };
    });

    return { ...totalAmount, totalDetails };
  }, [totalProfit]);

  console.log({ totalDetails });

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
        totalDetails={totalDetails}
        title="Profit"
        value={totalProfitAmt}
        modalTitle="Total Profit Details"
        modalTableCols={[
          "Product Type",
          "Quantity (sales/pur)",
          "Avg Price (sales/pur)",
          "Total Sales Of Product",
          "Total Purchase Of Product",
          "Profit",
        ]}
      />
      {/* ============ PURCHASE =========== */}
      <CountCard
        label="Rs"
        enableDetails
        title="Purchase"
        value={totalAmtPurchase}
        totalDetails={totalPurchase}
        modalTitle="Total Purchase Details"
      />
      {/* ============ SALES =========== */}
      <CountCard
        label="Rs"
        title="Sales"
        enableDetails
        value={totalAmtSales}
        totalDetails={totalSales}
        modalTitle="Total Sales Details"
      />
    </div>
  );
};

export default StatusCard;
