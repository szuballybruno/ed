import { Connection } from "../../../services/connectMongo";
import { createFile } from "../../../services/fileServices";
import { responseReducer } from "../../../services/responseReducer";
import { Request, Response, NextFunction } from 'express'
import { UploadedFile } from "express-fileupload";
import { getSingleFileFromRequest, requestHasFiles } from "../../../utilities/helpers";

export const uploadCourseImage = (req: Request, res: Response, next: NextFunction) => {
    let uploadedFile: UploadedFile
    const updateData = async () => {
        if (requestHasFiles(req)) {
            uploadedFile = getSingleFileFromRequest(req);
        }
        createFile(uploadedFile, `/var/lib/assets/epistogram@development/courses/`, req.params.courseId)
        return responseReducer(201, "Adatok hozzáadva az adatbázishoz ")
    }
    updateData().then((r) => {
        res.status(r.responseStatus).send(r.responseText)
    }).catch((e) => {
        res.status(400).send(e.responseText)
    });
};