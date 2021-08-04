import {NextFunction, Request, Response} from "express";

export const checkFile = (req: Request, res: Response, next: NextFunction) => {
    const files  = (req as Request).files;
    if (!files || req.method === 'OPTIONS') {
        throw new Error("Hibás kérés")
    } else {

    }
}