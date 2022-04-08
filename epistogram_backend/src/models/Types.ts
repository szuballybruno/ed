export type ParsableValueType = 'number' | 'string' | 'any';

export declare type ClassType<T> = {
    new(): T;
} | Function;

export type RegistrationType = 'ActivationCode' | 'PublicRegistrationToken' | 'Invitation';

export type TaskCodeType = 'user_progress_evaluation';