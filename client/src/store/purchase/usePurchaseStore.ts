import { create } from "zustand";
import { purchaseFormType } from "@/types/purchase";

type purchaseFormDataType = "ADD" | "EDIT";

interface PurchaseState {
  isModalOpen: boolean;
  isSalesAddApiLoading: boolean;
  purchaseFormData: purchaseFormType;
  setResetPurchaseFormData: () => void;
  purchaseFormDataType: purchaseFormDataType;
  setIsModalOpen: (value: boolean) => void;
  setIsPurchaseAddApiLoading: (value: boolean) => void;
  setPurchaseFormDataType: (name: purchaseFormDataType) => void;
  setPurchaseFormData: (values: { [key: string]: any }) => void;
}

const defaultFormData = {
  date: null,
  weight: null,
  amount: null,
  product: null,
  quantity: null,
  weightType: null,
  company: null,
  party: null,
};

export const usePurchaseStore = create<PurchaseState>((set) => ({
  isSalesAddApiLoading: false,
  setIsPurchaseAddApiLoading: (value) => {
    set((state) => ({ ...state, isSalesAddApiLoading: value }));
  },

  purchaseFormDataType: "ADD",
  setPurchaseFormDataType: (name) => {
    set(() => ({ purchaseFormDataType: name }));
  },

  isModalOpen: false,
  setIsModalOpen: (value) => {
    set(() => ({ isModalOpen: value }));
  },

  purchaseFormData: defaultFormData,
  setPurchaseFormData: (object) => {
    set((state) => ({
      ...state,
      salesFormData: { ...state.purchaseFormData, ...object },
    }));
  },
  setResetPurchaseFormData: () => {
    set((state) => ({ ...state, purchaseFormData: { ...defaultFormData } }));
  },
}));
