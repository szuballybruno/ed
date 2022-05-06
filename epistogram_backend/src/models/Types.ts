export type ParsableValueType = 'number' | 'string' | 'any';

export declare type ClassType<T> = {
    new(): T;
};

export type ConstructorSignature<T> = { new(p1?: any, p2?: any, p3?: any, p4?: any, p5?: any, p6?: any, p7?: any): T };

export type RegistrationType = 'ActivationCode' | 'PublicRegistrationToken' | 'Invitation';

export type TaskCodeType = 'user_progress_evaluation';

