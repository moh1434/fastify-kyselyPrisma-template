import z from "zod";

export const refreshTokenDto = z.object({
  authorization: z.string(),
});

export type refreshTokenDto = z.infer<typeof refreshTokenDto>;
