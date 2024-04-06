import http from "@/services/httpServices";
import { DateFieldType } from "@/types/components.type";
import { paymentFormType } from "@/types/payments";

export async function getPaymentsTableDataApi(dateField: DateFieldType | null) {
  const { data } = await http.post(`/payment/all`, dateField);
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
