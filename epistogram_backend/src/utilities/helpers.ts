import { log } from 'console';
import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { User } from '../models/entity/User';
import { ClassType, ParsableValueType } from '../models/DatabaseTypes';
import { GlobalConfiguration } from '../services/misc/GlobalConfiguration';
import { logError, logSecondary } from '../services/misc/logger';
import { typecheck } from '../shared/logic/sharedLogic';
import { ErrorCodeType } from '../shared/types/sharedTypes';

export const getFullName = (user: User) => toFullName(user.firstName, user.lastName);

export const toFullName = (firstName: string, lastName: string, culture?: 'en' | 'hu') => {

    if (culture === 'hu')
        return `${lastName} ${firstName}`;

    return `${firstName} ${lastName}`;
};

export const getJoinColumnName = <T>(c: ClassType<T>, prop: keyof T) => {

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

// TODO REMOVE THIS FROM HERE 
export class ActionParams {
    req: Request;
    res: Response;
    currentUserId: number;
    isMultipart: boolean;

    constructor(
        req: Request,
        res: Response,
        userId: number,
        isMultipart: boolean) {

        this.isMultipart = isMultipart;
        this.req = req;
        this.res = res;
        this.currentUserId = userId;
    }

    getBody<T = any>(notNullOrUndefined: (keyof T)[] = []) {

        if (this.isMultipart) {

            const bodyJson = withValueOrBadRequest<string>(this.req.body.document);
            const body = JSON.parse(bodyJson);
            return new SafeObjectWrapper<T>(body);
        }
        else {

            if (this.req.body.document)
                logSecondary('--- WARNING: body has a document property, this might mean it\'s not a JSON payload, but a multipart form data!');

            const body = withValueOrBadRequest<T>(this.req.body);

            const nullOrUndefProps = notNullOrUndefined
                .filter(x => !body[x]);

            if (nullOrUndefProps.length > 0)
                throw new Error(`Null or undefined properties found on object: [${nullOrUndefProps.join(', ')}]!`);

            return new SafeObjectWrapper<T>(body);
        }
    }

    getQuery<T = any>() {

        const query = withValueOrBadRequest<T>(this.req.query);
        return new SafeObjectWrapper<T>(query);
    }

    getFiles() {

        return this.req.files;
    }

    getSingleFile() {

        const file = this.req.files?.file;
        return (file ? file : undefined) as UploadedFile | undefined;
    }

    getSingleFileOrFail() {

        const file = this.req.files?.file;
        if (!file)
            throw new ErrorCode('File not sent!', 'bad request');

        return file as UploadedFile;
    }
}

type SafeObjectValidatorFunctionType<TValue> = (value: TValue) => boolean;

export class SafeObjectWrapper<TObject> {

    data: TObject;

    constructor(data: TObject) {

        this.data = data;
    }

    getValueOrNull<TValue>(getter: (data: TObject) => TValue, castType?: 'int' | 'float' | 'boolean'): TValue | null {

        if (getter(this.data) === undefined || getter(this.data) === null)
            return null;

        return this.getValue(getter, castType);
    }

    getValue<TValue>(getter: (data: TObject) => TValue, castTypeOrFn?: 'int' | 'float' | 'boolean' | SafeObjectValidatorFunctionType<TValue>): TValue {

        const value = withValueOrBadRequest<any>(getter(this.data));

        if (typecheck(castTypeOrFn, 'function')) {

            const validatorFn = castTypeOrFn as SafeObjectValidatorFunctionType<TValue>;
            const isValid = validatorFn(value);
            if (!isValid)
                throw new Error('Validator function failed on value in safe object.');

        } else {

            if (castTypeOrFn === 'int')
                return parseInt(value as any as string) as any;

            if (castTypeOrFn === 'float')
                return parseFloat(value as any as string) as any;

            if (castTypeOrFn === 'boolean') {

                if (value === true || value === false)
                    return value;

                if (value !== 'true' && value !== 'false')
                    throw new Error('Error parsing boolean value: ' + value);

                return (value === 'true') as any;
            }
        }

        return value;
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
        throw new ErrorCode('Request contains no files.', 'bad request');

    // TODO multiple file error check

    return req.files.file as UploadedFile;
};

export const withValueOrBadRequest = <T>(obj: any, type?: ParsableValueType) => {

    const objWithValue = withValue<T>(obj, () => {

        throw new ErrorCode('Requied field has no value!', 'bad request');
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

export const getCookie = (req: Request, key: string) => getCookies(req)
    .filter(x => x.key === key)[0];

export const getAuthTokenFromRequest = (req: Request, config: GlobalConfiguration) => getCookie(req, config.misc.accessTokenCookieName)?.value;

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

export class ErrorCode extends Error {

    code: ErrorCodeType;

    constructor(msg: string, code: ErrorCodeType) {

        super(msg);

        this.code = code;
    }

    toString() {
        return `${this.code}: ${this.message}`;
    }
}