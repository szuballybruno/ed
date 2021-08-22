import { Connection } from '../../../services/connectMongo'
import {responseReducer} from '../../../services/responseReducer'
import {Request, Response, NextFunction} from "express";
import {UploadedFile} from "express-fileupload";
import {createFile} from "../../../services/fileServices";
import { getSingleFileFromRequest, requestHasFiles } from '../../../utilities/helpers';


export const createCourse = (req: Request, res: Response, next: NextFunction) => {
    let uploadedFile: UploadedFile
    console.log(JSON.parse(JSON.stringify(req.body)))
    const insertData = async () => {
        if (requestHasFiles(req)) {
            uploadedFile = getSingleFileFromRequest(req);

        }
        return Connection.db.collection("courses").insertOne(req.body).then((doc) => {
            createFile(uploadedFile, `/var/lib/assets/epistogram@development/courses/`, doc.insertedId)
            return responseReducer(200, "Adatok hozzáadva az adatbázishoz ")
        }).catch((e) => {
            return responseReducer(400, "Az adatok hozzáadása sikertelen" + e)
        })
    }
    insertData().then((r) => {
        res.status(r.responseStatus).send(r.responseText)
    }).catch((e) => {
        res.status(400).send(e.responseText)
    });
};
