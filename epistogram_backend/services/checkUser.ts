import {Request, Response, NextFunction} from "express";

const { Connection } = require('./connectMongo')

export const checkUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await Connection.db.collection("users").findOne({"userData.email": req.body.email})
        if (user) {
            throw new Error('User already exist, please login instead.');
        }
    } catch (err) {
        throw new Error('Signing up failed, please try again later.' + err);
    }
}