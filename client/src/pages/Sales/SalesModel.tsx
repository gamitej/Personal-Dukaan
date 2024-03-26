import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
// components
import Modal from "@/components/modal/Modal";
import Dropdown from "@/components/dropdown/Dropdown";
import DateField from "@/components/fields/date/DateField";
import InputField from "@/components/fields/input/InputField";
// services
import { addSalesDataApi } from "@/services/APIs/sales.service";
// data
import { productOptions, weightTypeOptions } from "@/data/all";

interface SalesModelProps {
  formData: any;
  isOpen: boolean;
  reset: () => void;
  setFormData: (data: any) => void;
  onClose: (val: boolean) => void;
}

const SalesModel: FC<SalesModelProps> = ({
  isOpen,
  onClose,
  setFormData,
  formData,
  reset,
}) => {
  const queryClient = useQueryClient();
  const [apiCallStatus, setApiCallStatus] = useState({
    error: false,
    loading: false,
  });

  // =================== API CALL'S START ======================

  // Mutation to add sales data
  const { mutate: mutateAddSalesData } = useMutation({
    mutationFn: addSalesDataApi,
    onSuccess: () => {
      toast.success("Sales data added successfully", { duration: 1200 });
      queryClient.invalidateQueries({
        queryKey: ["sales-row-data"],
      });
      setApiCallStatus({ error: false, loading: false });
    },
    onError: () => {
      setApiCallStatus({ error: true, loading: false });
      toast.error("Error while adding sales data", { duration: 1200 });
      console.error("Error adding sales data");
    },
  });

  // =================== API CALL'S END ======================

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiCallStatus({ error: false, loading: true });
    mutateAddSalesData(formData);
    reset();
  };

  // ==================== USE-EFFECT HOOK =======================

  useEffect(() => {
    if (apiCallStatus.error) {
      onClose(false);
    }
  }, [apiCallStatus.error]);

  /**
   * TSX
   */
  return (
    <Modal
      modalWidth="30rem"
      title="ADD SALE"
      isOpen={isOpen}
      onClose={onClose}
      modalHeight="25rem"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full mt-4 h-[100%] flex flex-col items-center gap-14"
      >
        <div className="flex justify-center items-center gap-3 w-[100%]">
          <DateField
            id="date"
            width="35%"
            label="Date"
            value={formData.date}
            onChange={handleChange}
          />
          <Dropdown
            width="65%"
            label="Product"
            options={productOptions}
            selectedValue={formData.product}
            onChange={(value: string) =>
              setFormData({ ...formData, product: value })
            }
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
            onChange={(value: string) =>
              setFormData({ ...formData, weightType: value })
            }
          />
        </div>
        <InputField
          type="number"
          width="100%"
          label="Amount (Rs)"
          id="amount"
          onChange={handleChange}
          value={formData.amount}
        />

        <button
          type="submit"
          disabled={apiCallStatus.loading}
          className={`-mt-8 w-full ${
            apiCallStatus.loading
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

export default SalesModel;
