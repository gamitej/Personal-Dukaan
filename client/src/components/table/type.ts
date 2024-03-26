type columns = { label: string; value: string; width?: string }[];
type rows = { [key: string]: string }[];

export interface TableHeadProps {
  cols: columns;
}

export interface TableToolbarProps {
  additionalLeftSideToolbarComp?: React.ReactNode;
}

export interface TableBodyProps {
  rows: rows;
  cols: columns;
  tableHeight: string;
}
