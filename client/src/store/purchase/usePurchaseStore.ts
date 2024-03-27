import { create } from "zustand";
import { purchaseFormType } from "@/types/purchase";

type purchaseFormDataType = "ADD" | "EDIT";

interface PurchaseState {
  isModalOpen: boolean;
  isPurchaseAddApiLoading: boolean;
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
  type: null,
  party: null,
  weight: null,
  amount: null,
  company: null,
  product: null,
  quantity: null,
  weightType: null,
};

export const usePurchaseStore = create<PurchaseState>((set) => ({
  isPurchaseAddApiLoading: false,
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
      purchaseFormData: { ...state.purchaseFormData, ...object },
    }));
  },
  setResetPurchaseFormData: () => {
    set((state) => ({ ...state, purchaseFormData: { ...defaultFormData } }));
  },
}));
