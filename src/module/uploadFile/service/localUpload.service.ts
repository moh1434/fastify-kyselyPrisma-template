import path from "path";
import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
import {
  addFilePayload,
  uploadFileInterface,
} from "../interface/uploadFile.interface.js";
import { __dirname } from "../../../utils/__dirname.js";
import { APP_ERROR } from "../../../utils/error/predefine-error.js";

const UPLOAD_DIR = path.resolve(__dirname, "uploads");

export class LocalUploadService implements uploadFileInterface {
  async add(payload: addFilePayload): Promise<{ newLink: string }> {
    const filePath = path.resolve(
      UPLOAD_DIR + payload.pathSuffix,
      payload.filename || payload.multipartFile.filename,
    );
    await pump(payload.multipartFile.file, fs.createWriteStream(filePath));

    return { newLink: filePath };
  }
  async delete(link: string): Promise<void> {
    const filePath = path.resolve(UPLOAD_DIR, link);

    if (!filePath.startsWith(UPLOAD_DIR)) {
      throw APP_ERROR.UNAUTHORIZED();
    }
    if (!fs.existsSync(filePath)) {
      throw APP_ERROR.NOT_FOUND({ resource: "file" });
    }

    fs.unlinkSync(filePath); // Delete file
    return;
  }
  async get(link: string): Promise<File | fs.ReadStream> {
    if (!fs.existsSync(link)) {
      throw APP_ERROR.NOT_FOUND({ resource: "file" });
    }

    return fs.createReadStream(link);
  }
  async replace(
    addFilePayload: addFilePayload,
    callback: (newLink: string) => Promise<string>,
    oldLink: string,
    //
  ): Promise<{ callbackResult: Awaited<ReturnType<typeof callback>> }> {
    const { newLink } = await this.add(addFilePayload);
    const callbackResult = await callback(newLink);
    this.delete(oldLink);
    return { callbackResult };
  }
}

const pump = promisify(pipeline);

// Ensure the uploads directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
}
