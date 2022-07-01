import { UserPermissionDTO } from '../dtos/role/UserPermissionDTO';
import { UserRoleDTO } from '../dtos/role/UserRoleDTO';
import { CourseItemSimpleType, PasswordValidationIssueType } from '../types/sharedTypes';

export const validatePassowrd = (password: string, passwordControl: string): PasswordValidationIssueType | null => {

    if (!password || password === '')
        return 'passwordIsEmpty';

    if (!passwordControl || passwordControl === '')
        return 'controlPasswordIsEmpty';

    if (passwordControl !== password)
        return 'doesNotMatchControlPassword';

    if (password.length < 6)
        return 'tooShort';

    if (password.length > 30)
        return 'tooLong';

    if (!textContainsNumber(password))
        return 'hasNoNumber';

    return null;
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
        .keys(obj)
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

export const userRolesEqual = (a: UserRoleDTO, b: UserRoleDTO) => {

    if (a.roleId !== b.roleId)
        return false;

    if (a.contextCompanyId !== b.contextCompanyId)
        return false;

    if (a.assigneeUserId !== b.assigneeUserId)
        return false;

    return true;
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