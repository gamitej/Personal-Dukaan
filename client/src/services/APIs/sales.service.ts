import { AxiosError } from "axios";
import http from "@/services/httpServices";
import { salesFormType } from "@/types/sales/inex";

export async function getSalesTableDataApi() {
  try {
    const { data } = await http.get(`/sales`);
    return data;
  } catch (error: unknown) {
    const res = (error as AxiosError).response?.data;

    return { error: true, data: res };
  }
}

export async function addSalesDataApi(req: salesFormType) {
  try {
    const { data } = await http.post(`/sales`, req);
    return { error: false, data };
  } catch (error: unknown) {
    const res = (error as AxiosError).response?.data;

    return { error: true, data: res };
  }
}
