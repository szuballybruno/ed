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
export const respondInternalServerError = (req: ExpressRequest, res: ExpressResponse, error: any) => { logError(error); res.sendStatus(500); };

export type IdType = string;
