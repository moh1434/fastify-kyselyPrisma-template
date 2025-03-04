import { User } from "../../db/types.js";
import { DbType } from "../type/kysely.js";
import { getEmail } from "./generateEmail.js";
import { getImageUrl } from "./generateImageUrl.js";
import { getName } from "./generateNames.js";
import { getPhone } from "./generatePhones.js";

import { getId } from "./generateUUIDs.js";

const now = new Date();

// "testTest",
const defaultPassword =
  "$argon2id$v=19$m=65536,t=3,p=4$Oo22R0fT3S4c+HbbRvR3vg$Mu6N5WrZVHV6gdKauW/BvZoUbjaD0TjO0lG8HOwlGkU";
export function generateUser(custom?: Partial<DbType<User>>): DbType<User> {
  return {
    role: custom?.role === undefined ? "MEMBER" : custom?.role,
    id: custom?.id === undefined ? getId() : custom?.id,
    phone: custom?.phone === undefined ? getPhone() : custom?.phone,
    fullName: custom?.fullName === undefined ? getName() : custom?.fullName,
    password:
      custom?.password === undefined ? defaultPassword : custom?.password,
    email: custom?.email === undefined ? getEmail() : custom?.email,
    image: custom?.image === undefined ? getImageUrl() : custom?.image,
    verifiedPhone:
      custom?.verifiedPhone === undefined ? true : custom?.verifiedPhone,
    createdAt: custom?.createdAt === undefined ? now : custom?.createdAt,
    updatedAt: custom?.updatedAt === undefined ? now : custom?.updatedAt,
    deletedAt: custom?.deletedAt === undefined ? null : custom?.deletedAt,
  };
}
