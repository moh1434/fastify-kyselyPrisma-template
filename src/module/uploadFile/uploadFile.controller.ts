import { validateAnyFile } from "./dto/filesValidator.js";
import { baseController } from "../shared/base.controller.js";
import {
  uploadFileBodyDto,
  uploadFileParamsDto,
} from "./dto/uploadFile.dto.js";

export const uploadFileController = baseController(
  async (fastify) => {
    fastify.post(
      "/file/:type",
      {
        config: {
          roles: ["ADMIN", "MEMBER"],
        },
        preValidation: (req, reply) => validateAnyFile(req, reply), // Validate file before handling request
        schema: {
          consumes: ["multipart/form-data"], // Required for file upload in Swagger
          body: uploadFileBodyDto,
          params: uploadFileParamsDto,
        },
      },
      async (request, reply) => {
        const { file } = request.body;
        const { type } = request.params; // Get the file type from the URL parameter
        reply.send({
          message: "File uploaded successfully",
          filename: "fileLink",
        });
      },
    );
    // Stream file download route
    fastify.get(
      "/download/:link",
      {
        config: {
          roles: ["ADMIN", "MEMBER"],
        },
      },
      async (req, reply) => {
        const { link } = req.params as { link: string };
        const result = "";
        //TODO:
        reply.header("Content-Disposition", `attachment; filename="${link}"`);
        reply.send(result);
      },
    );
  },
  { tag: "upload" },
);
