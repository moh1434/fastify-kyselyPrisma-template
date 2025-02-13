import type { ParseKeys, t } from "i18next";
///below is low level error code to force type safety for error code and language key
/// used to check if the error is a custom error

export type ErrorCode = keyof typeof APP_ERROR;

// export type i18Params = { [k in string]: any };
export type Params = Record<string, string>;
export type ForceLanguageBaseCustomError = (
  i18Params?: any,
  params?: Params,
) => {
  httpStatus: number;
  code: string;
  defaultMessage: string;
  params?: Params;
  //
  i18Key: ParseKeys;
  i18Params?: Params;
  APP_ERROR_LABEL: typeof APP_ERROR_LABEL;
};

export type BaseCustomError = ReturnType<
  (typeof APP_ERROR)[keyof typeof APP_ERROR]
> &
  Error;

/// add your error here , and then use it like APP_ERROR.NOT_FOUND_USER({name:"ali"})

export const APP_ERROR_LABEL = "APP_ERROR_LABEL";
export const APP_ERROR = {
  BAD_REQUEST: (i18Params?: Params, params?: Params) => ({
    httpStatus: 400,
    code: "BAD_REQUEST",
    defaultMessage: "Bad request",
    params,
    i18Key: "error.http.badRequest",
    i18Params, //{}
    APP_ERROR_LABEL,
  }),
  WRONG_PASSWORD: (i18Params?: Params, params?: Params) => ({
    httpStatus: 401,
    code: "WRONG_PASSWORD",
    defaultMessage: "Unauthorized",
    params,

    i18Key: "error.unauthorized.wrongPassword",
    i18Params, //{}
    APP_ERROR_LABEL,
  }),
  UNAUTHORIZED: (i18Params?: Params, params?: Params) => ({
    httpStatus: 401,
    code: "UNAUTHORIZED",
    defaultMessage: "Unauthorized",
    params,

    i18Key: "error.unauthorized.noLogin",
    i18Params, //{}
    APP_ERROR_LABEL,
  }),
  FORBIDDEN: (
    i18Params?: { current_role: string; accepted_roles: string },
    params?: Params,
  ) => ({
    httpStatus: 403,
    code: "FORBIDDEN",
    defaultMessage: "Forbidden",
    params,

    i18Key: "error.http.forbidden",
    i18Params,
    APP_ERROR_LABEL,
  }),
  NOT_FOUND: (i18Params?: { resource: string }, params?: Params) => ({
    httpStatus: 404,
    code: "NOT_FOUND",
    defaultMessage: "Not found",
    params,

    i18Key: "error.http.notFound",
    i18Params,
    APP_ERROR_LABEL,
  }),

  REQUEST_TIMEOUT: (i18Params?: Params, params?: Params) => ({
    httpStatus: 408,
    code: "REQUEST_TIMEOUT",
    defaultMessage: "Request Timeout",
    params,

    i18Key: "error.http.requestTimeout",
    i18Params,
    APP_ERROR_LABEL,
  }),
  CONFLICT: (i18Params?: { resource: string }, params?: Params) => ({
    httpStatus: 409,
    code: "CONFLICT",
    defaultMessage: "Conflict",
    params,

    i18Key: "error.http.conflict",
    i18Params,
    APP_ERROR_LABEL,
  }),
  INTERNAL_SERVER_ERROR: (i18Params?: Params, params?: Params) => ({
    httpStatus: 500,
    code: "INTERNAL_SERVER_ERROR",
    defaultMessage: "Internal server error",
    params,

    i18Key: "error.http.internalServerError",
    i18Params,
    APP_ERROR_LABEL,
  }),
} as const satisfies Record<string, ForceLanguageBaseCustomError>;
