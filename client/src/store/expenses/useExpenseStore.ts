import { create } from "zustand";
import { expenseFormType } from "@/types/expense";

type expenseFormDataType = "ADD" | "EDIT";

interface ExpenseState {
  isError: { error: boolean; keyName: string | null };
  setIsError: (error: boolean, key: string | null) => void;

  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;

  isExpenseAddApiLoading: boolean;
  setIsExpenseAddApiLoading: (value: boolean) => void;

  expenseFormData: expenseFormType;
  setExpenseFormData: (values: { [key: string]: any }) => void;

  expenseFormDataType: expenseFormDataType;
  setExpenseFormDataType: (name: expenseFormDataType) => void;

  setResetExpenseFormData: () => void;
}

const defaultFormData = {
  date: null,
  type: null,
  amount: null,
  expense: null,
  paymentMode: null,
};

export const useExpenseStore = create<ExpenseState>((set) => ({
  isError: { error: false, keyName: null },
  setIsError: (error, key) => {
    set((state) => ({ ...state, isError: { error: error, keyName: key } }));
  },

  isModalOpen: false,
  setIsModalOpen: (value) => {
    set(() => ({ isModalOpen: value }));
  },

  isExpenseAddApiLoading: false,
  setIsExpenseAddApiLoading: (value) => {
    set((state) => ({ ...state, isExpenseAddApiLoading: value }));
  },

  expenseFormDataType: "ADD",
  setExpenseFormDataType: (name) => {
    set(() => ({ expenseFormDataType: name }));
  },

  expenseFormData: defaultFormData,
  setExpenseFormData: (object) => {
    set((state) => ({
      ...state,
      expenseFormData: { ...state.expenseFormData, ...object },
      isError: { error: false, keyName: null },
    }));
  },

  setResetExpenseFormData: () => {
    set((state) => ({
      ...state,
      expenseFormData: { ...defaultFormData },
      isError: { error: false, keyName: null },
    }));
  },
}));
