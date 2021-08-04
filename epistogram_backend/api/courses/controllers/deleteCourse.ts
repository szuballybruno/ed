import {responseReducer} from '../../../services/responseReducer'
import { Connection } from '../../../services/connectMongo'
import { ObjectID } from 'mongodb'
import { Request, Response, NextFunction } from "express";

export const deleteCourse = (req: Request, res: Response, next: NextFunction) => {
    const fetchData = async () => {
        try {
            await Connection.db.collection("courses").deleteOne({_id: new ObjectID(req.params.courseId as string)})
        } catch (e) {
            throw new Error("A kurzus törlése sikertelen")
        }
        return responseReducer(200, "A kurzus sikeresen törölve")
    }

    fetchData().then((r: {responseStatus: number, responseText: string | object}) => {
        res.status(r.responseStatus).json(r.responseText)
    }).catch(next)

};
