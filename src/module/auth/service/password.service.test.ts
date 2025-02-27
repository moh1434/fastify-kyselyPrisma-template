import { describe, expect, it } from "vitest";
import { PasswordService } from "./password.service.js";
import { generateUser } from "../../../utils/test/generateUsers.js";

describe("PasswordService", () => {
  const passwordService = new PasswordService();
  const testPassword = "StrongP@ssw0rd123";

  it("should hash a password", async () => {
    console.log("password.service.test:", generateUser());
    const hash = await passwordService.hash(testPassword);
    expect(hash).toBeDefined();
    expect(hash).not.toBe(testPassword); // Ensure it's hashed
  });

  it("should verify a correct password", async () => {
    console.log("password.service.test2:", generateUser());
    const hash = await passwordService.hash(testPassword);
    const isValid = await passwordService.verify(testPassword, hash);
    expect(isValid).toBe(true);
  });

  it("should not verify an incorrect password", async () => {
    console.log("password.service.test3:", generateUser());
    const hash = await passwordService.hash(testPassword);
    const isValid = await passwordService.verify("WrongPassword", hash);
    expect(isValid).toBe(false);
  });
});
