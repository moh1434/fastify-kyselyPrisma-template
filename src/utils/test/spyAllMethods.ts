import { vi } from "vitest";

// Helper function to spy on all methods of a service or class instance
export function spyAllMethods<T>(instance: T): void {
  const methodNames = Object.getOwnPropertyNames(
    Object.getPrototypeOf(instance),
  ); // Get all method names in the class

  methodNames.forEach((methodName) => {
    if (
      typeof (instance as any)[methodName] === "function" &&
      methodName !== "constructor"
    ) {
      // Spy on the method
      vi.spyOn(instance, methodName as any);
    }
  });
}
