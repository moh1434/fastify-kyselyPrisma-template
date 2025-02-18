export const englishTranslation = {
  error: {
    http: {
      badRequest: "wrong input",
      unauthorized: "not authorized",
      forbidden:
        "your role is {{current_role}}, but you need one of these roles {{accepted_roles}}}",

      notFound: "{{resource}} not found ",
      requestTimeout: "time out",
      conflict: "{{resource}} already exists",
      internalServerError: "internal server error",
      badGateway: "bad gateway",
    },
    unauthorized: {
      wrongPassword: "password or phone is wrong",
      noLogin: "you need to login first",
    },
    file: {
      too_large: "حجم الملف كبير, الحجم الاقصى {{maxSize}}",
      invalid_type: "نوع الملف غير مقبول",
    },
  },
  zod: {
    custom: {
      custom: "wrong input",
      invalid_pagination_input:
        "invalid pagination input, use one of (skip/take) or (page/perPage), not both",
      invalid_phone_number:
        "phone number should include (10) digits and starts with (0) or (+964)",
      invalid_password: "ENالرمز السري يجب ان يحتوي على ٨ حروف",
    },
    errors: {
      invalid_type: "Expected {{expected}}, received {{received}}",
      invalid_type_received_undefined: "Required",
      invalid_type_received_null: "Required",
      invalid_literal: "Invalid literal value, expected {{expected}}",
      unrecognized_keys: "Unrecognized key(s) in object: {{- keys}}",
      invalid_union: "Invalid input",
      invalid_union_discriminator:
        "Invalid discriminator value. Expected {{- options}}",
      invalid_enum_value:
        "Invalid enum value. Expected {{- options}}, received '{{received}}'",
      invalid_arguments: "Invalid function arguments",
      invalid_return_type: "Invalid function return type",
      invalid_date: "Invalid date",
      custom: "Invalid input",
      invalid_intersection_types: "Intersection results could not be merged",
      not_multiple_of: "Number must be a multiple of {{multipleOf}}",
      not_finite: "Number must be finite",
      invalid_string: {
        email: "Invalid {{validation}}",
        url: "Invalid {{validation}}",
        uuid: "Invalid {{validation}}",
        cuid: "Invalid {{validation}}",
        regex: "Invalid",
        datetime: "Invalid {{validation}}",
        startsWith: 'Invalid input: must start with "{{startsWith}}"',
        endsWith: 'Invalid input: must end with "{{endsWith}}"',
      },
      too_small: {
        array: {
          exact: "Array must contain exactly {{minimum}} element(s)",
          inclusive: "Array must contain at least {{minimum}} element(s)",
          not_inclusive: "Array must contain more than {{minimum}} element(s)",
        },
        string: {
          exact: "String must contain exactly {{minimum}} character(s)",
          inclusive: "String must contain at least {{minimum}} character(s)",
          not_inclusive: "String must contain over {{minimum}} character(s)",
        },
        number: {
          exact: "Number must be exactly {{minimum}}",
          inclusive: "Number must be greater than or equal to {{minimum}}",
          not_inclusive: "Number must be greater than {{minimum}}",
        },
        set: {
          exact: "Invalid input",
          inclusive: "Invalid input",
          not_inclusive: "Invalid input",
        },
        date: {
          exact: "Date must be exactly {{- minimum, datetime}}",
          inclusive:
            "Date must be greater than or equal to {{- minimum, datetime}}",
          not_inclusive: "Date must be greater than {{- minimum, datetime}}",
        },
      },
      too_big: {
        array: {
          exact: "Array must contain exactly {{maximum}} element(s)",
          inclusive: "Array must contain at most {{maximum}} element(s)",
          not_inclusive: "Array must contain less than {{maximum}} element(s)",
        },
        string: {
          exact: "String must contain exactly {{maximum}} character(s)",
          inclusive: "String must contain at most {{maximum}} character(s)",
          not_inclusive: "String must contain under {{maximum}} character(s)",
        },
        number: {
          exact: "Number must be exactly {{maximum}}",
          inclusive: "Number must be less than or equal to {{maximum}}",
          not_inclusive: "Number must be less than {{maximum}}",
        },
        set: {
          exact: "Invalid input",
          inclusive: "Invalid input",
          not_inclusive: "Invalid input",
        },
        date: {
          exact: "Date must be exactly {{- maximum, datetime}}",
          inclusive:
            "Date must be smaller than or equal to {{- maximum, datetime}}",
          not_inclusive: "Date must be smaller than {{- maximum, datetime}}",
        },
      },
    },
    fields: {
      password: "password",
      email: "email",
      phone: "phone",
    },
    validations: {
      email: "email",
      url: "url",
      uuid: "uuid",
      cuid: "cuid",
      regex: "regex",
      datetime: "datetime",
    },
    types: {
      function: "function",
      number: "number",
      string: "string",
      nan: "nan",
      integer: "integer",
      float: "float",
      boolean: "boolean",
      date: "date",
      bigint: "bigint",
      undefined: "undefined",
      symbol: "symbol",
      null: "null",
      array: "array",
      object: "object",
      unknown: "unknown",
      promise: "promise",
      void: "void",
      never: "never",
      map: "map",
      set: "set",
    },
  },
} as const;
