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
  totalPage: number;
  paginationValue: number;
  setPageNo: (num: number) => void;
  setPaginationValue: (val: any) => void;
}

const TableFooter: React.FC<TableFooterProps> = ({
  pageNo,
  totalPage,
  setPageNo,
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
    <div className="table-footer">
      <div className="footer-left">
        Showing {totalPage > 0 ? pageNo : 0} of {totalPage} entries
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
            className={`${pageNo === 1 ? "active" : "icon"}`}
            onClick={handlePrev}
          >
            <FaRegArrowAltCircleLeft />
          </div>
          <div
            className={`${pageNo === totalPage ? "active" : "icon"}`}
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
