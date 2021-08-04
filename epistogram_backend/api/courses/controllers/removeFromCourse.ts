import {Connection} from "../../../services/connectMongo";
import {responseReducer} from "../../../services/responseReducer";
import { Request, Response, NextFunction } from "express";
import { ObjectID } from "mongodb";
import {flattenObject} from "../../../services/flattenObject";


export const removeFromCourse = (req: Request, res: Response, next: NextFunction) => {
    const updateData = async () => {
        //FindOneAndUpdate
        try {
            await Connection.db.collection("courses").updateOne({"_id": new ObjectID(req.params.courseId)}, {
                $pull: flattenObject(req.body)
            })
        } catch (e) {
            throw new Error("Shit heppönsz" + JSON.stringify(req.body))
        }
        return responseReducer(201, "Az adatok frissítése sikeres!")
    }
    updateData().then((r) => {
        res.status(r.responseStatus).send(r.responseText)
    }).catch(next)
}
