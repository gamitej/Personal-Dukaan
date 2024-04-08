import http from "@/services/httpServices";
import { DateFieldType } from "@/types/components.type";

export async function getProfitDataApi(dateField: DateFieldType | null) {
  const { data } = await http.get(`/overview/total-profit`);
  return data;
}
