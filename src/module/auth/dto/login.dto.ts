import z from "zod";
import { iraqPhoneValidator } from "../zod/phone.validator.js";
import { passwordValidator } from "../zod/password.validator.js";

export const LoginDto = z.object({
  phone: iraqPhoneValidator,
  password: passwordValidator,
});

export type LoginDto = z.infer<typeof LoginDto>;
