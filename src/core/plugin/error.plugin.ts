import fastifyPlugin from "fastify-plugin";
import {
  APP_ERROR_LABEL,
  type BaseCustomError,
} from "../../utils/error/predefine-error.js";

export const setupErrorPlugin = fastifyPlugin(async (fastify, opts) => {
  fastify.setErrorHandler<BaseCustomError>((error, request, reply) => {
    // console.log("______START______", "_____________");
    // console.log(JsonStringify(error));
    // console.log("______END______", "_____________");
    if (error["APP_ERROR_LABEL"] != APP_ERROR_LABEL) {
      //include zod errors(error.code === "FST_ERR_VALIDATION")
      // console.log("1");
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
      // console.log("2");
      console.error("t is not a function! ", error);
    }
    // console.log("3");
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
