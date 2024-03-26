import { FC } from "react";
import { TableHeadProps } from "./type";

const TableHead: FC<TableHeadProps> = ({ cols }) => {
  /**
   * TSX
   */
  return (
    <div className="table-header">
      <table>
        <thead>
          <tr>
            {cols.map((item: any, idx: number) => (
              <th key={idx} style={{ width: item.width }}>
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default TableHead;
