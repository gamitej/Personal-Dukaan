import toast from "react-hot-toast";
import { ChangeEvent, FC, FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// components
import Modal from "@/components/modal/Modal";
import Dropdown from "@/components/dropdown/Dropdown";
import DateField from "@/components/fields/date/DateField";
import InputField from "@/components/fields/input/InputField";
// services
import { addExpenseDataApi } from "@/services/APIs/expense.service";
// data
import { paymentModeOptions, expenseOptions } from "@/data/all";
import { isAnyValueNull } from "@/utils";
// store
import { useExpenseStore } from "@/store/expenses/useExpenseStore";

const ExpenseModel: FC = () => {
  const queryClient = useQueryClient();

  const {
    isError,
    setIsError,

    isModalOpen,
    setIsModalOpen,

    expenseFormDataType,

    isExpenseAddApiLoading,
    setIsExpenseAddApiLoading,

    setResetExpenseFormData,
    expenseFormData: formData,
    setExpenseFormData: setFormData,
  } = useExpenseStore();

  // =================== API CALL'S START ======================

  // Mutation to add payment data
  const { mutate: mutateAddExpenseData } = useMutation({
    mutationFn: addExpenseDataApi,
    onSuccess: () => {
      setResetExpenseFormData();
      setIsModalOpen(false);
      toast.success("Payment data added successfully", { duration: 1600 });
      queryClient.invalidateQueries({
        queryKey: ["expense-row-data"],
      });
      setIsExpenseAddApiLoading(false);
    },
    onError: (err: any) => {
      const { message } = err.response.data;
      setIsExpenseAddApiLoading(false);
      toast.error(message || "Error while adding expense data", {
        duration: 1600,
      });
    },
  });

  // =================== API CALL'S END ======================

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ [id]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { isNull, key } = isAnyValueNull(formData);

    if (!isNull) {
      setIsExpenseAddApiLoading(true);
      mutateAddExpenseData(formData);
    } else {
      setIsError(true, key);
    }
  };

  /**
   * TSX
   */
  return (
    <Modal
      modalWidth="40rem"
      title={`${expenseFormDataType} Expense`}
      isOpen={isModalOpen}
      onClose={() => {
        setResetExpenseFormData();
        setIsModalOpen(false);
      }}
      modalHeight="fit-content"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full px-6 pt-8 pb-4 h-[100%] flex flex-col items-center gap-14"
      >
        <div className="flex justify-center items-center gap-3 w-[100%]">
          <DateField
            id="date"
            width="45%"
            label="Date"
            value={formData.date}
            onChange={handleChange}
          />

          <Dropdown
            width="50%"
            label="Expense Type"
            options={expenseOptions}
            selectedValue={formData.type}
            onChange={(value: string) => setFormData({ type: value })}
          />
        </div>
        <div className="flex justify-center items-center gap-3 w-[100%]">
          <InputField
            id="amount"
            width="50%"
            type="number"
            label="Amount"
            onChange={handleChange}
            value={formData.amount}
          />
          <Dropdown
            width="45%"
            label="Payment Mode"
            options={paymentModeOptions}
            selectedValue={formData.paymentMode}
            onChange={(value: string) =>
              setFormData({
                paymentMode: value,
              })
            }
          />
        </div>

        <div className="w-full">
          <InputField
            type="text"
            width="100%"
            label="Expense description"
            id="expense"
            onChange={handleChange}
            value={formData.expense}
          />
        </div>

        {isError.error && (
          <p className="text-lg text-red-400 -mt-4 -mb-4">
            <span className="capitalize">{isError.keyName}</span> field cannot
            be empty
          </p>
        )}
        <button
          type="submit"
          disabled={isExpenseAddApiLoading}
          className={`-mt-4 w-full ${
            isExpenseAddApiLoading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-primaryBlue cursor-pointer "
          }`}
        >
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default ExpenseModel;
