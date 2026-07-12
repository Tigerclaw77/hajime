export type ActionResult<T = undefined> =
  | { ok: true; data: T }
  | { ok: false; message: string; fieldErrors?: Record<string, string[]> };

export function validationError<T = undefined>(
  fieldErrors: Record<string, string[] | undefined>,
): ActionResult<T> {
  return {
    ok: false,
    message: "Please review the highlighted fields.",
    fieldErrors: Object.fromEntries(
      Object.entries(fieldErrors).filter(
        (entry): entry is [string, string[]] => Boolean(entry[1]),
      ),
    ),
  };
}
