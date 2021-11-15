export type ParsableValueType = "number" | "string" | "any";

export declare type ClassType<T> = {
    new(): T;
} | Function;