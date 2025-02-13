import { ZodIssueCode, ZodParsedType, defaultErrorMap, ZodErrorMap } from "zod";
import i18next, { i18n } from "i18next";

const jsonStringifyReplacer = (_: string, value: any): any => {
  if (typeof value === "bigint") {
    return value.toString();
  }
  return value;
};

function joinValues<T extends any[]>(array: T, separator = " | "): string {
  return array
    .map((val) => (typeof val === "string" ? `'${val}'` : val))
    .join(separator);
}

const isRecord = (value: unknown): value is Record<string, unknown> => {
  if (typeof value !== "object" || value === null) return false;

  for (const key in value) {
    if (!Object.prototype.hasOwnProperty.call(value, key)) return false;
  }

  return true;
};

const getKeyAndValues = (
  param: unknown,
  defaultKey: string,
): {
  values: Record<string, unknown>;
  key: string;
} => {
  if (typeof param === "string") return { key: param, values: {} };

  if (isRecord(param)) {
    const key =
      "key" in param && typeof param.key === "string" ? param.key : defaultKey;
    const values =
      "values" in param && isRecord(param.values) ? param.values : {};
    return { key, values };
  }

  return { key: defaultKey, values: {} };
};

export type MakeZodI18nMap = (option?: ZodI18nMapOption) => ZodErrorMap;

export type ZodI18nMapOption = {
  t?: i18n["t"];
  ns?: string | readonly string[];
  handlePath?: HandlePathOption | false;
};

export type HandlePathOption = {
  context?: string;
  ns?: string | readonly string[];
  keyPrefix?: string;
};

const defaultNs = "ns1";

export const makeZodI18nMap: MakeZodI18nMap = (option) => (issue, ctx) => {
  const { t, ns, handlePath } = {
    t: i18next.t,
    ns: defaultNs,
    ...option,
    handlePath:
      option?.handlePath !== false
        ? {
            context: "with_path",
            ns: option?.ns ?? defaultNs,
            keyPrefix: undefined,
            ...option?.handlePath,
          }
        : null,
  };

  if (issue.i18n) {
    //to translate direct messages
    issue.code = "custom";
  }

  let message: string;
  message = defaultErrorMap(issue, ctx).message;

  const path =
    issue.path.length > 0 && !!handlePath
      ? {
          context: handlePath.context,
          path: t(
            "zod." +
              [handlePath.keyPrefix, issue.path.join(".")]
                .filter(Boolean)
                .join("."),
            {
              ns: defaultNs,
              defaultValue: issue.path.join("."),
            },
          ),
        }
      : {};

  switch (issue.code) {
    case ZodIssueCode.custom: {
      const { key, values } = getKeyAndValues(
        "zod.custom." + issue?.i18n,
        "zod.custom",
      );
      message = t(key, {
        ...values,
        ns: defaultNs,
        defaultValue: message,
        ...path,
      });
      break;
    }
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = t("zod.errors.invalid_type_received_undefined", {
          ns: defaultNs,
          defaultValue: message,
          ...path,
        });
      } else if (issue.received === ZodParsedType.null) {
        message = t("zod.errors.invalid_type_received_null", {
          ns: defaultNs,
          defaultValue: message,
          ...path,
        });
      } else {
        message = t("zod.errors.invalid_type", {
          expected: t(`zod.types.${issue.expected}`, {
            defaultValue: issue.expected,
            ns: defaultNs,
          }),
          received: t(`zod.types.${issue.received}`, {
            defaultValue: issue.received,
            ns: defaultNs,
          }),
          ns: defaultNs,
          defaultValue: message,
          ...path,
        });
      }
      break;
    case ZodIssueCode.invalid_literal: {
      message = t("zod.errors.invalid_literal", {
        expected: JSON.stringify(issue.expected, jsonStringifyReplacer),
        ns: defaultNs,
        defaultValue: message,
        ...path,
      });
      break;
    }
    case ZodIssueCode.unrecognized_keys: {
      message = t("zod.errors.unrecognized_keys", {
        keys: joinValues(issue.keys, ", "),
        count: issue.keys.length,
        ns: defaultNs,
        defaultValue: message,
        ...path,
      });
      break;
    }
    case ZodIssueCode.invalid_union: {
      message = t("zod.errors.invalid_union", {
        ns: defaultNs,
        defaultValue: message,
        ...path,
      });
      break;
    }
    case ZodIssueCode.invalid_union_discriminator: {
      message = t("zod.errors.invalid_union_discriminator", {
        options: joinValues(issue.options),
        ns: defaultNs,
        defaultValue: message,
        ...path,
      });
      break;
    }
    case ZodIssueCode.invalid_enum_value: {
      message = t("zod.errors.invalid_enum_value", {
        options: joinValues(issue.options),
        received: issue.received,
        ns: defaultNs,
        defaultValue: message,
        ...path,
      });
      break;
    }
    case ZodIssueCode.invalid_arguments: {
      message = t("zod.errors.invalid_arguments", {
        ns: defaultNs,
        defaultValue: message,
        ...path,
      });
      break;
    }
    case ZodIssueCode.invalid_return_type: {
      message = t("zod.errors.invalid_return_type", {
        ns: defaultNs,
        defaultValue: message,
        ...path,
      });
      break;
    }
    case ZodIssueCode.invalid_date: {
      message = t("zod.errors.invalid_date", {
        ns: defaultNs,
        defaultValue: message,
        ...path,
      });
      break;
    }
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("startsWith" in issue.validation) {
          message = t(`zod.errors.invalid_string.startsWith`, {
            startsWith: issue.validation.startsWith,
            ns: defaultNs,
            defaultValue: message,
            ...path,
          });
        } else if ("endsWith" in issue.validation) {
          message = t(`zod.errors.invalid_string.endsWith`, {
            endsWith: issue.validation.endsWith,
            ns: defaultNs,
            defaultValue: message,
            ...path,
          });
        }
      } else {
        message = t(`zod.errors.invalid_string.${issue.validation}`, {
          validation: t(`validations.${issue.validation}`, {
            defaultValue: issue.validation,
            ns: defaultNs,
          }),
          ns: defaultNs,
          defaultValue: message,
          ...path,
        });
      }
      break;
    case ZodIssueCode.too_small: {
      const minimum =
        issue.type === "date"
          ? new Date(issue.minimum as number)
          : issue.minimum;
      message = t(
        `zod.errors.too_small.${issue.type}.${
          issue.exact
            ? "exact"
            : issue.inclusive
              ? "inclusive"
              : "not_inclusive"
        }`,
        {
          minimum,
          count: typeof minimum === "number" ? minimum : undefined,
          ns: defaultNs,
          defaultValue: message,
          ...path,
        },
      );
      break;
    }
    case ZodIssueCode.too_big:
      const maximum =
        issue.type === "date"
          ? new Date(issue.maximum as number)
          : issue.maximum;
      message = t(
        `zod.errors.too_big.${issue.type}.${
          issue.exact
            ? "exact"
            : issue.inclusive
              ? "inclusive"
              : "not_inclusive"
        }`,
        {
          maximum,
          count: typeof maximum === "number" ? maximum : undefined,
          ns: defaultNs,
          defaultValue: message,
          ...path,
        },
      );
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = t("zod.errors.invalid_intersection_types", {
        ns: defaultNs,
        defaultValue: message,
        ...path,
      });
      break;
    case ZodIssueCode.not_multiple_of:
      message = t("zod.errors.not_multiple_of", {
        multipleOf: issue.multipleOf,
        ns: defaultNs,
        defaultValue: message,
        ...path,
      });
      break;
    case ZodIssueCode.not_finite:
      message = t("zod.errors.not_finite", {
        ns: defaultNs,
        defaultValue: message,
        ...path,
      });
      break;
    default:
  }

  return { message };
};

export const zodI18nMap = makeZodI18nMap();
