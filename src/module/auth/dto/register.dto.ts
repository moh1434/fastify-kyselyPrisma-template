// register.dto.ts
import { z } from "zod";
import { passwordValidator } from "../zod/password.validator.js";
import { iraqPhoneValidator } from "../zod/phone.validator.js";

export const registerDto = z
  .object({
    phone: iraqPhoneValidator,
    password: passwordValidator,
    confirmPassword: z.string(),
    firstName: z.string().min(3),
    secondName: z.string().min(3),
    email: z.string().email(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    i18n: "invalid_confirmation_password",
    path: ["confirmPassword"],
  });

export type registerDto = z.infer<typeof registerDto>;
