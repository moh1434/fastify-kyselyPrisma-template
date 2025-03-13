import type {
  Kysely,
  ColumnType,
  InsertObject,
  ExpressionBuilder,
} from "kysely";
import { DB } from "../../db/types.js";

export type KyselyDB = Kysely<DB>;

// Extracts the actual type from ColumnType<T, I, U>
type ExtractColumnType<T> = T extends ColumnType<infer S, any, any> ? S : T;

// Converts snake_case to camelCase
type SnakeToCamel<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamel<U>>}`
  : S;

// Generic type to convert any table type
export type DbType<T> = {
  [K in keyof T as SnakeToCamel<K & string>]: ExtractColumnType<T[K]>;
};
type InsertObjectOrList<DB, TB extends keyof DB> =
  | InsertObject<DB, TB>
  | ReadonlyArray<InsertObject<DB, TB>>;
type InsertObjectOrListFactory<
  TB extends keyof DB,
  UT extends keyof DB = never,
> = (eb: ExpressionBuilder<DB, TB | UT>) => InsertObjectOrList<DB, TB>;

export type InsertExpression<
  TB extends keyof DB,
  UT extends keyof DB = never,
> = InsertObjectOrList<DB, TB> | InsertObjectOrListFactory<TB, UT>;
