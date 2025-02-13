import fastifyPlugin from "fastify-plugin";
import { baseController } from "../../module/shared/base.controller.js";
import { controllers } from "../../utils/generated/controller.generated.js";

export const setupControllersPlugin = fastifyPlugin(async (fastify, opts) => {
  const registerBaseController = (
    controller: ReturnType<typeof baseController>,
  ) => {
    fastify.register(controller.callback, {
      prefix: controller.options.tag,
    });
  };
  const _controllers = controllers;

  for (const controller of _controllers) {
    registerBaseController(controller);
  }
});
