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
import { addPurchaseDataApi } from "@/services/APIs/purchase.service";
// data
import {
  companyNameOptions,
  partyNameOptions,
  productOptions,
  productTypeOptions,
  weightTypeOptions,
} from "@/data/all";
// store
import { usePurchaseStore } from "@/store/purchase/usePurchaseStore";
import { isAnyValueNull } from "@/utils";

const PurchaseModal: FC = () => {
  const {
    isError,
    setIsError,
    isModalOpen,
    setIsModalOpen,
    isPurchaseAddApiLoading,
    purchaseFormData: formData,
    setIsPurchaseAddApiLoading,
    setPurchaseFormData: setFormData,
    setResetPurchaseFormData,
    purchaseFormDataType,
  } = usePurchaseStore();

  const queryClient = useQueryClient();

  // =================== API CALL'S START ======================

  // Mutation to add purchase data
  const { mutate: mutateAddPurchaseData } = useMutation({
    mutationFn: addPurchaseDataApi,
    onSuccess: () => {
      setResetPurchaseFormData();
      setIsModalOpen(false);
      toast.success("purchase data added successfully", { duration: 1200 });
      queryClient.invalidateQueries({
        queryKey: ["purchase-row-data"],
      });
      setIsPurchaseAddApiLoading(false);
    },
    onError: (err: any) => {
      const { message } = err.response.data;
      setIsPurchaseAddApiLoading(false);
      toast.error(message || "Error while adding purchase data", {
        duration: 1200,
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
      setIsPurchaseAddApiLoading(true);
      mutateAddPurchaseData(formData);
    } else {
      setIsError(true, key);
    }
  };

  /**
   * TSX
   */
  return (
    <Modal
      modalWidth="fit-content"
      title={`${purchaseFormDataType} PURCHASE`}
      isOpen={isModalOpen}
      onClose={() => {
        setResetPurchaseFormData();
        setIsModalOpen(false);
      }}
      modalHeight="fit-content"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full px-6 pt-8 pb-4 h-[100%] flex flex-col items-center gap-12"
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
            width="49%"
            label="Party name"
            options={partyNameOptions}
            selectedValue={formData.party}
            onChange={(value: string) => setFormData({ party: value })}
          />
          <Dropdown
            width="49%"
            label="Product Company"
            options={formData.type ? companyNameOptions[formData.type] : []}
            selectedValue={formData.company}
            onChange={(value: string) => setFormData({ company: value })}
          />
        </div>
        <div className="w-full flex justify-between items-center">
          <InputField
            type="number"
            width="31%"
            label="Quantity"
            id="quantity"
            onChange={handleChange}
            value={formData.quantity}
          />

          <InputField
            type="number"
            width="31%"
            label="Weight"
            id="weight"
            onChange={handleChange}
            value={formData.weight}
          />
          <Dropdown
            label="(KG/GM)"
            width="31%"
            options={weightTypeOptions}
            selectedValue={formData.weightType}
            onChange={(value: string) => setFormData({ weightType: value })}
          />
        </div>
        <div className="w-full">
          <InputField
            type="number"
            width="100%"
            label="Amount (Rs)"
            id="amount"
            onChange={handleChange}
            value={formData.amount}
          />
          <p className="mt-2 uppercase text-md text-slate-600">
            {formData.amount ? Converter.toWords(formData.amount) : null}{" "}
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
          disabled={isPurchaseAddApiLoading}
          className={`-mt-2 w-full ${
            isPurchaseAddApiLoading
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

export default PurchaseModal;
