export const productOptions = [
  { id: 1, label: "UREA", value: "urea" },
  { id: 2, label: "Bareli", value: "bareli" },
  { id: 9, label: "Chari", value: "seed-chari" },
  { id: 4, label: "Pesticide", value: "pesticide" },
  { id: 10, label: "Pesticide UPL", value: "pesticide-upl" },
  { id: 4, label: "Wheat 1010", value: "wheat-1010" },
  { id: 5, label: "Wheat 4037", value: "wheat-4037" },
  { id: 6, label: "Wheat DBW 187", value: "wheat-DBW-187" },
  { id: 7, label: "Wheat GW 273", value: "wheat-GW-273" },
  { id: 8, label: "Wheat JMD 4037", value: "wheat-JMD-4037" },
];

export const weightTypeOptions = [
  { id: 1, label: "KG", value: "kg" },
  { id: 2, label: "GM", value: "gm" },
  { id: 2, label: "Liter", value: "l" },
  { id: 2, label: "Mililiter", value: "ml" },
];

// ================== COMPANY OPTIONS ===============

export const wheatCompanyOptions = [
  { id: 1, label: "KAMADHAGIRI", value: "kamadhagiri" },
  { id: 2, label: "UNNAT", value: "unnat" },
  { id: 3, label: "RAJSHREE", value: "rajshree" },
  { id: 6, label: "CHANDRA", value: "chandra" },
  { id: 4, label: "LOKMAN", value: "lokman" },
  { id: 5, label: "VARDHAMAN", value: "vardhaman" },
  { id: 7, label: "OTHERS", value: "others" },
];

export const bareliCompanyOptions = [
  { id: 1, label: "KAMADHAGIRI", value: "kamadhagiri" },
];

export const seedCompanyOptions = [
  { id: 1, label: "Star Chari", value: "star-chari" },
  { id: 2, label: "Rashila Chari", value: "rashila-chari" },
  { id: 3, label: "SLV Chari", value: "slv-chari" },
];

export const ureaCompanyOptions = [
  { id: 1, label: "NFL", value: "nfl" },
  { id: 2, label: "HURL", value: "hurl" },
];

export const pesticideCompanyOptions = [
  { id: 1, label: "Heera 44", value: "heera-44" },
  { id: 2, label: "Jhaadu", value: "jhaadu" },
  { id: 3, label: "Leethal", value: "leethal" },
  { id: 4, label: "Dhanzyma", value: "dhanzyma" },
  { id: 5, label: "Bumber", value: "bumber" },
  { id: 6, label: "Saaf", value: "saaf" },
  { id: 7, label: "Sandesh", value: "sandesh" },
  { id: 8, label: "Neemark", value: "neemark" },
  { id: 9, label: "Clodinafop", value: "clodinafop" },
  { id: 10, label: "Hamla", value: "hamla" },
  { id: 11, label: "Rat Kill", value: "rat-kill" },
  { id: 12, label: "Hero G", value: "hero-g" },
  { id: 13, label: "Mono Zinc", value: "mono-zinc" },
  { id: 14, label: "Zandu", value: "zandu" },
  { id: 15, label: "UPL", value: "upl" },
];

export const companyNameOptions: {
  [key: string]: { id: number; label: string; value: string }[];
} = {
  urea: ureaCompanyOptions,
  wheat: wheatCompanyOptions,
  pesticide: pesticideCompanyOptions,
  bareli: bareliCompanyOptions,
  seed: seedCompanyOptions,
};

// ===================== PARTY OPTIONS ================
export const partyNameOptions = [
  { id: 1, label: "Agro Clinic", value: "agro-clinic" },
  { id: 2, label: "Agrawal Trading", value: "agrawal-trading" },
  { id: 3, label: "Bhawani Traders", value: "bhawani-traders" },
  { id: 4, label: "Sharda Krishi", value: "sharda-krishi" },
  { id: 5, label: "Putli Ghar", value: "putli-ghar" },
  { id: 6, label: "Rajesh Inter", value: "rajesh-inter" },
  { id: 7, label: "Jai Devi", value: "jai-devi" },
  { id: 8, label: "Ganesh Trading", value: "ganesh-trading" },
  { id: 8, label: "Gambhir Beej", value: "gambhir-beej" },
  { id: 9, label: "Shakti Beej", value: "shakti-beej" },
  { id: 10, label: "UNNATS SEEDS", value: "unnat-seeds" },
  { id: 11, label: "OTHERS", value: "others" },
];

// ===================== PRODUCT TYPE OPTIONS ================

export const productTypeOptions = [
  { id: 1, label: "WHEAT", value: "wheat" },
  { id: 2, label: "UREA", value: "urea" },
  { id: 3, label: "RICE", value: "rice" },
  { id: 3, label: "PESTICIDE", value: "pesticide" },
];

// ===================== PAYMENT MODE OPTIONS ================

export const paymentModeOptions = [
  { id: 1, label: "UPI", value: "upi" },
  { id: 2, label: "CASH", value: "cash" },
  { id: 3, label: "ACCOUNT", value: "account" },
];

// ===================== PAYMENT MODE OPTIONS ================

export const expenseOptions = [
  { id: 1, label: "AUTO", value: "auto" },
  { id: 2, label: "RENT", value: "rent" },
  { id: 4, label: "DUKAAN", value: "dukaan" },
  { id: 3, label: "PALEDAR", value: "paledar" },
  { id: 3, label: "PETROL", value: "petrol" },
  { id: 5, label: "OTHERS", value: "others" },
  { id: 6, label: "ANIL SALARY", value: "anil" },
];
