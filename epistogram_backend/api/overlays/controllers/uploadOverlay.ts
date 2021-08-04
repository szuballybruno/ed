import { Connection } from '../../../services/connectMongo'
import {responseReducer} from '../../../services/responseReducer'
import {Request, Response, NextFunction} from "express";


export const uploadOverlay = (req: Request, res: Response, next: NextFunction) => {
    const insertData = async () => {
        return Connection.db.collection("overlays").insertOne(req.body).then((r: any) => {
            return responseReducer(200, "Adatok hozzáadva az adatbázishoz " + r)
        }).catch((e: any) => {
            return responseReducer(400, "Az adatok hozzáadása sikertelen" + e)
        })
    }
    insertData().then((r) => {
        res.status(r.responseStatus).send(r.responseText)
    }).catch(next);
};