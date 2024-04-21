import { FC } from "react";

interface NormalTableProps {
  cols?: any[];
  rows: any[];
  height?: string;
  enableIsSold?: boolean;
}

const NormalTable: FC<NormalTableProps> = ({
  cols = [],
  rows = [],
  height,
  enableIsSold,
}) => {
  /**
   * TSX
   */
  return (
    <div
      className="overflow-y-auto h-[100%]"
      style={{ height: `calc(${height} - 7rem)` }}
    >
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-slate-600 dark:bg-gray-700 sticky top-0 ">
          <tr>
            {cols.map((col, i) => (
              <th
                key={`normal-cols-${i}`}
                scope="col"
                className="px-6 py-3 text-start text-sm font-medium text-[#DAA520] uppercase dark:text-gray-400"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {rows.map((rowValue, rowIdx) => (
            <tr key={`normal-row-${rowIdx} `}>
              {cols.map((col, idx) => (
                <td
                  key={`normal-cell-${rowIdx}-${idx}`}
                  className={`px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200 uppercase ${
                    rowIdx === 0 ? "" : ""
                  } ${
                    enableIsSold
                      ? rowValue?.isSold
                        ? "bg-green-300"
                        : "bg-red-300"
                      : ""
                  }`}
                >
                  {rowValue[col.value]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NormalTable;
