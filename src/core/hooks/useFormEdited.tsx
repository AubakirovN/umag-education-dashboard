import { InsuranceServiceOutputDto } from "../types";

export const useFormEdited = (
  original: InsuranceServiceOutputDto[],
  copy: InsuranceServiceOutputDto[]
) => {
  if (JSON.stringify(original) === JSON.stringify(copy)) {
    return false;
  }
  return true;
};
