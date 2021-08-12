import express from "express";
import { log, logError } from "../services/logger";

export type ExpressRequest = express.Request;
export type ExpressResponse = express.Response;
export type ExpressNext = () => void;

export const respondOk = (req: ExpressRequest, res: ExpressResponse, data?: any) => {

    data
        ? res.sendStatus(200).json(data)
        : res.sendStatus(200);
};

export const respondForbidden = (req: ExpressRequest, res: ExpressResponse) => { res.sendStatus(403); };
export const respondBadRequest = (req: ExpressRequest, res: ExpressResponse) => { res.sendStatus(400); };
export const respondInternalServerError = (req: ExpressRequest, res: ExpressResponse, error: any) => {

    logError("Responding Internal Server Error (500). Error: ");
    logError(error);
    res.sendStatus(500);
};

export const getCookies = (req: ExpressRequest) => {

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

export const getCookie = (req: ExpressRequest, key: string) => getCookies(req).filter(x => x.key == key)[0];

