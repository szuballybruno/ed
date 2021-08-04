import {MongoError, ObjectID} from "mongodb";
import {NextFunction, Request, Response} from "express";
import {flattenObject} from "../../../../services/flattenObject";
import bcrypt from "bcryptjs";
import {Connection} from "../../../../services/connectMongo";
import {responseReducer} from "../../../../services/responseReducer";

const updateUserInDatabase = (userId: string, updateableObject: object) => {

}
//const { ObjectID } = require('mongodb').ObjectID

export const updateCurrentCourse = (req: Request, res: Response, next: NextFunction) => {
    const flatBody = flattenObject(req.body)
    //Auth
    //authenticate(req, res, next)
    const updateData = async () => {
        //FindOneAndUpdate
        let course;
        if (req.params.courseId) {
            course = await Connection.db.collection("courses").aggregate([{
                    $match: {"_id": new ObjectID(req.params.courseId)}
                }, {
                    '$addFields': {
                        'videos': {
                            '$filter': {
                                'input': '$items',
                                'cond': {
                                    '$eq': [
                                        '$$this.type', 'video'
                                    ]
                                }
                            }
                        }
                    }
                }, {
                    '$addFields': {
                        'exams': {
                            '$filter': {
                                'input': '$items',
                                'cond': {
                                    '$eq': [
                                        '$$this.type', 'exam'
                                    ]
                                }
                            }
                        }
                    }
                }, {
                    '$lookup': {
                        'from': 'videos',
                        'let': {"localVideos": "$videos"},
                        'pipeline': [{
                            '$match': {
                                '$expr': {
                                    '$filter': {
                                        'input': '$$localVideos',
                                        'as': 'video',
                                        'cond': {
                                            '$eq': [
                                                '$_id', {$toObjectId: '$$video.itemId'}
                                            ]
                                        }
                                    }
                                }
                            }

                        }],
                        'as': 'videosWithData'
                    }
                }, {
                    '$lookup': {
                        'from': 'exams',
                        'let': {"localExams": "$exams"},
                        'pipeline': [{
                            '$match': {
                                '$expr': {
                                    '$filter': {
                                        'input': '$$localExams',
                                        'as': 'exam',
                                        'cond': {
                                            '$eq': [
                                                '$_id', {$toObjectId: '$$exam.itemId'}
                                            ]
                                        }
                                    }
                                }
                            }

                        }],
                        'as': 'examsWithData'
                    }
                }, {
                    '$addFields': {
                        'videosWithAllData': {
                            '$map': {
                                'input': '$videos',
                                'as': 'video',
                                'in': {
                                    '$mergeObjects': [
                                        '$$video', {
                                            '$arrayElemAt': [
                                                {
                                                    '$filter': {
                                                        'input': '$videosWithData',
                                                        'as': 'extVideo',
                                                        'cond': {
                                                            '$eq': [
                                                                {$toObjectId: '$$video.itemId'}, '$$extVideo._id'
                                                            ]
                                                        }
                                                    }
                                                }, 0
                                            ]
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }, {
                    '$addFields': {
                        'examsWithAllData': {
                            '$map': {
                                'input': '$exams',
                                'as': 'exam',
                                'in': {
                                    '$mergeObjects': [
                                        '$$exam', {
                                            '$arrayElemAt': [
                                                {
                                                    '$filter': {
                                                        'input': '$examsWithData',
                                                        'as': 'extExam',
                                                        'cond': {
                                                            '$eq': [
                                                                {$toObjectId: '$$exam.itemId'}, '$$extExam._id'
                                                            ]
                                                        }
                                                    }
                                                }, 0
                                            ]
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }, {
                    '$addFields': {
                        'allItems': {
                            '$concatArrays': [
                                '$videosWithAllData', '$examsWithAllData'
                            ]
                        }
                    }
                }, {
                    '$project': {
                        "_id": 1,
                        "name": 1,
                        "thumbnailUrl": 1,
                        "tags": 1,
                        "category": 1,
                        "courseGroup": 1,
                        "permissionLevel": 1,
                        "organizationId": 1,
                        "creatorId": 1,
                        "teacherId": 1,
                        "teacherName": 1,
                        "items": "$allItems"
                    }
            }]).toArray()

        } else {
            throw new Error("Hibás kérés")
        }
        if (!course) {
            throw new Error("Nincs ilyen kurzus")
        } else {
            await Connection.db.collection("users").findOneAndUpdate({
                "_id": new ObjectID(req.params.userId)
            }, {
                $set: flattenObject({
                    "userData": {
                        "currentCourseId": req.params.courseId,
                        "currentItemId": course[0].items[0]._id + ""
                    }
                })
            }, {
                upsert: false,
                new: true
            } as any, (err: MongoError) => {
                if (err) {
                    throw new Error("Az adatok frissítése sikertelen!" + err)
                }
            })
            return responseReducer(201, course[0])
        }

    }
    updateData().then((r) => {
        res.status(r.responseStatus).send(r.responseText)
    }).catch(next)
};
