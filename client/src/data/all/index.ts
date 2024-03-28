export const productOptions = [
  { id: 1, label: "UREA", value: "urea" },
  { id: 2, label: "UREA-1", value: "urea-1" },
  { id: 3, label: "Wheat 1010", value: "wheat-1010" },
  { id: 4, label: "Wheat 4037", value: "wheat-4037" },
];

export const weightTypeOptions = [
  { id: 1, label: "KG", value: "kg" },
  { id: 2, label: "GM", value: "gm" },
];

// ================== COMPANY OPTIONS ===============

export const wheatCompanyOptions = [
  { id: 1, label: "KAMADHAGIRI", value: "kamadhagiri" },
  { id: 2, label: "UNNAT", value: "unnat" },
  { id: 3, label: "OTHERS", value: "others" },
];

export const ureaCompanyOptions = [
  { id: 1, label: "NFL", value: "nfl" },
  { id: 2, label: "HURL", value: "hurl" },
];

export const companyNameOptions: {
  [key: string]: { id: number; label: string; value: string }[];
} = {
  urea: ureaCompanyOptions,
  wheat: wheatCompanyOptions,
};

// ===================== PARTY OPTIONS ================
export const partyNameOptions = [
  { id: 1, label: "Agro Clinic", value: "agro-clinic" },
  { id: 2, label: "Agrawal Trading", value: "agrawal-trading" },
  { id: 3, label: "OTHERS", value: "others" },
];

// ===================== PRODUCT TYPE OPTIONS ================

export const productTypeOptions = [
  { id: 1, label: "WHEAT", value: "wheat" },
  { id: 2, label: "UREA", value: "urea" },
  { id: 3, label: "RICE", value: "rice" },
];
