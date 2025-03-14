import { TokenPayload } from "../../../auth/dto/token.dto.js";
import {
  uploadFileBodyDto,
  uploadFileQueryDto,
} from "../../dto/uploadFile.dto.js";
import { uploadFileInterface } from "../../interface/uploadFile.interface.js";
import { KyselyDB } from "../../../../utils/type/kysely.js";

export default class UploadFileCommand {
  constructor(
    private db: KyselyDB,
    private tokenPayload: TokenPayload,
    private uploadFileService: uploadFileInterface,
  ) {}
  async execute(body: uploadFileBodyDto, params: uploadFileQueryDto) {
    const { link } = await this.uploadFileService.add({
      file: body.file,
      pathSuffix: params.type + `/${this.tokenPayload.id}_`,
      filename: params.fileName,
    });

    return { link };
  }
}
