export function JsonStringify(obj: any) {
  try {
    return JSON.stringify(obj, null, 2);
  } catch (e) {
    return obj;
  }
}
