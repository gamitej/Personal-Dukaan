import http from "@/services/httpServices";
import { DateFieldType } from "@/types/components.type";
import { expenseFormType } from "@/types/expense";

// add expense
export async function getExpenseDataApi(dateField: DateFieldType | null) {
  const { data } = await http.post(`/expense/all`, dateField);
  return data;
}

// add expense
export async function addExpenseDataApi(req: expenseFormType) {
  const { data } = await http.post(`/expense`, req);
  return data;
}

// delete expense
export async function deleteExpenseDataApi(id: number) {
  const { data } = await http.delete(`/expense/${id}`);
  return data;
}

// total expenses
export async function getTotalExpensesDataApi(dateField: DateFieldType | null) {
  const { data } = await http.post(`/expense/total-expenses`, dateField);
  return data;
}
