import "./Table.scss";
import { FC, useEffect, useMemo, useState } from "react";
// components
import TableToolbar from "./TableToolbar";
import TableFooter from "./TableFooter";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
// types
import { TableBodyProps, TableToolbarProps } from "./type";
// icons
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";

interface TableProps extends TableBodyProps, TableToolbarProps {
  title: string;
  enableEdit?: boolean;
  enableDelete?: boolean;
  showEntriesPerPage?: 5 | 10 | 15 | 25;
  handleEditRow?: (rowItem: any) => void;
  handleDeleteRow?: (rowId: any) => void;
}

const Table: FC<TableProps> = ({
  title = "title",
  cols = [],
  rows = [],
  handleEditRow,
  handleDeleteRow,
  enableEdit = false,
  enableDelete = false,
  tableHeight = "300px",
  showEntriesPerPage = 5,
  additionalLeftSideToolbarComp,
}) => {
  const [searchText, setSearchText] = useState("");
  const [pageNo, setPageNo] = useState<number>(1);
  const [paginationValue, setPaginationValue] =
    useState<any>(showEntriesPerPage);

  // Function to search text in the row items
  const searchedRowsData = useMemo(() => {
    return rows.filter((rowData) => {
      return Object.values(rowData).some((rowValue) =>
        rowValue.toString().toLowerCase().includes(searchText.toLowerCase())
      );
    });
  }, [searchText, rows]);

  const totalItems = searchedRowsData.length;
  const totalPage = Math.ceil(totalItems / paginationValue);

  // function to return selected page rows
  const selectedPageRowsData = useMemo(() => {
    const data = searchedRowsData.slice(
      (pageNo - 1) * paginationValue,
      pageNo * paginationValue
    );
    return data;
  }, [searchedRowsData, pageNo, paginationValue]);

  // delete & edit row icon
  const { cols: updatedcolumns = [], rows: updatedRows = [] } = useMemo(() => {
    if (enableDelete || enableEdit) {
      const data = cols.concat([{ label: "", value: "icon", width: "3rem" }]);
      const newRows = selectedPageRowsData.map((item) => ({
        ...item,
        icon: (
          <div className="flex justify-center items-center gap-4">
            {enableEdit ? (
              <MdModeEdit
                onClick={() => handleEditRow && handleEditRow(item)}
                size={24}
                title="edit"
                className="text-blue-400 hover:text-blue-500 cursor-pointer"
              />
            ) : (
              ""
            )}
            {enableDelete ? (
              <RiDeleteBin6Fill
                size={24}
                title="delete"
                onClick={() => handleDeleteRow && handleDeleteRow(item.id)}
                className="text-red-400 hover:text-red-500 cursor-pointer"
              />
            ) : (
              ""
            )}
          </div>
        ),
      }));

      return { cols: data, rows: newRows };
    }

    return { cols, rows: selectedPageRowsData };
  }, [enableDelete, enableEdit, selectedPageRowsData]);

  useEffect(() => {
    setPageNo(1);
  }, [searchText, rows]);

  /**
   * TSX
   */
  return (
    <div className="table-main border shadow-md">
      {/* table toolbar */}
      <TableToolbar
        title={title}
        searchText={searchText}
        setSearchText={setSearchText}
        additionalLeftSideToolbarComp={additionalLeftSideToolbarComp}
      />
      <div className="table">
        {/* table head */}
        <TableHead cols={updatedcolumns} />
        {/* table body */}
        <TableBody
          rows={updatedRows}
          cols={updatedcolumns}
          tableHeight={tableHeight}
        />
      </div>
      {/* table footer */}
      <TableFooter
        pageNo={pageNo}
        totalPage={totalPage}
        setPageNo={setPageNo}
        paginationValue={paginationValue}
        rowsCount={rows?.length || 0}
        setPaginationValue={(val) => {
          setPageNo(1);
          setPaginationValue(val);
        }}
      />
    </div>
  );
};

export default Table;
