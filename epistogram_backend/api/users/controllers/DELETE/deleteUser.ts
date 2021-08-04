import {responseReducer} from '../../../../services/responseReducer'
import { Connection } from '../../../../services/connectMongo'
import { ObjectID } from 'mongodb'
import { Request, Response, NextFunction } from "express";

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const fetchData = async () => {
        try {
            await Connection.db.collection("users").deleteOne({_id: new ObjectID(req.params.userId as string)})
        } catch (e) {
            throw new Error("A felhasználó törlése sikertelen")
        }
        return responseReducer(200, "Felhasználó sikeresen törölve")
    }

    fetchData().then((r: {responseStatus: number, responseText: string | object}) => {
        res.status(r.responseStatus).json(r.responseText)
    }).catch(next)

};
