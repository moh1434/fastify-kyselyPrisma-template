import { FastifyRequest, FastifyReply } from "fastify";
import { fileTypeFromBuffer } from "file-type";
import { MultipartFile } from "@fastify/multipart";
import { APP_ERROR } from "../../../utils/error/appErrors.js";

const defaultMaxFileSizeInMB = 10;
const defaultMaxVideoSizeInMb = 25;
type AllowedImagesMimeTypes = "image/png" | "image/jpeg" | "image/jpg";
type AllowedVideosMimeTypes =
  | "video/quicktime"
  | "video/x-m4v"
  | "video/webm"
  | "video/mp4";
type PdfMimeType = "application/pdf";
type ExcelMimeType =
  | "application/vnd.ms-excel"
  | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  | "text/csv";
type AnyAllowedMimeType =
  | AllowedImagesMimeTypes
  | AllowedVideosMimeTypes
  | PdfMimeType
  | ExcelMimeType;

async function baseValidator(
  req: FastifyRequest,
  reply: FastifyReply,
  MAX_FILE_SIZE_IN_MB: number,
  allowedMimeTypes: AnyAllowedMimeType[],
) {
  const MAX_FILE_SIZE = MAX_FILE_SIZE_IN_MB * 1024 * 1024;
  const file: MultipartFile = (req as any).body.file;

  // Get actual file size from headers
  const fileSize = file.file.bytesRead;
  if (fileSize > MAX_FILE_SIZE || file.file.truncated) {
    throw APP_ERROR.BAD_REQUEST(undefined, {
      i18Key: "error.file.too_large",
      maxSize: `${MAX_FILE_SIZE_IN_MB}MB`,
    });
  }
  // Detect actual file type
  const detectedType = await fileTypeFromBuffer(await file.toBuffer());
  if (!detectedType || !allowedMimeTypes.includes(detectedType.mime as any)) {
    throw APP_ERROR.BAD_REQUEST(
      {
        allowedMimeTypes,
      },
      {
        i18Key: "error.file.invalid_type",
      },
    );
  }

  return file;
}

export async function validateAnyFile(
  req: FastifyRequest,
  reply: FastifyReply,
  MAX_FILE_SIZE_IN_MB = defaultMaxFileSizeInMB,
  allowedMimeTypes: AnyAllowedMimeType[] = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    //
    "video/quicktime",
    "video/x-m4v",
    "video/webm",
    "video/mp4",
    //
    "application/pdf",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
) {
  return await baseValidator(req, reply, MAX_FILE_SIZE_IN_MB, allowedMimeTypes);
}

export async function validateImage(
  req: FastifyRequest,
  reply: FastifyReply,
  MAX_FILE_SIZE_IN_MB = defaultMaxFileSizeInMB,
  allowedMimeTypes: AllowedImagesMimeTypes[] = [
    "image/png",
    "image/jpeg",
    "image/jpg",
  ],
) {
  return await baseValidator(req, reply, MAX_FILE_SIZE_IN_MB, allowedMimeTypes);
}

export async function validateVideo(
  req: FastifyRequest,
  reply: FastifyReply,
  MAX_FILE_SIZE_IN_MB = defaultMaxVideoSizeInMb,
  allowedMimeTypes: AllowedVideosMimeTypes[] = [
    "video/quicktime",
    "video/x-m4v",
    "video/webm",
    "video/mp4",
  ],
) {
  return await baseValidator(req, reply, MAX_FILE_SIZE_IN_MB, allowedMimeTypes);
}

export async function validateExcel(
  req: FastifyRequest,
  reply: FastifyReply,
  MAX_FILE_SIZE_IN_MB = defaultMaxFileSizeInMB,
  allowedMimeTypes: ExcelMimeType[] = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
) {
  return await baseValidator(req, reply, MAX_FILE_SIZE_IN_MB, allowedMimeTypes);
}

export async function validatePDF(
  req: FastifyRequest,
  reply: FastifyReply,
  MAX_FILE_SIZE_IN_MB = defaultMaxFileSizeInMB,
  allowedMimeTypes: PdfMimeType[] = ["application/pdf"],
) {
  return await baseValidator(req, reply, MAX_FILE_SIZE_IN_MB, allowedMimeTypes);
}
