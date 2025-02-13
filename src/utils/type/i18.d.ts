import { defaultNS, resources } from "../../core/plugin/i18.plugin.ts";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)["ar"];
  }
}
