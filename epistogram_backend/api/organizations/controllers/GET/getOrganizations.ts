import {responseReducer} from '../../../../services/responseReducer'
import { Connection } from '../../../../services/connectMongo'
import {Request, Response, NextFunction} from "express";
//import {checkRequest} from "../../../../services/checkRequest";
//import {ObjectID} from "mongodb";

export const getOrganizations = (req: Request, res: Response, next: NextFunction) => {
    const fetchUsers = async () => {
        //const user = await Connection.db.collection("users").findOne({_id: new ObjectID(req.query.userId as string)})
        const organizations = await Connection.db.collection("organizations").aggregate([]).toArray()
        return responseReducer(200, organizations)

    }

    fetchUsers().then(r => {
        res.status(r.responseStatus).send(r.responseText)
    }).catch(next)
};