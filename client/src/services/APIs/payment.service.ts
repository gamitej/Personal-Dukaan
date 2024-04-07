import http from "@/services/httpServices";
import { DateFieldType } from "@/types/components.type";
import { paymentFormType } from "@/types/payments";

// get payment table
export async function getPaymentsTableDataApi(dateField: DateFieldType | null) {
  const { data } = await http.post(`/payment/all`, dateField);
  return data;
}

// pending payment
export async function getPendingPaymentsDataApi(
  dateField: DateFieldType | null
) {
  const { data } = await http.post(`/payment/total-pending-payment`, dateField);
  return data;
}

// add payment
export async function addPaymentsDataApi(req: paymentFormType) {
  const { data } = await http.post(`/payment`, req);
  return data;
}

// delete payment
export async function deletePaymentDataApi(id: number) {
  const { data } = await http.delete(`/payment/${id}`);
  return data;
}
