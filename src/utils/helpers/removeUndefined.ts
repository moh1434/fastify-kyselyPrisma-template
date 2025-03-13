/**
 * this function does not modify the source object
 */
export function removeUndefined<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj
      .map((item) => removeUndefined(item)) // Recursively clean each array item
      .filter((item) => item !== undefined) as T;
  } else if (obj instanceof Date) {
    return obj; // Preserve Date objects
  } else if (typeof obj === "object" && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([_, value]) => value !== undefined) // Remove only `undefined`
        .map(([key, value]) => [key, removeUndefined(value)]), // Recursively clean nested objects
    ) as T;
  }
  return obj; // Return other values as is
}
