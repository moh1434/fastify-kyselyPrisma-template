import { TokenPayload } from "../../../auth/dto/token.dto.js";
import {
  uploadFileBodyDto,
  uploadFileParamsDto,
} from "../../dto/uploadFile.dto.js";
import { type PrismaClient } from "@prisma/client";
import { uploadFileInterface } from "../../interface/uploadFile.interface.js";

export default class UploadFileCommand {
  constructor(
    private db: PrismaClient,
    private tokenPayload: TokenPayload,
    private uploadFileService: uploadFileInterface,
  ) {}
  execute() {}
}
