import { validateAnyFile } from "./dto/filesValidator.js";
import { baseController } from "../shared/base.controller.js";
import { uploadFileBodyDto, uploadFileQueryDto } from "./dto/uploadFile.dto.js";
import { getFileDto } from "./dto/getFile.dto.js";

export const uploadFileController = baseController(
  async (fastify) => {
    fastify.post(
      "/file",
      {
        config: {
          roles: ["ADMIN", "MEMBER"],
        },
        preValidation: (request, reply) => validateAnyFile(request, reply), // Validate file before handling request
        schema: {
          consumes: ["multipart/form-data"], // Required for file upload in Swagger
          body: uploadFileBodyDto,
          querystring: uploadFileQueryDto,
        },
      },
      async (request, reply) => {
        const { link } = await request.diScope.cradle.uploadFileCommand.execute(
          {
            file: request.body.file,
          },
          request.query,
        );
        reply.send({ link });
        return reply;
      },
    );
    // Stream file download route
    fastify.get(
      "/download",
      {
        config: {
          roles: "PUBLIC",
        },
        schema: {
          querystring: getFileDto,
        },
      },
      async (request, reply) => {
        reply.header("Content-Type", "application/octet-stream");
        reply.header(
          "Content-Disposition",
          `attachment; filename=${request.query.link}`,
        );

        reply.send(
          await request.diScope.cradle.uploadFileService.get(
            request.query.link,
          ),
        );
        return reply; //important
      },
    );
  },
  { tag: "upload" },
);
