// icons
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
// components
import Dropdown from "../dropdown/Dropdown";
// data
import { paginationDropDownOptions } from "./data";

interface TableFooterProps {
  pageNo: number;
  rowsCount: number;
  totalPage: number;
  paginationValue: number;
  setPageNo: (num: number) => void;
  setPaginationValue: (val: any) => void;
}

const TableFooter: React.FC<TableFooterProps> = ({
  pageNo,
  totalPage,
  setPageNo,
  rowsCount = 0,
  paginationValue,
  setPaginationValue,
}) => {
  const handleNext = () => {
    if (pageNo < totalPage) {
      setPageNo(pageNo + 1);
    }
  };

  const handlePrev = () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    }
  };
  /**
   * TSX
   */
  return (
    <div className="table-footer border-t">
      <div className="footer-left">
        Showing {totalPage > 0 ? pageNo : 0} of {totalPage} entries ({" "}
        {rowsCount} )
      </div>
      <div className="footer-right">
        <Dropdown
          label=""
          width="5rem"
          onChange={setPaginationValue}
          selectedValue={paginationValue}
          options={paginationDropDownOptions}
        />
        <div className="pagination">
          <div
            className={`${
              pageNo === 1
                ? "text-gray-200"
                : "text-blue-400 hover:text-blue-500 cursor-pointer"
            }`}
            onClick={handlePrev}
          >
            <FaRegArrowAltCircleLeft />
          </div>
          <div
            className={`${
              totalPage === 0 || pageNo === totalPage
                ? "text-gray-200"
                : "text-blue-400 hover:text-blue-500 cursor-pointer"
            }`}
            onClick={handleNext}
          >
            <FaRegArrowAltCircleRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableFooter;
