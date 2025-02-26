import { User } from "../../db/types.js";
import { DbType } from "../type/kysely.js";
import { getImageUrl } from "./generateImageUrl.js";
import { generateName } from "./generateNames.js";
import { getPhone } from "./generatePhones.js";

import { getId } from "./getIds.js";

const now = new Date();

// "testTest",
const defaultPassword =
  "$argon2id$v=19$m=65536,t=3,p=4$Oo22R0fT3S4c+HbbRvR3vg$Mu6N5WrZVHV6gdKauW/BvZoUbjaD0TjO0lG8HOwlGkU";
export function generateUser(custom?: Partial<DbType<User>>): DbType<User> {
  return {
    role: custom?.role || "MEMBER",
    id: custom?.id || getId(),
    phone: custom?.phone || getPhone(),
    fullName: custom?.fullName || generateName(),
    password: custom?.password || defaultPassword,
    email: custom?.email || "test@gmail.com",
    image: custom?.image || getImageUrl(),
    verifiedPhone:
      custom?.verifiedPhone === undefined ? true : custom?.verifiedPhone,
    createdAt: custom?.createdAt || now,
    updatedAt: custom?.updatedAt || now,
    deletedAt: custom?.deletedAt || null,
  };
}
