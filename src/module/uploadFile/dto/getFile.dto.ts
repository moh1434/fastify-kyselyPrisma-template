import z from "zod";

export const getFileDto = z.object({
  link: z.string().max(120),
});

export type getFileDto = z.infer<typeof getFileDto>;
