import { create } from "zustand";
import { salesFormType } from "@/types/sales";

interface SalesState {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  salesFormData: salesFormType;
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
  isModalOpen: false,
  setIsModalOpen: (value) => {
    set(() => ({ isModalOpen: value }));
  },

  salesFormData: defaultFormData,
}));
