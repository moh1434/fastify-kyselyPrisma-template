import path from "path";
import fs from "fs";
import {
  addFilePayload,
  uploadFileInterface,
} from "../interface/uploadFile.interface.js";
import { APP_ERROR } from "../../../utils/error/appErrors.js";
import { UPLOAD_DIR } from "../../../utils/rootDirectory.js";

// Ensure the uploads directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
}

export class LocalUploadService implements uploadFileInterface {
  async add(payload: addFilePayload): Promise<{ link: string }> {
    let pathWithSuffix = payload.filename || payload.file.filename;
    if (payload.pathSuffix) {
      pathWithSuffix = `${payload.pathSuffix}${pathWithSuffix}`;
    }
    const filePath = path.resolve(UPLOAD_DIR, pathWithSuffix);

    fs.writeFileSync(filePath, await payload.file.toBuffer());

    return { link: pathWithSuffix };
  }
  async delete(link: string): Promise<void> {
    const filePath = path.resolve(UPLOAD_DIR, link);

    if (!filePath.startsWith(UPLOAD_DIR)) {
      throw APP_ERROR.UNAUTHORIZED();
    }
    if (!fs.existsSync(filePath)) {
      throw APP_ERROR.NOT_FOUND();
    }

    fs.unlinkSync(filePath); // Delete file
    return;
  }
  async get(link: string): Promise<fs.ReadStream> {
    const filePath = path.resolve(UPLOAD_DIR, link);
    if (!fs.existsSync(filePath)) {
      throw APP_ERROR.NOT_FOUND();
    }
    return fs.createReadStream(filePath);
  }
  async replace(
    addFilePayload: addFilePayload,
    callback: (link: string) => Promise<string>,
    oldLink: string,
    //
  ): Promise<{ callbackResult: Awaited<ReturnType<typeof callback>> }> {
    const { link } = await this.add(addFilePayload);
    const callbackResult = await callback(link);
    this.delete(oldLink);
    return { callbackResult };
  }
}
