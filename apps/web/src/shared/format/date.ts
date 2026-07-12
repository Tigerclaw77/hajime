const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const dateTimeFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  month: "short",
  year: "numeric",
});

export function formatDate(value: string | null) {
  if (!value) return "Not estimated";
  return dateFormatter.format(new Date(`${value}T00:00:00Z`));
}

export function formatDateTime(value: string) {
  return dateTimeFormatter.format(new Date(value));
}
