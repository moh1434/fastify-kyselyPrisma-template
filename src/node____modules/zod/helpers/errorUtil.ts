import { zodI18nMessage } from "../types.js";

export namespace errorUtil {
  export type ErrMessage = string | { message?: string } | zodI18nMessage;
  export const errToObj = (message?: ErrMessage) => {
    if (typeof message === "string" || message === undefined) {
      return { message };
    }
    if ("message" in message) {
      return message;
    }
    if ("i18n" in message) {
      return message;
    }
    return {};
  };
  export const toString = (message?: ErrMessage): string | undefined => {
    if (typeof message === "string" || message === undefined) {
      return message;
    }
    if ("message" in message) {
      if (
        typeof message.message === "string" ||
        message.message === undefined
      ) {
        return message.message;
      }
    }
    if ("i18n" in message) {
      return message.i18n;
    }
  };
}
