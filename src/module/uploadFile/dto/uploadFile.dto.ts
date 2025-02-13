import { type MultipartFile } from "@fastify/multipart";
import z from "zod";

export const uploadFileBodyDto = z.object({
  //for swagger generator.
  file: z.custom<MultipartFile>((file) => file instanceof Object, {
    i18n: "custom",
  }),
});

export const uploadFileParamsDto = z.object({
  type: z.enum([
    "profile-client",
    "profile-manager",
    "video-exercise",
    "image-exercise",
  ]),
});

export type uploadFileBodyDto = z.infer<typeof uploadFileBodyDto>;

export type uploadFileParamsDto = z.infer<typeof uploadFileParamsDto>;
