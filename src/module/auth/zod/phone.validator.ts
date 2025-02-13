import z from "zod";

export const iraqPhoneValidator = z.string().transform((val, ctx) => {
  // 7712345678
  if (val.length == 10 && !val.startsWith("0") && !val.startsWith("+964")) {
    return `+964${val}`;
  }
  // +9647712345678
  if (val.length == 14 && val.startsWith("+964")) {
    return val;
  }
  // 07712345678
  if (val.length == 11 && val.startsWith("0")) {
    return `+964${val.substring(1)}`;
  }
  // +96407712345678
  if (val.length == 15 && val.startsWith("+9640")) {
    return `+964${val.substring(5)}`;
  }
  // any other case is error
  ctx.addIssue({
    code: "custom",
    i18n: "invalid_phone_number",
  });
  // to make the type string not string | undefined
  return "";
});
