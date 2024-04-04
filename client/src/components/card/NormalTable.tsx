import { FC } from "react";

interface NormalTableProps {
  cols?: any[];
  rows: any[];
}

const NormalTable: FC<NormalTableProps> = ({ cols = [], rows = [] }) => {
  /**
   * TSX
   */
  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-700">
        <tr>
          {cols.map((col, i) => (
            <th
              key={`normal-cols-${i}`}
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
        <tr>
          {cols.map((col, idx) =>
            rows.map((rowValue: any, rowIdx) => (
              <td
                key={`normal-rows-${rowIdx}-${idx}`}
                className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200 ${
                  rowIdx === 0 ? "uppercase" : ""
                }`}
              >
                {rowValue[col.value]}
              </td>
            ))
          )}
        </tr>
      </tbody>
    </table>
  );
};

export default NormalTable;
