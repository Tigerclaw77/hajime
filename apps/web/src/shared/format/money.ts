const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export function moneyInputToMinor(value: string) {
  if (!value) return null;
  return Math.round(Number(value) * 100);
}

export function minorToMoneyInput(value: number | null) {
  if (value === null) return "";
  return (value / 100).toFixed(2);
}

export function formatUsdMinor(value: number | null) {
  if (value === null) return "Not estimated";
  return usdFormatter.format(value / 100);
}
