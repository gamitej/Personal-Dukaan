import http from "@/services/httpServices";

export async function getStockDataApi() {
  const { data } = await http.get(`/stock`);
  return data;
}
