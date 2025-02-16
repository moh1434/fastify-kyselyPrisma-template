import z from "zod";

export const passwordValidator = z.string().min(8);
