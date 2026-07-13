export function timestampToIso(value: Date | string) {
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

export function nullableTimestampToIso(value: Date | string | null) {
  return value === null ? null : timestampToIso(value);
}

export function nullableInteger(value: number | string | null) {
  return value === null ? null : Number(value);
}
