import { FastifyRequest, FastifyReply } from "fastify";
import { fileTypeFromBuffer } from "file-type";
import { uploadFileBodyDto } from "./uploadFile.dto.js";

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
  MAX_FILE_SIZE_IN_MB = 5,
  allowedMimeTypes: AnyAllowedMimeType[],
) {
  const MAX_FILE_SIZE = MAX_FILE_SIZE_IN_MB * 1024 * 1024;

  const file = await req.file();

  if (!file) {
    return reply.status(400).send({ error: "No file uploaded" });
  }

  // Get actual file size from headers
  const fileSize = Number(file.fields["content-length"] || 0);

  // Check file size
  if (fileSize > MAX_FILE_SIZE) {
    return reply.status(400).send({
      error: `File too large (max ${MAX_FILE_SIZE}MB)`,
    });
  }
  if (file.file.truncated) {
    return reply
      .status(400)
      .send({ error: "File too large (truncated by Fastify global limit)" });
  }
  //

  // Detect actual file type
  const detectedType = await fileTypeFromBuffer(await file.toBuffer());
  if (!detectedType || !allowedMimeTypes.includes(detectedType.mime as any)) {
    return reply
      .status(400)
      .send({ error: "Invalid file type (mismatched content)" });
  }

  // Attach validated file to request for route handler, zod validation
  (req.body as uploadFileBodyDto)["file"] = file;
}

export async function validateAnyFile(
  req: FastifyRequest,
  reply: FastifyReply,
  MAX_FILE_SIZE_IN_MB = 5,
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
  MAX_FILE_SIZE_IN_MB = 5,
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
  MAX_FILE_SIZE_IN_MB = 5,
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
  MAX_FILE_SIZE_IN_MB = 5,
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
  MAX_FILE_SIZE_IN_MB = 5,
  allowedMimeTypes: PdfMimeType[] = ["application/pdf"],
) {
  return await baseValidator(req, reply, MAX_FILE_SIZE_IN_MB, allowedMimeTypes);
}
