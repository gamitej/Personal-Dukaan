import http from "@/services/httpServices";
import { paymentFormType } from "@/types/payments";

export async function getPaymentsTableDataApi() {
  const { data } = await http.get(`/payments`);
  return data;
}

export async function addPaymentsDataApi(req: paymentFormType) {
  const { data } = await http.post(`/payments`, req);
  return data;
}
