import { NextFunction, Request, Response } from "express";
import { responseReducer } from "../../../../services/responseReducer";
// import {checkRequest} from "../../../../services/checkRequest";
import { Connection } from "../../../../services/connectMongo";
import { ObjectID } from "mongodb";

export const setTask = (req: Request, res: Response, next: NextFunction) => {
    
    const taskData = ["userId", "taskToUserId", "taskName", "dueDate", "state"]
    // checkRequest(req, res, next, taskData)
    const setTaskInDatabase = async () => {
        await Connection.db.collection("users").updateOne(
            { "_id": new ObjectID(req.body.taskToUserId) },
            {
                "$push":
                {
                    "userData.tasks":
                    {
                        "addedDate": Date.now(),
                        "name": req.body.taskName,
                        "from": new ObjectID(req.body.userId),
                        "due": Date.parse(req.body.dueDate),
                        "state": req.body.state
                    }
                }
            }
        )
        return responseReducer(200, "")
    }

    setTaskInDatabase().then((r) => {
        return res.status(r.responseStatus).send(r.responseText)
    })
}