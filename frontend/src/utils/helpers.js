export function formatCurrency(number) {
  return new Intl.NumberFormat("de-DE").format(number);
}
