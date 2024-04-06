import toast from "react-hot-toast";
import Converter from "number-to-words";
import { ChangeEvent, FC, FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// components
import Modal from "@/components/modal/Modal";
import Dropdown from "@/components/dropdown/Dropdown";
import DateField from "@/components/fields/date/DateField";
import InputField from "@/components/fields/input/InputField";
// services
import { addPaymentsDataApi } from "@/services/APIs/payment.service";
// data
import {
  productOptions,
  partyNameOptions,
  productTypeOptions,
  companyNameOptions,
  paymentModeOptions,
} from "@/data/all";
import { isAnyValueNull } from "@/utils";
// store
import { usePaymentStore } from "@/store/payments/usePaymentStore";

const PaymentModel: FC = () => {
  const queryClient = useQueryClient();

  const {
    isError,
    setIsError,
    isModalOpen,
    setIsModalOpen,
    paymentFormDataType,
    isPaymentAddApiLoading,
    paymentFormData: formData,
    setIsPaymentAddApiLoading,
    setResetPaymentFormData,
    setPaymentFormData: setFormData,
  } = usePaymentStore();

  // =================== API CALL'S START ======================

  // Mutation to add payment data
  const { mutate: mutateAddPaymentData } = useMutation({
    mutationFn: addPaymentsDataApi,
    onSuccess: () => {
      setResetPaymentFormData();
      setIsModalOpen(false);
      toast.success("Payment data added successfully", { duration: 1600 });
      queryClient.invalidateQueries({
        queryKey: ["payment-row-data"],
      });
      setIsPaymentAddApiLoading(false);
    },
    onError: () => {
      setIsPaymentAddApiLoading(false);
      toast.error("Error while adding payment data", { duration: 1600 });
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
      setIsPaymentAddApiLoading(true);
      mutateAddPaymentData(formData);
    } else {
      setIsError(true, key);
    }
  };

  /**
   * TSX
   */
  return (
    <Modal
      modalWidth="55rem"
      title={`${paymentFormDataType} PAYMENT`}
      isOpen={isModalOpen}
      onClose={() => {
        setResetPaymentFormData();
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
            width="30%"
            label="Date"
            value={formData.date}
            onChange={handleChange}
          />
          <Dropdown
            width="40%"
            label="Product"
            options={productOptions}
            selectedValue={formData.product}
            onChange={(value: string) =>
              setFormData({
                product: value,
                type: value.split("-")[0],
                company: null,
              })
            }
          />

          <Dropdown
            width="30%"
            label="Product Type"
            options={productTypeOptions}
            selectedValue={formData.type}
            onChange={(value: string) => setFormData({ type: value })}
          />
        </div>

        <div className="w-full flex justify-between items-center">
          <Dropdown
            label="Product Company"
            width="35%"
            options={formData.type ? companyNameOptions[formData.type] : []}
            selectedValue={formData.company}
            onChange={(value: string) => setFormData({ company: value })}
          />
          <Dropdown
            width="37%"
            label="Party Name"
            options={partyNameOptions || []}
            selectedValue={formData.party}
            onChange={(value: string) => setFormData({ party: value })}
          />

          <Dropdown
            label=" Payment Mode"
            width="25%"
            options={paymentModeOptions}
            selectedValue={formData.paymentMode}
            onChange={(value: string) => setFormData({ paymentMode: value })}
          />
        </div>

        <div className="w-full">
          <InputField
            type="number"
            width="100%"
            label="Paid (Rs)"
            id="paid"
            onChange={handleChange}
            value={formData.paid}
          />
          <p className="mt-2 uppercase text-md text-slate-600">
            {formData.paid ? Converter.toWords(formData.paid) : null}{" "}
          </p>
        </div>

        {isError.error && (
          <p className="text-lg text-red-400 -mt-4 -mb-4">
            <span className="capitalize">{isError.keyName}</span> field cannot
            be empty
          </p>
        )}
        <button
          type="submit"
          disabled={isPaymentAddApiLoading}
          className={`-mt-4 w-full ${
            isPaymentAddApiLoading
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

export default PaymentModel;
