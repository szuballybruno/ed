import { Request } from 'express';
import { UploadedFile } from 'express-fileupload';
import { User } from '../models/entity/User';
import { ParsableValueType } from '../models/Types';
import { ClassType } from '../services/misc/advancedTypes/ClassType';
import { ErrorWithCode } from '../shared/types/ErrorWithCode';
import { Id } from '../shared/types/versionId';
import { KeyofConstrained } from './misc';

export const snoozeAsync = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getFullName = (user: User) => toFullName(user.firstName, user.lastName);

export const toFullName = (firstName: string, lastName: string, culture?: 'en' | 'hu') => {

    if (culture === 'hu')
        return `${lastName} ${firstName}`;

    return `${firstName} ${lastName}`;
};

export const getJoinColumnName = <T>(c: ClassType<T>, prop: KeyofConstrained<T, Id<any> | null>) => {

    return {
        name: toSQLSnakeCasing(prop as string)
    };
};

export const getJoinColumnInverseSide = <TCurrent>() => {

    return <TOther>(fn: (other: TOther) => TCurrent): ((other: TOther) => TCurrent) => {

        return fn;
    };
};

export function replaceAll(originalText: string, searchText: string, replaceText: string) {

    const result = originalText
        .split(searchText)
        .join(replaceText);

    return result;
}

export const throwNotImplemented = () => {

    throw new Error('Not implemented!');
    return {} as any;
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
    | 'custom'
    | 'any[]';

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
    getValue<TId extends String>(getter: (data: TObject) => Id<TId>, castTypeOrFn: 'int'): Id<TId>;
    getValue<TId extends String>(getter: (data: TObject) => Id<TId>[], castTypeOrFn: 'int[]'): Id<TId>[];
    getValue<TValue>(getter: (data: TObject) => TValue[], castTypeOrFn: 'any[]'): TValue[];
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

        if (castType === 'any[]') {

            if (!Array.isArray(value))
                throw new Error('Expected type is array but value is of a different type.');

            return value;
        }

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

/** This will shift the Date with the UTC offset, 
 * so JS will think it's a UTC date, and won't convert it again. 
  */
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

/**
 * Gets the difference between two dates in days
 * @param date1 First date
 * @param date2 Second date
 */
export const dateDiffInDays = (date1: Date, date2: Date) => {

    // Discard the time and time-zone information.
    const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

    const timeDiff = Math.floor(utc2 - utc1);
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return daysDiff;
};

/**
 * Adds days to the specified date
 * @param date Date
 * @param number Number of days to be added
 */
export const addDays = (date: Date, number: number) => {

    const newDate = new Date(date);

    return new Date(newDate.setDate(newDate.getDate() + number));
};

/**
 * Calculates the difference in percentage between
 * two numbers
 * @param a
  */
export const relativeDiffInPercentage = (a: number, b: number) => {
    return -100 * (a - b) / ((a + b) / 2);
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
        throw new ErrorWithCode('Request contains no files.', 'bad request');

    // TODO multiple file error check

    return req.files.file as UploadedFile;
};

export const withValueOrBadRequest = <T>(obj: any, type?: ParsableValueType) => {

    const objWithValue = withValue<T>(obj, () => {

        throw new ErrorWithCode('Requied field has no value!', 'bad request');
    });

    return parseType(objWithValue, type ?? 'any') as T;
};

export const filterByProperty = <T extends Object, TKeyField extends keyof T>(
    arr: T[],
    searchKey: TKeyField,
    searchTerm: string | boolean | number | null
) => {

    if (searchTerm === null)
        return arr;

    if (searchTerm === false)
        return arr;

    return arr.filter(x => {

        const value = x[searchKey];

        if (typeof value === 'string' && typeof searchTerm === 'string')
            return value.toString()
.toLowerCase()
.includes(searchTerm.toLowerCase());

        if (typeof value === 'boolean' && typeof searchTerm === 'boolean')
            return value === searchTerm;

        if (typeof value === 'number' && typeof searchTerm === 'number')
            return value === searchTerm;
    });
};

export const orderByProperty = <T extends Object, TKeyField extends keyof T>(
    arr: T[],
    key: TKeyField,
    direction: 'asc' | 'desc'
) => {

    const sortByProperty = (key: TKeyField, direction: 'asc' | 'desc') => {
        return (a: T, b: T) => {

            const aValue = a[key];
            const bValue = b[key];

            if (typeof aValue !== 'string' || typeof bValue !== 'string')
                return 0;

            const aProp = aValue.toString()
.toLowerCase();
            const bProp = bValue.toString()
.toLowerCase();

            if (aProp < bProp && direction === 'asc')
                return -1;

            if (aProp < bProp && direction === 'desc')
                return 1;

            if (aProp > bProp && direction === 'asc')
                return 1;

            if (aProp > bProp && direction === 'desc')
                return -1;

            return 0;
        };
    };

    return arr.sort(sortByProperty(key, direction));
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