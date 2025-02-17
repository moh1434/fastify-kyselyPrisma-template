import { TokenPayload } from "../../../auth/dto/token.dto.js";
import {
  uploadFileBodyDto,
  uploadFileQueryDto,
} from "../../dto/uploadFile.dto.js";
import { uploadFileInterface } from "../../interface/uploadFile.interface.js";
import { KyselyDB } from "../../../../utils/type/kysely.js";

export default class UploadFileQuery {
  constructor(
    private db: KyselyDB,
    private tokenPayload: TokenPayload,
    private uploadFileService: uploadFileInterface,
  ) {}
  async execute(body: uploadFileBodyDto, params: uploadFileQueryDto) {
    const user = await this.db
      .selectFrom("User")
      .selectAll()
      .executeTakeFirst();
    return user;
  }
}
