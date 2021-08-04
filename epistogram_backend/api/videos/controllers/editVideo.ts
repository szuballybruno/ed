import {Connection} from "../../../services/connectMongo";
import {responseReducer} from "../../../services/responseReducer";
import { Request, Response, NextFunction } from "express";
import { ObjectID } from "mongodb";
import {flattenObject} from "../../../services/flattenObject";


export const editVideo = (req: Request, res: Response, next: NextFunction) => {
    const updateData = async () => {
        //FindOneAndUpdate
        try {
            await Connection.db.collection("videos").updateOne({"_id": new ObjectID(req.params.itemId)}, {
                $set: flattenObject(req.body)
            })
        } catch (e) {
            throw new Error("Shit heppönsz" + e.toString())
        }
        return responseReducer(201, "Az adatok frissítése sikeres!")
    }
    updateData().then((r) => {
        res.status(r.responseStatus).send(r.responseText)
    }).catch(next)
}
