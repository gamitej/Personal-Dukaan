import { FC } from "react";
import { TableToolbarProps } from "./type";

interface TableToolbarPageProps extends TableToolbarProps {
  searchText: string;
  setSearchText: (val: string) => void;
}

const TableToolbar: FC<TableToolbarPageProps> = ({
  title,
  searchText,
  setSearchText,
  additionalLeftSideToolbarComp,
}) => {
  /**
   * TSX
   */
  return (
    <div className="table-toolbar">
      <div className="toolbar-left">
        <div>
          <h3 className="title">{title}</h3>
        </div>
      </div>
      <div className="toolbar-right">
        <div> {additionalLeftSideToolbarComp}</div>
        <div>
          <input
            type="text"
            autoCorrect="off"
            autoComplete="off"
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
