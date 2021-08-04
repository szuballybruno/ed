import {Request, Response, NextFunction} from "express";

const {responseReducer} = require('../../../../services/responseReducer')
const { Connection } = require('../../../../services/connectMongo')
//const { ObjectID } = require('mongodb').ObjectID

export const getGroups = (req: Request, res: Response, next: NextFunction) => {
    const fetchCourses = async () => {
        const groups = await Connection.db.collection("groups").aggregate([]).toArray()
        return responseReducer(200, groups)
    }
    fetchCourses().then((r) => {
        res.status(r.responseStatus).send(r.responseText)
    }).catch(next)
};