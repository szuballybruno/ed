import { NextFunction, Request, Response } from "express";

export const uploadThumbnailImage = (req: Request, res: Response, next: NextFunction) => {
    /*checkFile(req,res,next);
    let uploadedFile: UploadedFile
    if (req.files) {
        uploadedFile = req.files.file as UploadedFile
    }
    const uploadThumbnail = async () => {
        const path = `${config.uploadFolderPath}/${req.body.coachId}/videothumbnails`
        const extension = uploadedFile.name.substr(uploadedFile.name.lastIndexOf('.') + 1)
        createFile(uploadedFile.data, path, req.body.videoId + '.' + extension)
        const imagePaths = await searchImages(path)
        await Connection.db.collection("video").findOne({'_id': req.body.videoId}, (err, doc) => {
            if (err || doc === null) {
                console.log("A videó nem található")
            } else {
                doc.videoThumbnailUrl = path + imagePaths[0]
                doc.save()
            }
        })
    }

    uploadThumbnail().then(() => {
        res.status(201).send("Fájl sikeresen feltöltve!")
    }).catch((error) => {
        res.status(400).send("A fájl feltöltése sikertelen " + error)
    })*/
}