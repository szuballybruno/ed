import { ObjectID } from "mongodb";
import {Connection} from "../../../services/connectMongo";
import {responseReducer} from "../../../services/responseReducer";
import {Request, Response, NextFunction} from 'express'

export const deleteTag = (req: Request, res: Response, next: NextFunction) => {
    const fetchData = async () => {
        try {
            await Connection.db.collection("tags").deleteOne({_id: new ObjectID(req.params.tagId as string)})
        } catch (e) {
            throw new Error("A tag törlése sikertelen")
        }
        return responseReducer(200, "Tag sikeresen törölve")
    }

    fetchData().then((r: {responseStatus: number, responseText: string | object}) => {
        res.status(r.responseStatus).json(r.responseText)
    }).catch(next)

};
