import { FC } from "react";
import { TableBodyProps } from "./type";

const TableBody: FC<TableBodyProps> = ({
  cols = [],
  rows = [],
  tableHeight,
}) => {
  /**
   * TSX
   */
  return (
    <div className="table-body" style={{ height: tableHeight }}>
      <table>
        <tbody>
          {rows.length > 0 &&
            rows?.map((item: any, idx: number) => (
              <tr key={idx}>
                {cols.map(({ value, width }, colsIdx: number) => (
                  <td
                    key={`cols-${colsIdx}`}
                    style={{ width: width ? width : "5rem" }}
                  >
                    {item[value]}
                  </td>
                ))}
              </tr>
            ))}
          {rows.length === 0 && (
            <div className="no-record">No record found</div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableBody;
