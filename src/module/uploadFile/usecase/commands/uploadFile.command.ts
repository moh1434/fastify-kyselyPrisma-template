import { TokenPayload } from "../../../auth/dto/token.dto.js";
import {
  uploadFileBodyDto,
  uploadFileParamsDto,
} from "../../dto/uploadFile.dto.js";
import { uploadFileInterface } from "../../interface/uploadFile.interface.js";
import { KyselyDB } from "../../../../utils/type/kysely.js";

export default class UploadFileCommand {
  constructor(
    private db: KyselyDB,
    private tokenPayload: TokenPayload,
    private uploadFileService: uploadFileInterface,
  ) {}
  execute() {}
}
