import { ChangeEvent, FC, useState } from "react";
import Modal from "@/components/modal/Modal";
import DateField from "@/components/fields/date/DateField";
import { salesFormType } from "@/types/sales/inex";
import Dropdown from "@/components/dropdown/Dropdown";
import { productOptions, weightTypeOptions } from "@/data/all";
import InputField from "@/components/fields/input/InputField";

interface SalesModelProps {
  isOpen: boolean;
  onClose: (val: boolean) => void;
}

const SalesModel: FC<SalesModelProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<salesFormType>({
    date: null,
    product: null,
    amount: null,
    quantity: null,
    weight: null,
    weightType: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

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
      <form className="w-full mt-4 h-[100%] flex flex-col items-center gap-14">
        <div className="flex justify-center items-center gap-3 w-[100%]">
          {" "}
          <DateField
            id="date"
            width="35%"
            label="Date"
            value={formData.date}
            onChange={handleChange}
          />
          <Dropdown
            label="Product"
            width="65%"
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
            id="quanity"
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

        <button type="submit" className="bg-primaryBlue -mt-8 w-full">
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default SalesModel;
