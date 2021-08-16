import {NextFunction, Request, Response} from "express";

const {responseReducer} = require('../../../services/responseReducer')
const { Connection } = require('../../../services/connectMongo')
// import {checkRequest} from '../../../services/checkRequest'

export const getAllCourses = (req: Request, res: Response, next: NextFunction) => {
    // checkRequest(req, res, next, ["userId"])

    const fetchCourses = async function() {
        const courses = await Connection.db.collection("courses").aggregate([
            {
                '$lookup': {
                    'from': 'users',
                    'let': {
                        'userId': {
                            '$toObjectId': '6022c270f66f803c80243250'
                        }
                    },
                    'pipeline': [
                        {
                            '$match': {
                                '$expr': {
                                    '$eq': [
                                        '$_id', '$$userId'
                                    ]
                                }
                            }
                        }
                    ],
                    'as': 'user'
                }
            }, {
                '$unwind': {
                    'path': '$user',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$lookup': {
                    'from': 'organizations',
                    'localField': 'organizationId',
                    'foreignField': '_id',
                    'as': 'org'
                }
            }, {
                '$unwind': {
                    'path': '$org',
                    'preserveNullAndEmptyArrays': true
                }
            },/* {
                '$lookup': {
                    'from': 'groups',
                    'localField': 'groups',
                    'foreignField': '_id',
                    'as': 'groups'
                }
            },*/ {
                '$lookup': {
                    'from': 'users',
                    'let': {
                        'teacherId': {
                            '$convert': {
                                'input': '$teacherId',
                                'to': 7,
                                'onError': '',
                                'onNull': ''
                            }
                        }
                    },
                    'pipeline': [
                        {
                            '$match': {
                                '$expr': {
                                    '$eq': [
                                        '$_id', '$$teacherId'
                                    ]
                                }
                            }
                        }
                    ],
                    'as': 'teacher'
                }
            }, {
                '$unwind': {
                    'path': '$teacher',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$addFields': {
                    'courseTagsAsArrayOfObject': {
                        '$map': {
                            'input': '$tags',
                            'as': 'line',
                            'in': {
                                '$mergeObjects': [
                                    {
                                        '_id': '$$line'
                                    }
                                ]
                            }
                        }
                    }
                }
            }, {
                '$addFields': {
                    'courseAndUserTags': {
                        '$filter': {
                            'input': '$user.userStatistics.tags',
                            'as': 'line',
                            'cond': {
                                '$in': [
                                    '$$line._id', '$courseTagsAsArrayOfObject._id'
                                ]
                            }
                        }
                    }
                }
            }, {
                '$lookup': {
                    'from': 'tags',
                    'as': 'doneTags',
                    'let': {
                        'courseAndUserTagsLocal': '$courseAndUserTags'
                    },
                    'pipeline': [
                        {
                            '$match': {
                                '$expr': {
                                    '$in': [
                                        '$_id', '$$courseAndUserTagsLocal._id'
                                    ]
                                }
                            }
                        }, {
                            '$project': {
                                'name': 1,
                                'count': {
                                    '$filter': {
                                        'input': '$$courseAndUserTagsLocal',
                                        'as': 'tag',
                                        'cond': {
                                            '$eq': [
                                                '$$tag._id', '$_id'
                                            ]
                                        }
                                    }
                                }
                            }
                        }, {
                            '$unwind': '$count'
                        }, {
                            '$project': {
                                '_id': 1,
                                'count': '$count.count',
                                'name': 1
                            }
                        }
                    ]
                }
            }, {
                '$addFields': {
                    'sumCount': {
                        '$sum': {
                            '$map': {
                                'input': '$doneTags',
                                'as': 'line',
                                'in': '$$line.count'
                            }
                        }
                    }
                }
            }, {
                '$match': {
                    '$expr': {
                        '$cond': [
                            {
                                '$eq': [
                                    req.query.isRecommended, "true"
                                ]
                            }, {
                                '$ne': [
                                    '$doneTags', []
                                ]
                            }, {
                                'a': 'a'
                            }
                        ]
                    }
                }
            }, {
                '$match': {
                    '$expr': {
                        '$cond': [
                            {
                                '$eq': [
                                    req.query.featured, "true"
                                ]
                            }, {
                                '$eq': [
                                    '$featured', true
                                ]
                            }, {
                                'a': 'a'
                            }
                        ]
                    }
                }
            },{
                $addFields: {
                    "filteredGroups": {
                        $filter: {
                            input: "$user.userData.groups",
                            as: "userGroup",
                            cond: {
                                $in: ["$$userGroup.groupId", {$ifNull: ["$groups", []]}]
                            }
                        }
                    }
                }
            }, {
                '$match': {
                    $and: [
                        {
                            $or: [
                                {"name": (new RegExp(req.query.searchData as string, 'i'))},
                                {"category": (new RegExp(req.query.searchData as string, 'i'))}
                            ]
                        },
                        {
                            "category": (new RegExp(req.query.category as string, 'i'))
                        },
                        {
                            $expr: {
                                $cond: {
                                    if: {
                                        $ne: [req.query.organizationId, null]
                                    },
                                    then: {
                                        $eq: [req.query.organizationId, "$organizationId"]
                                    },
                                    else: {},
                                }
                            }
                        },
                        {
                            $expr: {
                                $cond: {
                                    if: {
                                       $ne: ["$user.userData.role", "admin"]
                                    },
                                    then: {
                                        $eq: ["$user.userData.organizationId", "$organizationId"]
                                    },
                                    else: {},
                                }
                            }
                        }/*,
                        {
                            $expr: {
                                $cond: {
                                    if: {
                                       $and: [
                                           {
                                               $ne: ["$user.userData.role", "admin"]
                                           },
                                           {
                                               $ne: ["$user.userData.role", "owner"]
                                           }
                                       ]
                                    },
                                    then: {
                                        $ne: ["$filteredGroups", []]
                                    },
                                    else: {},
                                }
                            }
                        }*/
                    ]
                }
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
                    name: 1,
                    category: 1,
                    teacherName: "$teacher.name",
                    colorOne: 1,
                    colorTwo: 1,
                    thumbnailUrl: 1,
                    items: "$allItems",//"$teacher.userData.lastName" + "$teacher.userData.firstName"
                    groups: "$groups",
                    filteredGroups: "$filteredGroups"
                }
            }
        ]).toArray()
        return responseReducer(200, courses)
    }

    fetchCourses().then((r) => {
        res.status(r.responseStatus).json(r.responseText)
    }).catch(next)
}

