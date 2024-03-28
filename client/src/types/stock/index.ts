type productObj = { product: string; company: string; stock: number };

export interface stockAvailListType {
  total: number;
  title: string;
  productList: productObj[];
}
