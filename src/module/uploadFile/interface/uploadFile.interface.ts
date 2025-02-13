import type { ReadStream } from "fs";
import { type MultipartFile } from "@fastify/multipart";
export type addFilePayload = {
  multipartFile: MultipartFile;
  pathSuffix?: string;
  filename?: string;
};
export interface uploadFileInterface {
  add(payload: addFilePayload): Promise<{ newLink: string }>;
  delete(link: string): Promise<void>;
  get(link: string): Promise<File | ReadStream>;

  /**
   *1- upload the new file
   *2- pass it's link to the callback(usually a function to update the link in the DB)
   *3- if every thing ok, delete the old link file
   */
  replace(
    addFilePayload: addFilePayload,
    callback: (newLink: string) => Promise<string>,
    oldLink: string,
  ): Promise<{ callbackResult: Awaited<ReturnType<typeof callback>> }>;
}
