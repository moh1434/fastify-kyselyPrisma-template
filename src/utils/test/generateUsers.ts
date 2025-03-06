import { User } from "../../db/types.js";
import { DbType } from "../type/kysely.js";
import { getEmail } from "./generateEmail.js";
import { getImageUrl } from "./generateImageUrl.js";
import { getName } from "./generateNames.js";
import { getPhone } from "./generatePhones.js";

import { getId } from "./generateUUIDs.js";
const index = { id: 0, phone: 0, fullName: 0, email: 0, image: 0 };
const date = new Date("2025-01-06T08:11:11.111Z");

// "testTest",
export const defaultTestPassword =
  "$argon2id$v=19$m=65536,t=3,p=4$Oo22R0fT3S4c+HbbRvR3vg$Mu6N5WrZVHV6gdKauW/BvZoUbjaD0TjO0lG8HOwlGkU";
export function generateUser(custom?: Partial<DbType<User>>): DbType<User> {
  return {
    role: custom?.role === undefined ? "MEMBER" : custom?.role,
    id: custom?.id === undefined ? getId(index.id++) : custom?.id,
    phone:
      custom?.phone === undefined ? getPhone(index.phone++) : custom?.phone,
    fullName:
      custom?.fullName === undefined
        ? getName(index.fullName++)
        : custom?.fullName,
    password:
      custom?.password === undefined ? defaultTestPassword : custom?.password,
    email:
      custom?.email === undefined ? getEmail(index.email++) : custom?.email,
    image:
      custom?.image === undefined ? getImageUrl(index.image++) : custom?.image,
    verifiedPhone:
      custom?.verifiedPhone === undefined ? true : custom?.verifiedPhone,
    createdAt: custom?.createdAt === undefined ? date : custom?.createdAt,
    updatedAt: custom?.updatedAt === undefined ? date : custom?.updatedAt,
    deletedAt: custom?.deletedAt === undefined ? null : custom?.deletedAt,
  };
}
