import { PasswordValidationIssueType } from '@episto/commontypes';
import { UserPermissionDTO } from '@episto/communication';

export const getPassowrdValidationError = (password: string, passwordControl: string): PasswordValidationIssueType | null => {

    if (!password || password === '')
        return 'passwordIsEmpty';

    if (password.length < 6)
        return 'tooShort';

    if (password.length > 30)
        return 'tooLong';

    if (!textContainsNumber(password))
        return 'hasNoNumber';

    if (passwordControl !== password)
        return 'doesNotMatchControlPassword';

    return null;
};

export const parseIntOrFail = (text: string, name?: string) => {

    const parsed = parseInt(text);

    if (Number.isNaN(parsed))
        throw new Error(`Parsing int param "${name ?? '-'}" failed.`);

    return parsed;
};

export const textContainsNumber = (text: string) => {

    return /\d/.test(text);
};

export const typecheck = (obj: any, type: 'function') => {

    if (type === 'function')
        return typeof obj === 'function';

    return false;
};

export const getKeys = <T>(obj: T): (keyof T)[] => {

    const keys: any[] = [];
    for (const key in obj) {

        keys.push(key as keyof T);
    }

    return keys;
};

export const getKeyValues = <T>(obj: T) => {

    return Object
        .keys(obj as any)
        .map((key) => ({
            key: key as keyof T,
            value: (obj as any)[key]
        }));
};

export const noUndefined = <T>(obj: Partial<T>) => {

    const objAny = obj as any;

    getKeys(obj)
        .forEach(key => {

            if (objAny[key] === undefined)
                delete objAny[key];
        });

    return obj;
};

export const trimChar = (str: string, char: string) => {

    if (str.length < 2)
        return str;

    return str.replace(new RegExp(`^${char}+|${char}+$`, 'g'), '');
};

export const trimEndChar = (str: string, char: string) => {

    if (str.length < 2)
        return str;

    return str.replace(new RegExp(`${char}+$`, 'g'), '');
};

export const userPermissionsEqual = (a: UserPermissionDTO, b: UserPermissionDTO) => {

    if (a.permissionId !== b.permissionId)
        return false;

    if (a.contextCompanyId !== b.contextCompanyId)
        return false;

    if (a.assigneeUserId !== b.assigneeUserId)
        return false;

    if (a.parentRoleId !== b.parentRoleId)
        return false;

    if (a.contextCourseId !== b.contextCourseId)
        return false;

    return true;
};

export const instantiate = <T>(obj: T) => obj;

export const notnull = (obj: any, name: string) => {

    if (obj === null || obj === undefined)
        throw new Error('Object is null or undefined: ' + name);

    return obj;
};