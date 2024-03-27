import http from "@/services/httpServices";
import { purchaseFormType } from "@/types/purchase";

export async function getPurchaseTableDataApi() {
  const { data } = await http.get(`/purchase`);
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
