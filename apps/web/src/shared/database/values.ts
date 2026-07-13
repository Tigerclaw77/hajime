export function timestampToIso(value: Date | string) {
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

export function nullableTimestampToIso(value: Date | string | null) {
  return value === null ? null : timestampToIso(value);
}

export function dateToIso(value: Date | string) {
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    return value.slice(0, 10);
  }

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) throw new RangeError("Invalid database date value.");

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function nullableDateToIso(value: Date | string | null) {
  return value === null ? null : dateToIso(value);
}

export function nullableInteger(value: number | string | null) {
  return value === null ? null : Number(value);
}
