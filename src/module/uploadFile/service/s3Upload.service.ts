import { ReadStream } from "fs";
import {
  addFilePayload,
  uploadFileInterface,
} from "../interface/uploadFile.interface.js";

export class S3UploadService implements uploadFileInterface {
  add(payload: addFilePayload): Promise<{ newLink: string }> {
    throw new Error("Method not implemented.");
  }
  delete(link: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  get(link: string): Promise<File | ReadStream> {
    throw new Error("Method not implemented.");
  }
  replace(
    addFilePayload: addFilePayload,
    callback: (newLink: string) => Promise<string>,
    oldLink: string,
  ): Promise<{ callbackResult: Awaited<ReturnType<typeof callback>> }> {
    throw new Error("Method not implemented.");
  }
}
