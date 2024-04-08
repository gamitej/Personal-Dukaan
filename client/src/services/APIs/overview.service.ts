import http from "@/services/httpServices";
import { DateFieldType } from "@/types/components.type";

export async function getProfitDataApi(dateField: DateFieldType | null) {
  const { data } = await http.post(`/overview/total-profit`, dateField);
  return data;
}
