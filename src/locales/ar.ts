export const arabicTranslation = {
  error: {
    http: {
      badRequest: "خطا في البيانات المدخلة",
      unauthorized: "تاكد من تسجيل الدخول",
      forbidden:
        "الصلاحية التي لديك: {{current_role}} بينما الصلاحيات المطلوبة: {{accepted_roles}}", //"ليست لديك صلاحية للقيام بهذا العملية"
      notFound: "غير موجود {{resource}}",
      requestTimeout: "انتهت مهلة الطلب",
      conflict: "موجود مسبقا",
      internalServerError: "خطأ في الخادم حاول مرة اخرى",
      badGateway: "بوابة غير صالحة",
    },
    unauthorized: {
      wrongPassword: "كلمة السر او رقم الهاتف غير صحيح",
      noLogin: "خطأ بستجيل الدخول",
    },
    file: {
      too_large: "حجم الملف كبير, الحجم الاقصى {{maxSize}}",
      invalid_type: "نوع الملف غير مقبول",
    },
  },
  zod: {
    custom: {
      custom: "مدخل غير صالح",
      invalid_pagination_input:
        "طريقة تقسيم الصفحات غير صالحة, استعمل اما (skip/take) او (page/perPage), وليس كلاهما",
      invalid_phone_number:
        "رقم الهاتف يجب ان يحتوي على ١٠ ارقام ويبدأ ب ٠ او +٩٦٤",
      invalid_password: "الرمز السري يجب ان يحتوي على ٨ حروف",
      invalid_confirmation_password: "الرمز السري غير متطابق",
    },
    errors: {
      invalid_type: "المتوقع {{expected}}، ولكن تم استلام {{received}}",
      invalid_type_received_undefined: "هذا الحقل مطلوب",
      invalid_type_received_null: "هذا الحقل مطلوب",
      invalid_literal: "قيمة غير صحيحة، يجب أن تكون {{expected}}",
      unrecognized_keys: "عنصر (عناصر) غير معروف في الكائن: {{- keys}}",
      invalid_union: "القيمة المدخلة غير صالحة",
      invalid_union_discriminator:
        "القيمة المحددة غير صالحة، يجب أن تكون واحدة من: {{- options}}",
      invalid_enum_value:
        "قيمة غير صالحة، يجب أن تكون واحدة من: {{- options}}، ولكن تم استلام '{{received}}'",
      invalid_arguments: "المعاملات غير صالحة",
      invalid_return_type: "نوع الإرجاع غير صالح",
      invalid_date: "التاريخ غير صالح",
      custom: "القيمة المدخلة غير صالحة",
      invalid_intersection_types: "لا يمكن دمج القيم المتقاطعة",
      not_multiple_of: "يجب أن يكون الرقم من مضاعفات {{multipleOf}}",
      not_finite: "الارقام الغير نهائية ممنوعة",
      invalid_string: {
        email: "البريد الإلكتروني غير صالح", //"غير صالح {{validation}}",
        url: "عنوان url غير صالح", //"غير صالح {{validation}}",
        uuid: "uuid غير صالح", //"غير صالح {{validation}}",
        cuid: "cuid غير صالح", //"غير صالح {{validation}}",
        regex: "غير صالح",
        datetime: "التاريخ والوقت غير صالح", //"غير صالح {{validation}}",
        startsWith: "يجب أن يبدأ بـ {{startsWith}}",
        endsWith: "يجب أن ينتهي بـ {{endsWith}}",
      },
      too_small: {
        array: {
          exact: "يجب ان ترسل {{minimum}} عنصر بالضبط",
          inclusive: "يجب ان ترسل {{minimum}} عنصر على الأقل",
          not_inclusive: "يجب ان ترسل أكثر من {{minimum}} عنصر",
        },
        string: {
          exact: "يجب أن يحتوي النص على {{minimum}} حرف بالضبط",
          inclusive: "يجب أن يحتوي النص على {{minimum}} حرف على الأقل",
          not_inclusive: "يجب أن يحتوي النص على أكثر من {{minimum}} حرف",
        },
        number: {
          exact: "يجب أن يكون الرقم {{minimum}}",
          inclusive: "يجب أن يكون الرقم أكبر من أو يساوي {{minimum}}",
          not_inclusive: "يجب أن يكون الرقم أكبر من {{minimum}}",
        },
        set: {
          exact: "القيمة المدخلة غير صالحة",
          inclusive: "القيمة المدخلة غير صالحة",
          not_inclusive: "القيمة المدخلة غير صالحة",
        },
        date: {
          exact: "يجب أن يكون التاريخ {{- minimum, datetime}}",
          inclusive:
            "يجب أن يكون التاريخ أكبر من أو يساوي {{- minimum, datetime}}",
          not_inclusive: "يجب أن يكون التاريخ أكبر من {{- minimum, datetime}}",
        },
      },
      too_big: {
        array: {
          exact: "يجب ان ترسل {{minimum}} عنصر بالضبط",
          inclusive: "يجب ان ترسل {{minimum}} عنصر كحد أقصى",
          not_inclusive: "يجب ان ترسل أقل من {{minimum}} عنصر",
        },
        string: {
          exact: "يجب أن يحتوي النص على {{minimum}} حرف بالضبط",
          inclusive: "يجب أن يحتوي النص على {{minimum}} حرف كحد أقصى",
          not_inclusive: "يجب أن يحتوي النص على أقل من {{minimum}} حرف",
        },
        number: {
          exact: "يجب أن يكون الرقم {{maximum}}",
          inclusive: "يجب أن يكون الرقم أقل من أو يساوي {{maximum}}",
          not_inclusive: "يجب أن يكون الرقم أقل من {{maximum}}",
        },
        set: {
          exact: "القيمة المدخلة غير صالحة",
          inclusive: "القيمة المدخلة غير صالحة",
          not_inclusive: "القيمة المدخلة غير صالحة",
        },
        date: {
          exact: "يجب أن يكون التاريخ {{- minimum, datetime}}",
          inclusive:
            "يجب أن يكون التاريخ أصغر من أو يساوي {{- minimum, datetime}}",
          not_inclusive: "يجب أن يكون التاريخ أصغر من {{- minimum, datetime}}",
        },
      },
    },
    fields: {
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      password: "الرمز السري",
      confirmPassword: "تأكيد الرمز السري",
    },
    validations: {
      email: "البريد الإلكتروني",
      url: "الرابط",
      uuid: "uuid",
      cuid: "cuid",
      regex: "النمط المنتظم",
      datetime: "التاريخ والوقت",
    },
    types: {
      function: "دالة",
      number: "رقم",
      string: "نص",
      nan: "مدخل غير رقمي",
      integer: "عدد صحيح",
      float: "عدد عشري",
      boolean: "قيمة منطقية",
      date: "تاريخ",
      bigint: "عدد صحيح كبير",
      undefined: "غير معرف",
      symbol: "رمز",
      null: "قيمة فارغة",
      array: "مصفوفة",
      object: "كائن",
      unknown: "غير معروف",
      promise: "برومس/وعد",
      void: "بدون قيمة",
      never: "أبداً",
      map: "ماب/خريطة",
      set: "مجموعة",
    },
  },
} as const;

export type zodCustomErrors = keyof typeof arabicTranslation.zod.custom;
