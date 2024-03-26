// components
import Table from "@/components/table/Table";
import AddButton from "@/components/button/AddButton";

const cols = [
  { label: "S.no", value: "no", width: "2rem" },
  { label: "Date", value: "date", width: "3rem" },
  { label: "Description", value: "desc", width: "10rem" },
  { label: "Amount", value: "amount", width: "5rem" },
  { label: "For", value: "for", width: "3rem" },
];

const rows = [
  {
    no: "1",
    date: "20-01-23",
    desc: "recharge",
    amount: "Rs 3200",
    for: "Home",
  },
  {
    no: "1",
    date: "20-01-23",
    desc: "petrol",
    amount: "Rs 3200",
    for: "Wife",
  },
];

const Sales = () => {
  /**
   * TSX
   */
  return (
    <div className="px-[2rem] py-[3rem]">
      <Table
        showEntriesPerPage={5}
        cols={cols}
        rows={rows}
        title="Sales"
        tableHeight="10rem"
        additionalLeftSideToolbarComp={<AddButton handleClick={() => {}} />}
      />
    </div>
  );
};

export default Sales;
