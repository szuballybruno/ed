import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { User } from "../models/entity/User";
import { ErrorType } from "../models/shared_models/types/sharedTypes";
import { ParsableValueType } from "../models/Types";
import { logError } from "../services/misc/logger";
import { respond, respondError } from "./apiHelpers";

export const getFullName = (user: User) => toFullName(user.firstName, user.lastName);

export const toFullName = (firstName: string, lastName: string) => `${firstName} ${lastName}`;

export function replaceAll(str: string, find: string, replace: string) {
    return str.replace(new RegExp(find, 'g'), replace);
}

export const throwNotImplemented = () => {

    throw new Error("Not implemented!");
}

// TODO REMOVE THIS FROM HERE 
export type ActionParamsType = { req: Request, res: Response, next: NextFunction, userId: number };

// TODO REMOVE THIS FROM HERE 
export const getAsyncActionHandler = (wrappedAction: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {

    const wrapperFunction = (req: Request, res: Response, next: NextFunction) => {

        wrappedAction(req, res, next)
            .then((returnValue: any) => respond(res, 200, returnValue))
            .catch((error: any) => {

                logError(error);

                respondError(res, error.message, (error.type ?? "internal server error") as ErrorType);
            });
    }

    return wrapperFunction;
}

export const toSqlDate = (date: Date) => {

    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`;
}

export const trimTimeFromDate = (date: Date) => {

    date.setHours(0, 0, 0, 0);
    return date;
}

/** 
 * This will shift the Date with the UTC offset, 
 * so JS will think it's a UTC date, and won't convert it again. 
 * @param date 
 * @returns 
 **/
export const fakeUtcShiftDate = (date: Date) => {

    var now_utc = Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds());

    return new Date(now_utc);
}

export const navPropNotNull = (prop: any) => {

    withValue(prop, () => { throw new Error("Navigation property was null, or undefined. This could be caused by an improper or missing join.") });
}

export const hasValue = (obj: any) => {

    if (obj === "")
        return false;

    if (obj === undefined)
        return false;

    if (obj === null)
        return false;

    return true;
}

export const withValue = <T>(obj: T, errorFunc?: () => void) => {

    if (!errorFunc)
        errorFunc = () => { throw new Error("Object has no value!"); };

    if (!hasValue(obj))
        errorFunc();

    return obj;
}

export const parseType = (obj: any, type: ParsableValueType) => {

    if (type === "number")
        return parseInt(obj);

    if (type === "string")
        return "" + obj;

    return obj;
}

export const requestHasFiles = (req: Request) => {

    return !!req.files;
}

export const getSingleFileFromRequest = (req: Request) => {

    if (!req.files)
        throw new TypedError("Request contains no files.", "bad request");

    // TODO multiple file error check

    return req.files.file as UploadedFile;
}

export const withValueOrBadRequest = <T>(obj: any, type?: ParsableValueType) => {

    const objWithValue = withValue<T>(obj, () => {

        throw new TypedError("Requied field has no value!", "bad request");
    });

    return parseType(objWithValue, type ?? "any") as T;
};

export const getBearerTokenFromRequest = (req: Request) => {

    const authHeader = req.headers.authorization;
    return authHeader?.split(' ')[1];
}

export const getCookies = (req: Request) => {

    const cookieString = (req.headers.cookie as string);
    if (!cookieString)
        return [];

    return cookieString
        .split('; ')
        .map(x => ({
            key: x.split("=")[0],
            value: x.split("=")[1]
        }));
}

export const getCookie = (req: Request, key: string) => getCookies(req).filter(x => x.key === key)[0];

export class TypedError extends Error {

    type: ErrorType;

    constructor(msg: string, type: ErrorType) {

        super(msg);

        this.type = type;

        logError("Error thrown: " + this.toString());
    }

    toString() {
        return `${this.type}: ${this.message}`;
    }
}