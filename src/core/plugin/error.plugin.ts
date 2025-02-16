import fastifyPlugin from "fastify-plugin";
import {
  APP_ERROR_LABEL,
  type BaseCustomError,
} from "../../utils/error/predefine-error.js";
// import { JsonStringify } from "../../utils/helpers/stringify.js";
import { FastifyValidationError } from "../../utils/type/FastifyValidationError.js";

export const setupErrorPlugin = fastifyPlugin(async (fastify, opts) => {
  fastify.setErrorHandler<BaseCustomError>((error, request, reply) => {
    // console.log("______START______", "_____________");
    // console.log(JsonStringify(error));
    // console.log("______END______", "_____________");
    if (Array.isArray((error as any).validation)) {
      //zod errors
      const fastifyValidationError = error as unknown as FastifyValidationError;
      const zodIssue = fastifyValidationError.validation[0].params.issue;
      reply.status(fastifyValidationError.statusCode).send({
        statusCode: fastifyValidationError.statusCode,
        code: fastifyValidationError.code,
        params: {
          code: zodIssue?.code,
          expected: zodIssue?.expected,
          received: zodIssue?.received,
          path: zodIssue.path,
        },
        message: fastifyValidationError.validation[0].message,
      });
      return;
    }
    if (error["APP_ERROR_LABEL"] != APP_ERROR_LABEL) {
      if (typeof error === "string") {
        reply.status(500).send({
          statusCode: 500,
          message: error,
        });
        return;
      }
      reply.send(error);
      return;
    }
    if (!request.t) {
      console.error("t is not a function! ", error);
    }
    reply.status(error.httpStatus).send({
      statusCode: error.httpStatus,
      params: error.params,
      code: error.code,
      message: error.i18Params
        ? request.t(error.i18Key, (error as any).i18Params)
        : error.message || error.defaultMessage,
    });
  });
});
