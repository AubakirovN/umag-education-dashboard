import { addHours, format, lastDayOfMonth, parse } from "date-fns";
import { ru } from "date-fns/locale";
import dayjs from "dayjs";

export const formatYMD = (date: Date | string) => {
  if (typeof date === "string") {
    return format(new Date(date), "yyyy-MM-dd");
  } else {
    return format(date, "yyyy-MM-dd");
  }
};
export const formatDMYHM = (date: Date | string) => {
  if (typeof date === 'string') {
    return format(new Date(date), 'd MMM yyyy HH:mm', { locale: ru });
  } else {
    return format(date, 'd MMM yyyy HH:mm', { locale: ru });
  }
};
export const formatDMY= (date: Date | string) => {
  if (typeof date === 'string') {
    return format(new Date(date), 'd MMM yyyy', { locale: ru });
  } else {
    return format(date, 'd MMM yyyy', { locale: ru });
  }
};
export const formatDMYslash = (date: Date | string) => {
    return dayjs(new Date(date), 'DD/MM/YYYY');
};
export const formatYMDHM = (date: Date | string) => {
  if (typeof date === 'string') {
    return format(new Date(date), 'yyyy-MM-dd HH:mm', { locale: ru });
  } else {
    return format(date, 'yyyy-MM-dd HH:mm', { locale: ru });
  }
};
export const formatMY = (date: string) => {
  const newDate = new Date(date);
  return format(newDate, "yyyy-MM");
};
export const formatDMstring = (date: string) => {
  const parsedDate = parse(date, "yyyy-MM-dd", new Date(), { locale: ru });
  return format(parsedDate, "dd MMM", { locale: ru });
};
export const formatDM = (date: string) => {
  const parsedDate = parse(date, "yyyy-MM-dd", new Date(), { locale: ru });
  return format(parsedDate, "dd.MM", { locale: ru });
};
export const formatFirstDayYMD = (date: string) => {
  const newDate = new Date(date);
  return format(newDate, "yyyy-MM-01");
};
export const formatLastDayYMD = (date: string) => {
  const newDate = new Date(date);
  return format(lastDayOfMonth(newDate), "yyyy-MM-dd");
};
export const formatTimeHM = (time: string, hours: number) => {
  const parsedTime = parse(time, "HH:mm", new Date());
  const newTime = addHours(parsedTime, hours);
  return format(newTime, "HH:mm");
};
export const formatDateTimeHM = (dateTime: string | Date) => {
  const dateTimeObj = new Date(dateTime);
  return format(dateTimeObj, 'HH:mm');
};
export const formatDateTTime = (dateTime: string) => {
  return dateTime.slice(0, 16);
}