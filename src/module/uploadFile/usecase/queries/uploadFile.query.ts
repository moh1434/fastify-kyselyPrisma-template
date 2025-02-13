import { PrismaClient } from "@prisma/client";
import { TokenPayload } from "../../../auth/dto/token.dto.js";
import {
  uploadFileBodyDto,
  uploadFileParamsDto,
} from "../../dto/uploadFile.dto.js";
import { uploadFileInterface } from "../../interface/uploadFile.interface.js";

export default class UploadFileQuery {
  constructor(
    private db: PrismaClient,
    private tokenPayload: TokenPayload,
    private uploadFileService: uploadFileInterface,
  ) {}
  execute(body: uploadFileBodyDto, params: uploadFileParamsDto) {
    return this.db.user.findUnique({
      where: {
        phone: "",
      },
    });
  }
}
