import "./StockCard.scss";
import StockCard from "./StockCard";
import { useQuery } from "@tanstack/react-query";
import { getStockDataApi } from "@/services/APIs/stock.service";
import { stockAvailListType } from "@/types/stock";

const Stocks = () => {
  // Query to fetch stocks data
  const { data: stockAvailList = [] } = useQuery<stockAvailListType[]>({
    queryKey: ["stocks-avail-data"],
    queryFn: () => getStockDataApi(),
  });

  /**
   * TSX
   */
  return (
    <div className="w-full px-[2rem] py-[3rem] grid grid-cols-12 gap-4">
      {stockAvailList?.map((item, idx: number) => (
        <div key={idx} className="lg:col-span-4">
          <StockCard
            cardTitle={item.title}
            isAvail={item.total > 0}
            totalStock={item.total}
            productList={item.productList}
          />
        </div>
      ))}
    </div>
  );
};

export default Stocks;
