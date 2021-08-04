import {Request, Response, NextFunction} from "express";

const {responseReducer} = require('../../../../services/responseReducer')
const { Connection } = require('../../../../services/connectMongo')
//const { ObjectID } = require('mongodb').ObjectID

export const getVotes = (req: Request, res: Response, next: NextFunction) => {
    const fetchCourses = async () => {
        const votes = await Connection.db.collection("votes").aggregate([]).toArray()
        return responseReducer(200, votes)
    }
    fetchCourses().then((r) => {
        res.status(r.responseStatus).send(r.responseText)
    }).catch(next)
};