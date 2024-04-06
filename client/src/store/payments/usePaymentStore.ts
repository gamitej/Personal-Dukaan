import { paymentFormType } from "@/types/payments";
import { create } from "zustand";
// import { purchaseFormType } from "@/types/purchase";

type paymentFormDataType = "ADD" | "EDIT";

interface PaymentState {
  isError: { error: boolean; keyName: string | null };
  setIsError: (error: boolean, key: string | null) => void;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  isPaymentAddApiLoading: boolean;
  setIsPaymentAddApiLoading: (value: boolean) => void;
  paymentFormData: paymentFormType;
  setPaymentFormDataType: (name: paymentFormDataType) => void;
  paymentFormDataType: paymentFormDataType;
  setPaymentFormData: (values: { [key: string]: any }) => void;
  setResetPaymentFormData: () => void;
}

const defaultFormData = {
  date: null,
  type: null,
  paid: null,
  party: null,
  company: null,
  product: null,
  paymentMode: null,
};

export const usePaymentStore = create<PaymentState>((set) => ({
  isError: { error: false, keyName: null },
  setIsError: (error, key) => {
    set((state) => ({ ...state, isError: { error: error, keyName: key } }));
  },

  isPaymentAddApiLoading: false,
  setIsPaymentAddApiLoading: (value) => {
    set((state) => ({ ...state, isPaymentAddApiLoading: value }));
  },

  paymentFormDataType: "ADD",
  setPaymentFormDataType: (name) => {
    set(() => ({ paymentFormDataType: name }));
  },

  isModalOpen: false,
  setIsModalOpen: (value) => {
    set(() => ({ isModalOpen: value }));
  },

  paymentFormData: defaultFormData,
  setPaymentFormData: (object) => {
    set((state) => ({
      ...state,
      purchaseFormData: { ...state.paymentFormData, ...object },
      isError: { error: false, keyName: null },
    }));
  },
  setResetPaymentFormData: () => {
    set((state) => ({
      ...state,
      paymentFormData: { ...defaultFormData },
      isError: { error: false, keyName: null },
    }));
  },
}));
