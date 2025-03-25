import fastifyPlugin from "fastify-plugin";
import {
  APP_ERROR,
  APP_ERROR_LABEL,
  type BaseCustomError,
} from "../../utils/error/appErrors.js";
// import { JsonStringify } from "../../utils/helpers/stringify.js";
import { FastifyValidationError } from "../../utils/type/FastifyValidationError.js";
import { JwtErrorsDictionary } from "../../utils/error/JwtErrorsDictionary.js";

export const setupErrorPlugin = fastifyPlugin(async (fastify, opts) => {
  fastify.setErrorHandler<BaseCustomError>((error, request, reply) => {
    if (JwtErrorsDictionary[error.code]) {
      (error as any) = APP_ERROR.UNAUTHORIZED(undefined, {
        code: error.code,
      });
    }
    //
    if (
      error.code === "FST_ERR_VALIDATION" &&
      Array.isArray((error as any).validation)
    ) {
      //zod errors
      const fastifyValidationError = error as unknown as FastifyValidationError;
      const zodIssue = fastifyValidationError.validation[0].params.issue;
      (error as any) = APP_ERROR.BAD_REQUEST(
        {
          zodCode: zodIssue?.code,
          expected: zodIssue?.expected,
          received: zodIssue?.received,
          path: zodIssue.path,
        },
        { directMessage: fastifyValidationError.validation[0].message },
      );
    }
    if (error["APP_ERROR_LABEL"] != APP_ERROR_LABEL) {
      console.log("log:", error);

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
    if (fastify.config.NODE_ENV === "test" && error?.httpStatus === 500) {
      console.log("test log:", error);
    }
    reply.status(error.httpStatus).send({
      statusCode: error.httpStatus,
      params: error.params,
      code: error.code,

      message:
        (error as any)?.i18Params?.directMessage ??
        (error.i18Key
          ? request.t(error.i18Key, (error as any).i18Params)
          : undefined) ??
        (error as any)?.message ??
        (error as any)?.defaultMessage,
    });
    return;
  });
});
