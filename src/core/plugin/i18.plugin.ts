import fastifyPlugin from "fastify-plugin";
import i18next from "i18next";

import { arabicTranslation } from "../../locales/ar.js";
import { englishTranslation } from "../../locales/en.js";
import { z } from "zod";
import { zodI18nMap } from "../../utils/helpers/_zodI18nMap.js";

export const defaultNS = "ns1";
export const resources = {
  ar: {
    ns1: arabicTranslation,
  },
  en: {
    ns1: englishTranslation,
  },
} as const;

export const setupI18Plugin = fastifyPlugin(async (fastify, opts) => {
  await i18next.init({
    debug: fastify.config.ENABLE_DEBUG_i18N,
    defaultNS,
    resources,
    fallbackLng: "ar",
    preload: ["ar"],
    saveMissing: true,
    partialBundledLanguages: true,
  });

  fastify.addHook("onRequest", async (request) => {
    const lang = request.headers["content-language"] || "ar"; // Default to Arabic
    request.t = i18next.getFixedT(lang);
  });

  z.setErrorMap(zodI18nMap);
});
