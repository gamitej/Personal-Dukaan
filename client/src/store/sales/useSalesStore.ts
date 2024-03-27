import { create } from "zustand";
import { salesFormType } from "@/types/sales";

type salesFormDataType = "ADD" | "EDIT";

interface SalesState {
  isModalOpen: boolean;
  salesFormData: salesFormType;
  isSalesAddApiLoading: boolean;
  setResetSalesFormData: () => void;
  salesFormDataType: salesFormDataType;
  setIsModalOpen: (value: boolean) => void;
  setIsSalesAddApiLoading: (value: boolean) => void;
  setSalesFormDataType: (name: salesFormDataType) => void;
  setSalesFormData: (values: { [key: string]: any }) => void;
}

const defaultFormData = {
  date: null,
  type: null,
  weight: null,
  amount: null,
  product: null,
  quantity: null,
  weightType: null,
};

export const useSalesStore = create<SalesState>((set) => ({
  isSalesAddApiLoading: false,
  setIsSalesAddApiLoading: (value) => {
    set((state) => ({ ...state, isSalesAddApiLoading: value }));
  },

  salesFormDataType: "ADD",
  setSalesFormDataType: (name) => {
    set(() => ({ salesFormDataType: name }));
  },

  isModalOpen: false,
  setIsModalOpen: (value) => {
    set(() => ({ isModalOpen: value }));
  },

  salesFormData: defaultFormData,
  setSalesFormData: (object) => {
    set((state) => ({
      ...state,
      salesFormData: { ...state.salesFormData, ...object },
    }));
  },
  setResetSalesFormData: () => {
    set((state) => ({ ...state, salesFormData: { ...defaultFormData } }));
  },
}));
