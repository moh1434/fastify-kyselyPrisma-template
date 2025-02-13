import z from "zod";
import { iraqPhoneValidator } from "../zod/phone.validator.js";
import { passwordValidator } from "../zod/password.validator.js";

export const loginDto = z.object({
  phone: iraqPhoneValidator,
  password: passwordValidator,
});

export type loginDto = z.infer<typeof loginDto>;
