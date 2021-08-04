import {NextFunction, Request, Response} from "express";

export const uploadVoteImages = (req: Request, res: Response, next: NextFunction) => {
    //verifyFile(req,res,next)
    /*const uploadVote = async (req, res, next) => {
        const path = `${config.backendUrl}/votes/${req.body.voteName}`;

        req.files.file.map((file,index) => {
            const name = file.name
            const fileExtension = (name.substr(name.lastIndexOf('.') + 1));
            if (index === 0) {
                createFile(file, path, "voteFirstAnswerCount" + "." + fileExtension)
            } else if (index === 1) {
                createFile(file, path, "voteSecondAnswerCount" + "." + fileExtension)
            } else {
                console.log("Több képet próbáltál feltölteni 2-nél")
            }
        })
        const imagePaths = await searchImages(path)
        await GeneralData.findOne({'availableVotes.active': true}, (err, doc) => {
            doc.voteFirstAnswerPath = path + imagePaths[0]
            doc.voteSecondAnswerPath = path + imagePaths[1]
            doc.save()
        })
    }
    uploadVote(req,res,next).then(() => {
        res.status(201).send("Fájlok sikeresen feltöltve!")
    }).catch((error) => {
        res.status(400).send("A fájl feltöltése sikertelen " + error)
    })*/
}