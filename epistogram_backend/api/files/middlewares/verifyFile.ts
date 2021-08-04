import {Request, Response, NextFunction} from "express";

export const verifyFile = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    if (req.files!.file) {
        return false
    } else {
        return true
    }

}
