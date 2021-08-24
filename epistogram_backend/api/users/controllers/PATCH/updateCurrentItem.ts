import { Connection } from "../../../../services/connectMongo";
import { MongoError, ObjectID } from "mongodb";
import { NextFunction, Request, Response } from "express";
import { flattenObject } from "../../../../services/flattenObject";
import { responseReducer } from "../../../../services/responseReducer";


const updateUserInDatabase = (userId: string, updateableObject: object) => {
    Connection.db.collection("users").findOneAndUpdate({
        "_id": new ObjectID(userId)
    }, {
        $set: updateableObject
    }, {
        upsert: false,
        new: true
    } as any, (err: MongoError) => {
        if (err) {
            throw new Error("Az adatok frissítése sikertelen!" + err)
        }
    })
}
//const { ObjectID } = require('mongodb').ObjectID

// export const updateCurrentItem = (req: Request, res: Response, next: NextFunction) => {
//     const flatBody = flattenObject(req.body)
//     //Auth
//     //authenticate(req, res, next)
//     const updateData = async () => {
//         const currentItem = await Connection.db.collection("courses").aggregate([
//             {
//                 '$addFields': {
//                     'videos': {
//                         '$filter': {
//                             'input': '$items',
//                             'cond': {
//                                 '$eq': [
//                                     '$$this.type', 'video'
//                                 ]
//                             }
//                         }
//                     }
//                 }
//             }, {
//                 '$addFields': {
//                     'exams': {
//                         '$filter': {
//                             'input': '$items',
//                             'cond': {
//                                 '$eq': [
//                                     '$$this.type', 'exam'
//                                 ]
//                             }
//                         }
//                     }
//                 }
//             }, {
//                 '$lookup': {
//                     'from': 'videos',
//                     'let': {"localVideos": "$videos"},
//                     'pipeline': [{
//                         '$match': {
//                             '$expr': {
//                                 '$filter': {
//                                     'input': '$$localVideos',
//                                     'as': 'video',
//                                     'cond': {
//                                         '$eq': [
//                                             '$_id', {$toObjectId: '$$video.itemId'}
//                                         ]
//                                     }
//                                 }
//                             }
//                         }

//                     }],
//                     'as': 'videosWithData'
//                 }
//             }, {
//                 '$lookup': {
//                     'from': 'exams',
//                     'let': {"localExams": "$exams"},
//                     'pipeline': [{
//                         '$match': {
//                             '$expr': {
//                                 '$filter': {
//                                     'input': '$$localExams',
//                                     'as': 'exam',
//                                     'cond': {
//                                         '$eq': [
//                                             '$_id', {$toObjectId: '$$exam.itemId'}
//                                         ]
//                                     }
//                                 }
//                             }
//                         }

//                     }],
//                     'as': 'examsWithData'
//                 }
//             }, {
//                 '$addFields': {
//                     'videosWithAllData': {
//                         '$map': {
//                             'input': '$videos',
//                             'as': 'video',
//                             'in': {
//                                 '$mergeObjects': [
//                                     '$$video', {
//                                         '$arrayElemAt': [
//                                             {
//                                                 '$filter': {
//                                                     'input': '$videosWithData',
//                                                     'as': 'extVideo',
//                                                     'cond': {
//                                                         '$eq': [
//                                                             {$toObjectId: '$$video.itemId'}, '$$extVideo._id'
//                                                         ]
//                                                     }
//                                                 }
//                                             }, 0
//                                         ]
//                                     }
//                                 ]
//                             }
//                         }
//                     }
//                 }
//             }, {
//                 '$addFields': {
//                     'examsWithAllData': {
//                         '$map': {
//                             'input': '$exams',
//                             'as': 'exam',
//                             'in': {
//                                 '$mergeObjects': [
//                                     '$$exam', {
//                                         '$arrayElemAt': [
//                                             {
//                                                 '$filter': {
//                                                     'input': '$examsWithData',
//                                                     'as': 'extExam',
//                                                     'cond': {
//                                                         '$eq': [
//                                                             {$toObjectId: '$$exam.itemId'}, '$$extExam._id'
//                                                         ]
//                                                     }
//                                                 }
//                                             }, 0
//                                         ]
//                                     }
//                                 ]
//                             }
//                         }
//                     }
//                 }
//             }, {
//                 '$addFields': {
//                     'allItems': {
//                         '$concatArrays': [
//                             '$videosWithAllData', '$examsWithAllData'
//                         ]
//                     }
//                 }
//             }, {
//                 $match: {
//                     $expr: {
//                         $and: [
//                             {
//                                 $eq: ['$_id',{$toObjectId: req.params.courseId}]
//                             },{
//                                 '$filter': {
//                                     'input': '$allItems',
//                                     'as': 'allItem',
//                                     'cond': {
//                                         $eq: [{$toObjectId: '$$allItem._id'},{$toObjectId: req.params.itemId}]
//                                     }
//                                 }
//                             }
//                         ]
//                     }
//                 }
//             }, {
//                 "$addFields": {
//                     "currentItem": {
//                         '$filter': {
//                             'input': '$allItems',
//                             'as': 'allItem',
//                             'cond': {
//                                 $eq: [{$toObjectId: '$$allItem._id'},{$toObjectId: req.params.itemId}]
//                             }
//                         }
//                     }
//                 }
//             },{
//                 $unwind: "$currentItem"
//             },{
//                 $project: {
//                     "currentItem":1,
//                     "currentCourse": {
//                         "_id": "$_id",
//                         "name": "$name",
//                         "thumbnailUrl": "$thumbnailUrl",
//                         "tags": "$tags",
//                         "category": "$category",
//                         "courseGroup": "$courseGroup",
//                         "permissionLevel": "$permissionLevel",
//                         "items": "$allItems"
//                     }
//                 }
//             }
//         ]).toArray()
//         //FindOneAndUpdate
//         if (req.params.itemId && req.params.courseId && req.params.userId && (currentItem[0].currentItem._id == req.params.itemId)) {
//             updateUserInDatabase(req.params.userId, {
//             })
//         } else {
//             throw new Error("Hibás kérés")
//         }
//         return responseReducer(201, currentItem[0])
//     }
//     updateData().then((r) => {
//         res.status(r.responseStatus).send(r.responseText)
//     }).catch(next)
// };

