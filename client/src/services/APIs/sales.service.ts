import http from "@/services/httpServices";
import { DateFieldType } from "@/types/components.type";
import { salesFormType } from "@/types/sales";

export async function getSalesTableDataApi(dateField: DateFieldType | null) {
  const { data } = await http.post(`/sales/all`, dateField);
  return data;
}

export async function getTotalSalesDataApi() {
  const { data } = await http.get(`/sales/total-sales`);
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
