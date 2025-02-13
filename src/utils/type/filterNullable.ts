//remove null|undefined from an array and its type
export function filterNullable<T>(array: T[]): Exclude<T, null | undefined>[] {
  return array.filter(
    (a): a is Exclude<T, null | undefined> => a !== null && a !== undefined,
  );
}
