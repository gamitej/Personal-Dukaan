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
      {rows.length > 0 && (
        <table>
          <tbody>
            {rows?.map((item: any, idx: number) => (
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
          </tbody>
        </table>
      )}
      {rows.length === 0 && (
        <div className="text-gray-700 text-xl text-center mt-4">
          No record found
        </div>
      )}
    </div>
  );
};

export default TableBody;
