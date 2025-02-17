import { type MultipartFile } from "@fastify/multipart";
import z from "zod";

export const uploadFileBodyDto = z.object({
  //for swagger generator.
  file: z.custom<MultipartFile>((file) => file instanceof Object, {
    i18n: "custom",
  }),
});

export const uploadFileQueryDto = z.object({
  type: z.enum([
    "profile-client",
    "profile-manager",
    "video-exercise",
    "image-exercise",
  ]),
  fileName: z
    .string()
    .max(50)
    .regex(/^[^.]*$/) //prevent "." inside the name
    .optional(),
});

export type uploadFileBodyDto = z.infer<typeof uploadFileBodyDto>;

export type uploadFileQueryDto = z.infer<typeof uploadFileQueryDto>;
