import http from "@/services/httpServices";
import { purchaseFormType } from "@/types/purchase";
import { DateFieldType } from "@/types/components.type";

export async function getPurchaseTableDataApi(dateField: DateFieldType | null) {
  const { data } = await http.post(`/purchase/all`, dateField);
  return data;
}

export async function getTotalPurchaseDataApi(dateField: DateFieldType | null) {
  const { data } = await http.post(`/purchase/total-purchase`, dateField);
  return data;
}

export async function addPurchaseDataApi(req: purchaseFormType) {
  const { data } = await http.post(`/purchase`, req);
  return data;
}

export async function editPurchaseDataApi(id: number, req: purchaseFormType) {
  const { data } = await http.put(`/purchase/${id}`, req);
  return data;
}

export async function deletePurchaseDataApi(id: number) {
  const { data } = await http.delete(`/purchase/${id}`);
  return data;
}
