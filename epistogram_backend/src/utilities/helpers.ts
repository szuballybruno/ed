import { Request } from 'express';
import { UploadedFile } from 'express-fileupload';
import { ParsableValueType } from '../models/Types';
import { ClassType } from '../services/misc/advancedTypes/ClassType';
import { User } from '../models/entity/User';
import { VerboseError } from '../shared/types/VerboseError';
import { KeyofConstrained } from './misc';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const getFullName = (user: User) => toFullName(user.firstName, user.lastName);

export const toFullName = (firstName: string, lastName: string, culture?: 'en' | 'hu') => {

    if (culture === 'hu')
        return `${lastName} ${firstName}`;

    return `${firstName} ${lastName}`;
};

export const getJoinColumnName = <T>(c: ClassType<T>, prop: KeyofConstrained<T, number | null>) => {

    return {
        name: toSQLSnakeCasing(prop as string)
    };
};

export const getJoinColumnInverseSide = <TCurrent>() => <TOther>(fn: (other: TOther) => TCurrent): ((other: TOther) => TCurrent) => {

    return fn;
};

export function replaceAll(originalText: string, searchText: string, replaceText: string) {

    const result = originalText
        .split(searchText)
        .join(replaceText);

    return result;
}

export const throwNotImplemented = () => {

    throw new Error('Not implemented!');
};

export const toSQLSnakeCasing = (name: string) => {

    return name.split(/(?=[A-Z])/)
        .join('_')
        .toLowerCase();
};

export const forN = <T>(iterations: number, action: (index: number) => T) => {

    const returnValues = [] as T[];
    for (let index = 0; index < iterations; index++) {

        returnValues.push(action(index));
    }

    return returnValues;
};

type SafeObjectValidatorFunctionType<TValue> = (value: TValue) => boolean;

type SaveObjCastType =
    | 'string' | 'int' | 'float' | 'boolean'
    | 'string[]' | 'int[]' | 'float[]' | 'boolean[]'
    | 'custom';

export class SafeObjectWrapper<TObject> {

    data: TObject;

    constructor(data: TObject) {

        this.data = data;
    }

    /**
     * Get value or null
     */
    getValueOrNull<TValue>(getter: (data: TObject) => TValue, castType: SaveObjCastType, fn?: SafeObjectValidatorFunctionType<TValue>): TValue | null {

        if (getter(this.data) === undefined || getter(this.data) === null)
            return null;

        return this.getValueCore(getter, castType, fn);
    }

    /**
     * Get value
     */
    getValue(getter: (data: TObject) => string, castTypeOrFn: 'string'): string;
    getValue(getter: (data: TObject) => string[], castTypeOrFn: 'string[]'): string[];
    getValue(getter: (data: TObject) => number, castTypeOrFn: 'int'): number;
    getValue(getter: (data: TObject) => number[], castTypeOrFn: 'int[]'): number[];
    getValue(getter: (data: TObject) => number, castTypeOrFn: 'float'): number;
    getValue(getter: (data: TObject) => number[], castTypeOrFn: 'float[]'): number[];
    getValue(getter: (data: TObject) => boolean, castTypeOrFn: 'boolean'): boolean;
    getValue(getter: (data: TObject) => boolean[], castTypeOrFn: 'boolean[]'): boolean[];
    getValue<TValue>(getter: (data: TObject) => TValue, castType: 'custom', fn: SafeObjectValidatorFunctionType<TValue>): TValue;
    getValue<TValue>(getter: (data: TObject) => TValue, castType: SaveObjCastType, fn?: SafeObjectValidatorFunctionType<TValue>): TValue {

        return this.getValueCore(getter, castType, fn);
    }

    private getValueCore<TValue>(getter: (data: TObject) => TValue, castType: SaveObjCastType, fn?: SafeObjectValidatorFunctionType<TValue>): any {

        const value = withValueOrBadRequest<any>(getter(this.data));

        if (castType === 'string[]')
            return this.parseArray(value, x => x);

        if (castType === 'int')
            return parseInt(value);

        if (castType === 'int[]')
            return this.parseArray(value, x => parseInt(x));

        if (castType === 'float')
            return parseFloat(value);

        if (castType === 'float[]')
            return this.parseArray(value, x => parseFloat(x));

        if (castType === 'boolean')
            return this.parseBoolean(value);

        if (castType === 'boolean[]')
            return this.parseArray(value, x => this.parseBoolean(x));

        if (castType === 'custom') {
            const isValid = fn!(value);
            if (!isValid)
                throw new Error('Validator function failed on value in safe object.');
        }

        return value;
    }

    private parseArray<T>(arr: any, fn: (x: any) => T) {

        return arr as T[];
    }

    private parseBoolean(value: any) {

        if (value === true || value === false)
            return value;

        if (value !== 'true' && value !== 'false')
            throw new Error('Error parsing boolean value: ' + value);

        return (value === 'true');
    }
}

export const getRandomNumber = () => {

    return Math.random();
};

export const toSqlDate = (date: Date) => {

    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`;
};

export const trimTimeFromDate = (date: Date) => {

    date.setHours(0, 0, 0, 0);
    return date;
};

/** 
 * This will shift the Date with the UTC offset, 
 * so JS will think it's a UTC date, and won't convert it again. 
 * @param date 
 * @returns 
 **/
export const fakeUtcShiftDate = (date: Date) => {

    const now_utc = Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds());

    return new Date(now_utc);
};

export const navPropNotNull = (prop: any) => {

    withValue(prop, () => { throw new Error('Navigation property was null, or undefined. This could be caused by an improper or missing join.'); });
};

export const hasValue = (obj: any) => {

    if (obj === '')
        return false;

    if (obj === undefined)
        return false;

    if (obj === null)
        return false;

    return true;
};

export const withValue = <T>(obj: T, errorFunc?: () => void) => {

    if (!errorFunc)
        errorFunc = () => { throw new Error('Object has no value!'); };

    if (!hasValue(obj))
        errorFunc();

    return obj;
};

export const parseType = (obj: any, type: ParsableValueType) => {

    if (type === 'number')
        return parseInt(obj);

    if (type === 'string')
        return '' + obj;

    return obj;
};

export const requestHasFiles = (req: Request) => {

    return !!req.files;
};

export const getSingleFileFromRequest = (req: Request) => {

    if (!req.files)
        throw new VerboseError('Request contains no files.', 'bad request');

    // TODO multiple file error check

    return req.files.file as UploadedFile;
};

export const withValueOrBadRequest = <T>(obj: any, type?: ParsableValueType) => {

    const objWithValue = withValue<T>(obj, () => {

        throw new VerboseError('Requied field has no value!', 'bad request');
    });

    return parseType(objWithValue, type ?? 'any') as T;
};

export const sleepAsync = (seconds: number) => {

    return new Promise<void>((resolve, reject) => {

        const handler = () => {

            console.log('Timeout is over.');
            resolve();
        };

        console.log(`Timeout set for ${seconds}s.`);
        setTimeout(handler, seconds * 1000);
    });
};

export const getBearerTokenFromRequest = (req: Request) => {

    const authHeader = req.headers.authorization;
    return authHeader?.split(' ')[1];
};

export const getCookies = (req: Request) => {

    const cookieString = (req.headers.cookie as string);
    if (!cookieString)
        return [];

    return cookieString
        .split('; ')
        .map(x => ({
            key: x.split('=')[0],
            value: x.split('=')[1]
        }));
};

export const getCookie = (req: Request, key: string) => {

    return getCookies(req)
        .filter(x => x.key === key)[0]?.value as string | null;
};

export const getAuthCookies = (req: Request) => {

    return {
        accessToken: getCookie(req, 'accessToken'),
        refreshToken: getCookie(req, 'refreshToken')
    };
};

/**
 * Make all properties in T optional
 */
export declare type OptionalEntity<TObject> = {
    [TProperty in keyof TObject]?: TObject[TProperty] | (() => string);
};

/**
 * Make all properties in T optional. Deep version.
 */
export declare type DeepOptionalEntity<TObject> = {
    [TProperty in keyof TObject]?: (TObject[TProperty] extends Array<infer U>
        ? Array<DeepOptionalEntity<U>>
        : TObject[TProperty] extends ReadonlyArray<infer U>
        ? ReadonlyArray<DeepOptionalEntity<U>>
        : DeepOptionalEntity<TObject[TProperty]>) | (() => string);
};