export function moneyMask(amount: number) {
  return `${amount?.toLocaleString("ru-RU")} ₸`;
}