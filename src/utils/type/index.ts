declare global {
  type OmitStrict<ObjectType, KeysType extends keyof ObjectType> = Pick<
    ObjectType,
    Exclude<keyof ObjectType, KeysType>
  >;

  type Complete<T> = {
    [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>>
      ? T[P]
      : T[P] | undefined;
  };

  type DateString = string;
  type numericString = string;
}
