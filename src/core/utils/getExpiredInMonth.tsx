import { addMonths, isBefore, isEqual, parseISO } from "date-fns";

export const getExpiringColor = (date: string) => {
  const newDate = parseISO(date);
  const now = new Date();
  const datePlusOneMonth = addMonths(now, 1);
  if (
    isBefore(newDate, datePlusOneMonth) ||
    isEqual(newDate, datePlusOneMonth)
  ) {
    return "mistyrose";
  }
  return "inherit";
};
