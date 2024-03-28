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
    <div className="shadow-md rounded-xl bg-slate-100 border-2 border-blue-300">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-primaryBlue font-[600] text-xl uppercase">
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
              idx + 1 !== productList?.length && ""
            } py-1 px-6`}
          >
            <div className="py-1">
              <p className="text-lg text-slate-600 font-[400] uppercase">
                {product}
              </p>
              <p className="text-slate-500 font-[400] text-md">( {company} )</p>
            </div>
            <p className="text-salte-600 font-[400]">{stock}</p>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-300"></div>
      <div className="flex justify-center items-center">
        <div className="w-full p-4 flex justify-between items-center">
          <h2 className="font-[500]">Total Stock</h2>
          <p className="font-[500]">{totalStock}</p>
        </div>
      </div>
    </div>
  );
};

export default StockCard;
