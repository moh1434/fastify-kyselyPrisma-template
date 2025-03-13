import type { ColumnType } from "kysely";
export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export const Roles = {
  ADMIN: "ADMIN",
  MEMBER: "MEMBER",
} as const;
export type Roles = (typeof Roles)[keyof typeof Roles];
export type User = {
  id: Generated<string>;
  role: Roles;
  fullName: string;
  phone: string;
  verifiedPhone: Generated<boolean>;
  password: string;
  image: string | null;
  email: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt: Timestamp | null;
};
export type DB = {
  User: User;
};
