import { FC } from "react";
import { TableToolbarProps } from "./type";

interface TableToolbarPageProps extends TableToolbarProps {
  searchText: string;
  setSearchText: (val: string) => void;
}

const TableToolbar: FC<TableToolbarPageProps> = ({
  searchText,
  setSearchText,
  additionalLeftSideToolbarComp,
}) => {
  /**
   * TSX
   */
  return (
    <div className="table-toolbar">
      <div className="toolbar-left">{additionalLeftSideToolbarComp}</div>
      <div className="toolbar-right">
        <div></div>
        <div>
          <input
            type="text"
            value={searchText}
            placeholder="search..."
            onChange={({ target }) => setSearchText(target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default TableToolbar;
