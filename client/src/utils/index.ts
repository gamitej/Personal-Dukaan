import moment from "moment";

export const convertToDefaultDateFormate = (
  value: string | null
): string | null => {
  if (!value) return null;

  const isValidDateFormat = /^\d{4}-\d{2}-\d{2}$/.test(value);
  if (isValidDateFormat) return value;

  const parts = value.split("-");
  const day = parts[0];
  const month = parts[1];
  const year = parts[2];

  const newDate = new Date(`${year}-${month}-${day}`);
  const formattedValue = newDate ? moment(newDate).format("YYYY-MM-DD") : "";

  return formattedValue;
};

// to find the null value of a given object key
export function isAnyValueNull(formData: any) {
  for (const key in formData) {
    if (formData[key] === null) {
      return { isNull: true, key: key };
    }
  }
  return { isNull: false, key: null };
}

export function getTotalAmtAndQut(totalArray = []) {
  return totalArray.reduce(
    (acc: any, { amount, quantity }: { amount: number; quantity: number }) => {
      acc.totalAmount += amount;
      acc.totalQuantity += quantity;
      return acc;
    },
    { totalAmount: 0, totalQuantity: 0 }
  );
}

export const formattedRows = (totalDetails = []) => {
  return totalDetails.map((item: any) => {
    return {
      product: item.type,
      quantity: item.quantity,
      avg: `Rs ${Math.round(item.amount / item.quantity)}`,
      amount: `Rs ${item.amount}`,
    };
  });
};

export const formattRowForPendingPayment = (totalDetails = []) => {
  return totalDetails.map((item: any) => {
    return {
      product: item?.product.toUpperCase(),
      type: item?.type?.toUpperCase(),
      party: item?.party?.toUpperCase(),
      amount: `Rs ${item?.amount}`,
    };
  });
};

export const formattedRowForExpense = (totalDetails = []) => {
  return totalDetails.map((item: any) => {
    return {
      type: item.type,
      amount: `Rs ${item.amount}`,
    };
  });
};
