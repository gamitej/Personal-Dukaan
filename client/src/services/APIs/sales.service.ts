import http from "@/services/httpServices";
import { salesFormType } from "@/types/sales";

export async function getSalesTableDataApi() {
  const { data } = await http.get(`/sales`);
  return data;
}

export async function addSalesDataApi(req: salesFormType) {
  const { data } = await http.post(`/sales`, req);
  return data;
}

export async function editSalesDataApi(id: number, req: salesFormType) {
  const { data } = await http.put(`/sales/${id}`, req);
  return data;
}

export async function deleteSalesDataApi(id: number) {
  const { data } = await http.delete(`/sales/${id}`);
  return data;
}
