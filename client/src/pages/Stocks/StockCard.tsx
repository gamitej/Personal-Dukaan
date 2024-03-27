import { FC } from "react";

interface StockCardProps {
  isAvail: boolean;
  cardTitle: string;
  totalStock: number;
  productList: { product: string; company: string; stock: number }[];
}

const StockCard: FC<StockCardProps> = ({
  isAvail = true,
  cardTitle = "title",
  productList = [],
  totalStock = 400,
}) => {
  /**
   * TSX
   */
  return (
    <div className="border-2 border-[#673DE6] shadow-lg rounded-xl bg-[#EBE4FF]">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-[#2F1C6A] font-[500] text-xl uppercase">
          {cardTitle}
        </h2>
        <div>
          {isAvail ? (
            <div className="bg-green-500 px-2 py-1 font-[500] text-white text-sm rounded-sm shadow-md">
              AVAIL
            </div>
          ) : (
            <div className="bg-red-500 px-2 py-1 font-[500] text-white text-sm rounded-sm shadow-md">
              NOT AVAIL
            </div>
          )}
        </div>
      </div>
      <div className="w-full border-t border-slate-300"></div>
      <div className="h-[17.5rem] overflow-auto flex flex-col gap-2">
        {productList?.map(({ product, company, stock }, idx: number) => (
          <div
            key={`stock-card-${idx}`}
            className={`flex justify-between items-center ${
              idx + 1 !== productList?.length && "border-b"
            } py-1 px-6`}
          >
            <div className="py-1">
              <p className="text-sm text-[#472D94] font-semibold">{product}</p>
              <p className="text-[#472D94] font-semibold text-sm">
                ( {company} )
              </p>
            </div>
            <p className="text-[#472D94] font-semibold">{stock}</p>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-300"></div>
      <div className="flex justify-center items-center">
        <div className="w-full p-4 flex justify-between items-center">
          <h2>Total Stock</h2>
          <p>{totalStock}</p>
        </div>
      </div>
    </div>
  );
};

export default StockCard;
