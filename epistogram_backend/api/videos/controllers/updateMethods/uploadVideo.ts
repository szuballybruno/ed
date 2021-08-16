
import { Connection } from '../../../../services/connectMongo'
import {responseReducer} from '../../../../services/responseReducer'
import { ObjectID } from 'mongodb'
// import { checkRequest } from '../../../../services/checkRequest'
import {Request, Response, NextFunction} from "express";


const uploadVideo = (req: Request, res: Response, next: NextFunction) => {
    const insertData = async () => {
        //const videoData = await fetchVimeoAPI(req, res, next)
        let requestVideoData = req.body
        requestVideoData.videoThumbnailUrl = "https://i.vimeocdn.com/video/948930961_520x294.jpg"//videoData.thumbnail_medium
        requestVideoData.videoLength = 465//videoData.duration
        requestVideoData.courseId = new ObjectID(req.body.courseId)
        return Connection.db.collection("videos").insertOne(requestVideoData).then((r) => {
            return responseReducer(200, "Adatok hozzáadva az adatbázishoz " + r)
        }).catch((e) => {
            return responseReducer(400, "Az adatok hozzáadása sikertelen" + e)
        })
    }
    insertData().then((r) => {
        res.status(r.responseStatus).send(r.responseText)
    }).catch(next);
};

module.exports = uploadVideo
