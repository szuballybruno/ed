export type ParsableValueType = 'number' | 'string' | 'any';

export declare type ClassType<T> = {
    new(): T;
};

export type RegistrationType = 'ActivationCode' | 'PublicRegistrationToken' | 'Invitation';

export type TaskCodeType = 'user_progress_evaluation';

export type PermissionCodeType =
    | 'canSetInvitedUserCompany'
    | 'canAccessCourseAdministration'
    | 'canAccessAdministration'
    | 'canAccessApplication'
    | 'canAccessShopAdministration'
    | 'canChangeCourseMode';