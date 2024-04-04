import http from "@/services/httpServices";

export async function getProfitDataApi() {
  const { data } = await http.get(`/overview/total-profit`);
  return data;
}
