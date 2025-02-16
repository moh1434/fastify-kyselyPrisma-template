import { ZodIssue } from "zod";

export interface FastifyValidationError {
  statusCode: number;
  code: "FST_ERR_VALIDATION";
  validation: {
    keyword: string;
    instancePath: string;
    schemaPath: string;
    params: {
      issue: ZodIssue & {
        code: any;
        expected?: any;
        received?: any;
      };
    };
    message: string;
  }[];
  validationContext?: string;
}
