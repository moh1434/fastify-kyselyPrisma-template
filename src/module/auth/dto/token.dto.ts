import { Roles } from "../../../db/types.js";

export interface TokenCreatePayload {
  id: string;
  phone?: string | null;
  verifiedPhone?: boolean | null;
  role: Roles;
}
export interface TokenPayload extends TokenCreatePayload {
  iat: number;
  exp: number;
}
