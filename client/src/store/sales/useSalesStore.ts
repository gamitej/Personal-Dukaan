import { create } from "zustand";
import { salesFormType } from "@/types/sales";

interface SalesState {
  isModalOpen: boolean;
  salesFormData: salesFormType;
  isSalesAddApiLoading: boolean;
  setResetSalesFormData: () => void;
  setIsModalOpen: (value: boolean) => void;
  setIsSalesAddApiLoading: (value: boolean) => void;
  setSalesFormData: (values: { [key: string]: any }) => void;
}

const defaultFormData = {
  date: null,
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
