type columns = { label: string; value: string; width?: string }[];
type rows = { [key: string]: any }[];

export interface TableHeadProps {
  cols: columns;
}

export interface TableToolbarProps {
  title: string;
  additionalLeftSideToolbarComp?: React.ReactNode;
}

export interface TableBodyProps {
  rows: rows;
  cols: columns;
  tableHeight: string;
}
