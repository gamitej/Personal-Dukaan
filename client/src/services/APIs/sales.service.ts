import { AxiosError } from "axios";
import http from "@/services/httpServices";

export async function getSalesTableData() {
  try {
    const { data } = await http.get(`/sales`);
    return { error: false, data };
  } catch (error: unknown) {
    const res = (error as AxiosError).response?.data;

    return { error: true, data: res };
  }
}

export async function addSalesData(req: any) {
  try {
    const { data } = await http.post(`/sales`, req);
    return { error: false, data };
  } catch (error: unknown) {
    const res = (error as AxiosError).response?.data;

    return { error: true, data: res };
  }
}
