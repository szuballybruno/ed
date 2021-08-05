import { NextFunction, Request, Response } from 'express';
import { UploadedFile } from "express-fileupload";
import { ObjectID } from "mongodb";
import { Connection } from "../../../services/connectMongo";
import { createFile, getFileExtension } from "../../../services/fileServices";
import { responseReducer } from "../../../services/responseReducer";

export const uploadVideoImage = (req: Request, res: Response, next: NextFunction) => {
    let uploadedFile: UploadedFile
    const updateData = async () => {
        const isItVideo = await Connection.db.collection("videos").findOne({"_id": new ObjectID(req.params.itemId)})
        //const isItExam = await Connection.db.collection("exams").findOne({"_id": new ObjectID(req.params.itemId)})
        if (req.files) {
            uploadedFile = req.files.file as UploadedFile
        }
        isItVideo ? createFile(uploadedFile, `/var/lib/assets/epistogram@development/videos/`, req.params.itemId): createFile(uploadedFile, `/var/lib/assets/epistogram@development/exams/`, req.params.itemId)
        isItVideo && await Connection.db.collection("videos").updateOne({"_id": new ObjectID(req.params.itemId)}, {
            $set: {
                videoThumbnailUrl: "https://dev.epistogram.com/assets/epistogram/videos/" + req.params.itemId + "." + getFileExtension(uploadedFile.name)
            }
        })
        return responseReducer(201, "Adatok hozzáadva az adatbázishoz ")
    }
    updateData().then((r) => {
        res.status(r.responseStatus).send(r.responseText)
    }).catch((e) => {
        res.status(400).send(e.responseText)
    });
};