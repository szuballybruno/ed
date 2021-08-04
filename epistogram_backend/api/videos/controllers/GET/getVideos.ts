import {Request, Response, NextFunction} from "express";

const {responseReducer} = require('../../../../services/responseReducer')
const { Connection } = require('../../../../services/connectMongo')
//const { ObjectID } = require('mongodb').ObjectID

export const getVideos = (req: Request, res: Response, next: NextFunction) => {
    const fetchCourses = async () => {
        const videos = await Connection.db.collection("videos").aggregate([
            { $lookup:
                    {
                        from: "courses",
                        localField: "courseId",
                        foreignField: "_id",
                        as: "courses"
                    },
            }, {
                $unwind: "$courses"
            },{
                $project: {
                    "_id": 1,
                    "videoThumbnailUrl": 1,
                    "videoMainTitle": 1,
                    "videoSubTitle": 1,
                    "videoLength": 1,
                    "videoWatchCount": "0",
                    "overlaysCount": {
                        "$cond": {
                            "if": {
                                "$isArray": "$overlays"
                            },
                            "then": {
                                "$size": "$overlays"
                            },
                            "else": 0
                        }
                    },
                    "courseName": "$courses.name",
                    "courses": "$courses",
                    "courseItems": "$courses.items"
                }
            }, {
                $match: {
                    $and: [
                        { "videoMainTitle": (new RegExp(req.query.searchData as string, 'i'))}
                    ]
                }
            }]).toArray()
        return responseReducer(200, videos)
    }
    fetchCourses().then((r) => {
        res.status(r.responseStatus).send(r.responseText)
    }).catch(next)
};