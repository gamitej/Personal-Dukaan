import http from "@/services/httpServices";
import { expenseFormType } from "@/types/expense";

export async function getExpenseDataApi() {
  const { data } = await http.get(`/expense`);
  return data;
}

export async function addExpenseDataApi(req: expenseFormType) {
  const { data } = await http.post(`/expense`, req);
  return data;
}

export async function deleteExpenseDataApi(id: number) {
  const { data } = await http.delete(`/expense/${id}`);
  return data;
}
