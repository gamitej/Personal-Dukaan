import "./StockCard.scss";
import StockCard from "./StockCard";

const stockList = [
  {
    title: "UREA",
    isAvail: true,
    productList: [{ product: "Urea-HV", company: "HV", stock: 300 }],
    total: 500,
  },
  {
    title: "WHEAT",
    isAvail: false,
    productList: [
      { product: "Urea-HV", company: "HV", stock: 300 },
      { product: "Urea-HV", company: "HV", stock: 300 },
      { product: "Urea-HV", company: "HV", stock: 300 },
      { product: "Urea-HV", company: "HV", stock: 300 },
      { product: "Urea-HV", company: "HV", stock: 300 },
      { product: "Urea-HV", company: "HV", stock: 300 },
      { product: "Urea-HV", company: "HV", stock: 300 },
      { product: "Urea-HV", company: "HV", stock: 300 },
      { product: "Urea-HV", company: "HV", stock: 300 },
      { product: "Urea-HV", company: "HV", stock: 300 },
      { product: "Urea-HV", company: "HV", stock: 300 },
      { product: "Urea-HV", company: "HV", stock: 300 },
    ],
    total: 500,
  },
  {
    title: "UREA",
    isAvail: true,
    productList: [{ product: "Urea-HV", company: "HV", stock: 300 }],
    total: 500,
  },
  {
    title: "UREA",
    isAvail: true,
    productList: [{ product: "Urea-HV", company: "HV", stock: 300 }],
    total: 500,
  },
  {
    title: "UREA",
    isAvail: true,
    productList: [{ product: "Urea-HV", company: "HV", stock: 300 }],
    total: 500,
  },
];

const Stocks = () => {
  /**
   * TSX
   */
  return (
    <div className="w-full px-[2rem] py-[3rem] grid grid-cols-12 gap-4">
      {stockList.map((item, idx) => (
        <div key={idx} className="lg:col-span-4">
          <StockCard
            cardTitle={item.title}
            isAvail={item.isAvail}
            totalStock={item.total}
            productList={item.productList}
          />
        </div>
      ))}
    </div>
  );
};

export default Stocks;
