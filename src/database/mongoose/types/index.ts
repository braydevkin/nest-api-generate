// eslint-disable-next-line @typescript-eslint/ban-types
export type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

export type NonMongooseExtendedProperties<T> = Omit<
    NonFunctionProperties<T>,
    '_id' | 'errors' | 'isNew' | 'schema' | '$locals' | 'db'
>;
