import {responseReducer} from '../../../services/responseReducer'
import { Connection } from '../../../services/connectMongo'
import { Request, Response, NextFunction } from "express";

export const getTags = (req: Request, res: Response, next: NextFunction) => {
    const fetchData = async () => {
        const tags = await Connection.db.collection("tags").aggregate([{
            $match: {
                "name": (new RegExp(req.query.searchData as string, 'i'))
            }
        }]).toArray()

        return responseReducer(200, tags)
    }

    fetchData().then((r: {responseStatus: number, responseText: string | object}) => {
        res.status(r.responseStatus).json(r.responseText)
    }).catch(next)

};
