import { TokenPayload } from "../../../auth/dto/token.dto.js";
import {
  uploadFileBodyDto,
  uploadFileQueryDto,
} from "../../dto/uploadFile.dto.js";
import { uploadFileInterface } from "../../interface/uploadFile.interface.js";
import { KyselyDB } from "../../../../utils/type/kysely.js";
import { getFileDto } from "../../dto/getFile.dto.js";

export default class GetFileCommand {
  constructor(
    private db: KyselyDB,
    private tokenPayload: TokenPayload,
    private uploadFileService: uploadFileInterface,
  ) {}
  async execute(payload: getFileDto) {
    return await this.uploadFileService.get(payload.link);
  }
}
