import z from "zod";

export const exampleDto = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type exampleDto = z.infer<typeof exampleDto>;
