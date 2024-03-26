import { ChangeEvent, FC, useState } from "react";
import Modal from "@/components/modal/Modal";
import DateField from "@/components/fields/date/DateField";
import { salesFormType } from "@/types/sales/inex";
import Dropdown from "@/components/dropdown/Dropdown";
import { productOptions } from "@/data/all";

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
      title="ADD SALE"
      isOpen={isOpen}
      onClose={onClose}
      modalHeight="fit-content"
    >
      <form className="w-full mt-4 h-[100%]">
        <div className="flex justify-center items-center gap-3">
          {" "}
          <DateField
            id="date"
            width="30%"
            label="Date"
            value={formData.date}
            onChange={handleChange}
          />
          <Dropdown
            label="Product"
            width="70%"
            options={productOptions}
            selectedValue={formData.product}
            onChange={(value: string) =>
              setFormData({ ...formData, product: value })
            }
          />
        </div>
      </form>
    </Modal>
  );
};

export default SalesModel;
