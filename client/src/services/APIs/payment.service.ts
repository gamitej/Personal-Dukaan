import http from "@/services/httpServices";
import { paymentFormType } from "@/types/payments";

export async function getPaymentsTableDataApi() {
  const { data } = await http.get(`/payment`);
  return data;
}

export async function addPaymentsDataApi(req: paymentFormType) {
  const { data } = await http.post(`/payment`, req);
  return data;
}

export async function deletePaymentDataApi(id: number) {
  const { data } = await http.delete(`/payment/${id}`);
  return data;
}
