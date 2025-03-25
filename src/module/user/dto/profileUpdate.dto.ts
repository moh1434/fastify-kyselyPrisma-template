import z from "zod";

export const profileUpdateDto = z.object({
  firstName: z.string().min(3),
  secondName: z.string().min(3),
  thirdName: z.string().min(3),
});

export type profileUpdateDto = z.infer<typeof profileUpdateDto>;
