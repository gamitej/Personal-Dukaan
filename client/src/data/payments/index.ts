export const paymentsCols = [
  { label: "Date", value: "date", width: "5rem" },
  { label: "Party Name", value: "party", width: "8rem" },
  { label: "Product", value: "product", width: "8rem" },
  { label: "Product Company", value: "company", width: "8rem" },
  { label: "Type", value: "type", width: "5rem" },
  { label: "Paid (Rs)", value: "paid", width: "5rem" },
  { label: "Payment Mode", value: "paymentMode", width: "5rem" },
];

export const paymentsRows = [
  {
    date: "20-01-2023",
    party: "agrawal",
    product: "UREA",
    company: "nfl",
    type: "urea",
    status: "pending",
    weight: "20kg",
    mode: "-",
    paid: 0,
  },
  {
    date: "20-01-2023",
    party: "agrawal",
    product: "UREA",
    company: "hurl",
    type: "urea",
    status: "done",
    weight: "20kg",
    mode: "upi",
    paid: 30000,
  },
];

export const countCardPendingPaymentsColsData = [
  { value: "product", label: "Product Type" },
  { value: "party", label: "Party Name" },
  { value: "amount", label: "Pending Payment Amount" },
];
