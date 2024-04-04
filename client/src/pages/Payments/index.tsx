// components
import PaymentModel from "./PaymentModel";
import Table from "@/components/table/Table";
import CountCard from "@/components/card/CountCard";
import AddButton from "@/components/button/AddButton";
// data
import { paymentsCols, paymentsRows } from "@/data/payments";

const Expenses = () => {
  /**
   * TSX
   */
  return (
    <div className="px-[2rem] py-[3rem] w-full flex flex-col justify-center items-center gap-12">
      <div className="w-full h-[100%] flex items-center gap-6 flex-wrap">
        <CountCard
          title="Pending Payment"
          label="rs"
          //   enableDetails
          value={0}
          //   modalTitle="Total Sales Details"
          //   totalDetails={formattedRows(totalSales)}
          //   modalTableCols={countCardSalesColsData}
        />
      </div>
      <Table
        title="Payment"
        enableDelete
        cols={paymentsCols}
        tableHeight="20rem"
        showEntriesPerPage={10}
        // handleEditRow={handleEditRow}
        // handleDeleteRow={(id) => mutateDeleteSalesData(id)}
        rows={paymentsRows || []}
        additionalLeftSideToolbarComp={
          <AddButton
            size="sm"
            handleClick={() => {
              //   setSalesFormDataType("ADD");
              //   setIsModalOpen(true);
            }}
          />
        }
      />
      <PaymentModel />
    </div>
  );
};

export default Expenses;
