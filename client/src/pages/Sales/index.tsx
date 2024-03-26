// components
import Table from "@/components/table/Table";
import AddButton from "@/components/button/AddButton";
import { salesCols, salesRows } from "@/data/sales";

const Sales = () => {
  /**
   * TSX
   */
  return (
    <div className="px-[2rem] py-[3rem]">
      <Table
        showEntriesPerPage={5}
        cols={salesCols}
        rows={salesRows}
        title="Sales"
        tableHeight="10rem"
        additionalLeftSideToolbarComp={<AddButton handleClick={() => {}} />}
      />
    </div>
  );
};

export default Sales;
