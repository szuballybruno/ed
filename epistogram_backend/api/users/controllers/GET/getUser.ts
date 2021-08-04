import {responseReducer} from '../../../../services/responseReducer'
import { Connection } from '../../../../services/connectMongo'
import {Request, Response, NextFunction, response} from "express";
import {ObjectID} from "mongodb";

export const getUser = (req: Request, res: Response, next: NextFunction) => {
    const fetchUser = async () => {
        const matchUser = () => {
            return [{
                '$match': {
                    "_id": new ObjectID(req.params.userId)
                }
            }]
        }
        const fetchCourse = (courseId: string) => {
            return [{
                '$lookup': {
                    'from': 'courses',
                    'let': {
                        'currentCourseId': {$toObjectId: courseId}
                    },
                    'pipeline': [
                        {
                            '$match': {
                                '$expr': {
                                    '$eq': [
                                        '$_id', '$$currentCourseId'
                                    ]
                                }
                            }
                        }
                    ],
                    'as': 'currentCourse'
                }
            },{
                '$unwind': {
                    'path': '$currentCourse',
                    'preserveNullAndEmptyArrays': true
                }
            }]
        }

        const filterVideosFromCourse = () => {
            return [{
                '$addFields': {
                    'videos': {
                        '$filter': {
                            'input': '$currentCourse.items',
                            'cond': {
                                '$eq': [
                                    '$$this.type', 'video'
                                ]
                            }
                        }
                    }
                }
            }]
        }

        const filterExamsFromCourse = () => {
            return [{
                '$addFields': {
                'exams': {
                    '$filter': {
                        'input': '$currentCourse.items',
                            'cond': {
                            '$eq': [
                                '$$this.type', 'exam'
                            ]
                        }
                    }
                }
            }
            }]
        }

        const fetchDataForVideos = () => {
            return [{'$lookup': {
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

                },{
                    "$addFields": {
                        "dikbuh": "$overlays"
                    }
                }, {
                    '$lookup': {
                        'from': 'overlays',
                        'let': {
                            'inOverlays': '$dikbuh'
                        },
                        'pipeline': [
                            {
                                '$match': {
                                    '$expr': {
                                        '$filter': {
                                            "input": "$$inOverlays",
                                            "as": "overlay",
                                            "cond": {
                                                '$eq': [
                                                    '$_id', {$toObjectId: '$$overlay._id'}
                                                ]
                                            }
                                        },

                                    }
                                }
                            }
                        ],
                        'as': 'overlays'
                    }
                }],
                    'as': 'videosWithData'
            }
        }]
        }

        const fetchOverlayForVideos = () => {
            return [

            ]
        }

        const fetchDataForExams = () => {
            return [{
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
            }]
        }

        const mergeVideosWithVideosWithData = () => {
            return [{
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
            }]
        }

        const mergeExamsWithExamsWithData = () => {
            return [{
                '$addFields': { //getExamsWithAllData
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
            }]
        }

        const mergeExamsAndVideos = () => {
            return [{
                '$addFields': {
                    'allItems': {
                        '$concatArrays': [
                            '$videosWithAllData', '$examsWithAllData'
                        ]
                    }
                }
            }]
        }

        const fetchAllItems = () => {
            return [

            ]
        }



        const fetchVotes = () => {
            return [ {
                '$lookup': {
                    'from': 'votes',
                    'pipeline': [
                        {
                            '$match': {
                                '$expr': {
                                    '$eq': [
                                        '$active', true
                                    ]
                                }
                            }
                        }
                    ],
                    'as': 'vote'
                }
            }, {
                '$unwind': {
                    'path': '$vote',
                    'preserveNullAndEmptyArrays': true
                }
            }]
        }
        const fetchVideo = () => {
            return [{
                '$lookup': {
                    'from': 'videos',
                    'localField': 'userData.currentItemId',
                    'foreignField': '_id',
                    'as': 'currentItemVideoWithoutOverlays'
                }
            }, {
                '$unwind': {
                    'path': '$currentItemVideoWithoutOverlays',
                    'preserveNullAndEmptyArrays': true
                }
            }]
        }

        const fetchOverlays = () => {
            return [{
                '$lookup': {
                    'from': 'overlays',
                    'let': {
                        'inOverlays': '$currentItemVideoWithoutOverlays.overlays'
                    },
                    'pipeline': [
                        {
                            '$match': {
                                '$expr': {
                                    '$filter': {
                                        "input": "$$inOverlays",
                                        "as": "overlay",
                                        "cond": {
                                            '$eq': [
                                                '$_id', '$$overlay._id'
                                            ]
                                        }
                                    },

                                }
                            }
                        }
                    ],
                    'as': 'allOverlays'
                }
            }]
        }

        const fetchCurrentItemIfVideoWithOverlay = () => {
            return [{
                '$lookup': {
                    'from': 'videos',
                    'let': {"videoId": "$userData.currentItemId", "asd": "$allOverlays"},
                    'pipeline': [{
                        '$match': {
                            '$expr': {
                                '$eq': [
                                    '$_id', {$toObjectId: '$$videoId'}
                                ]
                            }
                        }
                    }, {
                        "$addFields": {
                            "overlays": "$$asd"
                        }
                    }],
                    'as': 'currentItemVideo'
                }
            },{
                "$unwind": {
                    'path': '$currentItemVideo',
                    'preserveNullAndEmptyArrays': true
                }
            }]
        }

        const fetchCurrentItemIfExam = () => {
            return [{
                '$lookup': {
                    'from': 'exams',
                    'localField': 'userData.currentItemId',
                    'foreignField': '_id',
                    'as': 'currentItemExam'
                }
            },{
                '$unwind': {
                    'path': '$currentItemExam',
                    'preserveNullAndEmptyArrays': true
                }
            }]
        }

        const projectResult = () => {
            return [{
                '$project': {
                    'asd': "$Fos",
                    'userData': {
                        'allowedMachinesAtHome': '$userData.security.allowedMachines',
                        'avatarUrl': '$userData.avatarUrl',
                        'badges': '$userData.badges',
                        'currentCourse': {
                            $mergeObjects: ["$currentCourse", { items: "$allItems"}],
                        },
                        'currentSeeSomethingNew': '{}',
                        'currentItem': '$currentItem',
                        'doneCourses': '$doneCourses',
                        'doneExams': '$doneExams',
                        'email': 1,
                        'epistoCoins': 1,
                        'firstName': 1,
                        'favoriteCourses': [],
                        'innerRole': 1,
                        'lastName': 1,
                        'linkedInUrl': 1,
                        'notes': 1,
                        'phoneNumber': 1,
                        'recommendedCourses': '$recommendedCourses',
                        'role': 1,
                        'tasks': 1,
                        'username': 1,
                        'userDescription': 1,
                        'watchedVideosCount': '0'
                    },
                    'userStatistics': 1,
                    'vote': "$vote"
                }
            }]
        }

        /*const groupByActivities = () => {
            return [{
                "$group": {
                    '$mergeObjects': 'activities'
                }
            }]
        }*/

        const testProjectResult = () => {
            return [{
                '$project': {
                    'activities': 1,
                    'statistics': {
                        'time': {
                            avgSessionLength: '0'
                        }
                    }
                }
            }] 
        }

        const user = await Connection.db.collection("users").aggregate([
            // Kiszűrjük a keresett felhasználót
            ...matchUser(),

            // Lekérjük a jelenlegi kurzust
            {
                $set: {"userData.currentItemId": {$toObjectId: "$userData.currentItemId"} }
            },
            ...fetchCourse('$userData.currentCourseId'),

            //Lekérjük a kurzus összes itemét az összes adattal és egy tömbbe rakjuk
            ...filterVideosFromCourse(),
            ...filterExamsFromCourse(),
            ...fetchDataForVideos(),
            ...fetchDataForExams(),
            ...mergeVideosWithVideosWithData(),
            ...mergeExamsWithExamsWithData(),
            ...mergeExamsAndVideos(),

            //Lekérjük a jelenlegi videót az overlay adataival együtt
            ...fetchVideo(),
            ...fetchOverlays(),
            ...fetchCurrentItemIfVideoWithOverlay(),

            //Lekérjük a jelenlegi vizsgát ha nem video az item
            ...fetchCurrentItemIfExam(),

            //Az előző két itemből csinálunk egy currentItem-et
            {
                $addFields: {
                    "currentItem": {
                        $mergeObjects: ["$currentItemVideo", "$currentItemExam"]
                    }
                }
            },

            /*doneCourses, doneExams hiányzik*/

            ...fetchVotes(),

            /* recommendedCourses lekérése {
                '$lookup': {
                    'from': 'courses',
                    'localField': 'userStatistics.tags._id',
                    'foreignField': 'tags',
                    'as': 'recommendedCourses'
                }
            }*/
            //...groupByActivities(),
            //...testProjectResult(),
            ...projectResult()
        ]).toArray()
        return responseReducer( 200, user[0])
    }

    fetchUser().then(r => {
        res.status(r.responseStatus).send(r.responseText)
    }).catch(err => {
        res.status(400).send(err.toString())
    })
};