import {Request, Response, NextFunction} from "express";

export const checkRequest = (req: Request, res: Response, next: NextFunction, requestData: string[]) => {
    let reqBodyType: "query" | "body";
    if (req.route.methods.put || req.route.methods.patch || req.route.methods.post) {
        reqBodyType = "body"
    } else if (!req.route.methods.post) {
        reqBodyType = "query"
    }
    requestData.map((data) => {
        if (req[reqBodyType][data] === null || undefined || "") {
            throw new Error("Nincs megadva " + data)
        }
    })
}
