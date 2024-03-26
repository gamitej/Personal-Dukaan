import http from "@/services/httpServices";
import { salesFormType } from "@/types/sales/inex";

export async function getSalesTableDataApi() {
  const { data } = await http.get(`/sales`);
  return data;
}

export async function addSalesDataApi(req: salesFormType) {
  const { data } = await http.post(`/sales`, req);
  return data;
}
