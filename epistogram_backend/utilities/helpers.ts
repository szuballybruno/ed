import express from "express";

export type ExpressRequest = express.Request;
export type ExpressResponse = express.Response;
export type ExpressNext = () => void;

export const respondOk = (req: ExpressRequest, res: ExpressResponse) => { res.sendStatus(200); };
export const respondForbidden = (req: ExpressRequest, res: ExpressResponse) => { res.sendStatus(403); };
export const respondBadRequest = (req: ExpressRequest, res: ExpressResponse) => { res.sendStatus(400); };

export type IdType = string;
