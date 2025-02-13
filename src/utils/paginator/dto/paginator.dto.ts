import { z } from "zod";

const skipTakeSchema = z.object({
  skip: z.coerce.number().int().min(0),
  take: z.coerce.number().int().min(0),
});

const pagePerPageSchema = z.object({
  page: z.coerce.number().int().min(0),
  perPage: z.coerce.number().int().min(1),
});

/** usage methods:
 * 1) {skip:10, take:10}
 * 2) {page:2, perPage:10}
 * 3) undefined => return all data, try to avoid using this.
 */
const paginatorDto = z
  .union([skipTakeSchema, pagePerPageSchema])
  .superRefine((data, ctx) => {
    const keys = Object.keys(data);
    const isSkipTake = keys.includes("skip") || keys.includes("take");
    const isPagePerPage = keys.includes("page") || keys.includes("perPage");

    if (isSkipTake && isPagePerPage) {
      ctx.addIssue({
        code: "custom",
        i18n: "invalid_pagination_input",
      });
    }
  })
  .optional();

export type paginatorDto = z.infer<typeof paginatorDto>;
