import {checkFile} from "../../../services/checkFile";
import {NextFunction, Request, Response} from "express";
import {Connection} from "../../../services/connectMongo";
import {config} from "../../../configuration/config"
import {createFile} from "../../../services/fileServices"

export const uploadAvatarImage = (req: Request, res: Response, next: NextFunction) => {
    /*checkFile(req,res,next);
    const files  = (req as RequestWithFile).files;
    const uploadAvatar = async () => {
        const currentUser = await Connection.db.collection("user").findOne({'email': req.body.email})
        const file = files.file
        createFile(file, `${config.uploadFolderPath}/${currentUser.coachId}/${currentUser._id}/`, file.name)
    }

    uploadAvatar().then(() => {
        res.status(201).send("Fájl sikeresen feltöltve!")
    }).catch((error) => {
        res.status(400).send("A fájl feltöltése sikertelen " + error)
    })*/
}