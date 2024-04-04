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

  console.log({ totalProfit });

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

  /**
   * TSX
   */
  return (
    <div className="w-full flex items-center gap-6 flex-wrap">
      <CountCard title="Profit" value={0} label="Rs" />
      <CountCard
        label="Rs"
        enableDetails
        title="Purchase"
        value={totalAmtPurchase}
        totalDetails={totalPurchase}
      />
      <CountCard
        label="Rs"
        title="Sales"
        enableDetails
        value={totalAmtSales}
        totalDetails={totalSales}
      />
    </div>
  );
};

export default StatusCard;
