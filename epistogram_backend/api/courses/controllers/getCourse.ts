import {NextFunction, Request, Response} from "express";
import {Connection} from "../../../services/connectMongo";
import {responseReducer} from "../../../services/responseReducer";
import {ObjectID} from "mongodb";

export const getCourse = (req: Request, res: Response, next: NextFunction) => {
    const fetchCourse = async () => {
        const course = await Connection.db.collection("courses").aggregate([
            {
                $match: {
                    "_id": new ObjectID(req.params.courseId + "")
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
                    'let': {'localVideos': '$videos'},
                    'pipeline': [{
                        '$match': {
                            '$expr': {
                                '$filter': {
                                    'input': '$$localVideos',
                                    'as': 'localVideo',
                                    'cond': {
                                        '$eq': [
                                            '$_id', '$$localVideo._id'
                                        ]
                                    }
                                }
                            }
                        }
                    }, {
                        '$addFields': {
                            overlaysCount: {
                                "$cond": {
                                    "if": {
                                        "$isArray": "$overlays"
                                    },
                                    "then": {
                                        "$size": "$overlays"
                                    },
                                    "else": 1
                                }
                            }
                        }
                    }],
                    'as': 'videosWithData'
                }
            }, {
                '$lookup': {
                    'from': 'exams',
                    'localField': 'exams.itemId',
                    'foreignField': '_id',
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
                                                            '$$video.itemId', '$$extVideo._id'
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
                                                            '$$exam.itemId', '$$extExam._id'
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
                '$lookup': {
                    'from': 'tags',
                    'pipeline': [],
                    'as': 'tagsFromCollection'
                }
            }, {
                '$addFields': {
                    'doneTags': {
                        '$map': {
                            'input': '$courseTagsAsArrayOfObject',
                            'as': 'line',
                            'in': {
                                '$filter': {
                                    'input': '$tagsFromCollection',
                                    'as': 'linee',
                                    'cond': {
                                        '$eq': ['$$linee._id', {$toObjectId: '$$line._id'}]
                                    }
                                }
                            }
                        }
                    }
                }
            }, {
                '$addFields': {
                    'doneTagsAsObjects': {
                        '$map': {
                            'input': '$doneTags',
                            'as': 'line',
                            'in': {
                                '$mergeObjects': '$$line'
                            }
                        }
                    }
                }
            }, {
                '$addFields': {
                    'groupsAsArrayOfObject': {
                        '$map': {
                            'input': '$groups',
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
                '$lookup': {
                    'from': 'groups',
                    'pipeline': [],
                    'as': 'groupsFromCollection'
                }
            }, {
                '$addFields': {
                    'doneGroups': {
                        '$map': {
                            'input': '$groupsAsArrayOfObject',
                            'as': 'line',
                            'in': {
                                '$filter': {
                                    'input': '$groupsFromCollection',
                                    'as': 'linee',
                                    'cond': {
                                        '$eq': ['$$linee._id', {$toObjectId: '$$line._id'}]
                                    }
                                }
                            }
                        }
                    }
                }
            }, {
                '$addFields': {
                    'doneGroupsAsObjects': {
                        '$map': {
                            'input': '$doneGroups',
                            'as': 'line',
                            'in': {
                                '$mergeObjects': '$$line'
                            }
                        }
                    }
                }
            },{
                '$project': {
                    _id: 1,
                    name: 1,
                    category: 1,
                    courseGroup: 1,
                    teacherId: 1,
                    organizationId: 1,
                    permissionLevel: 1,
                    featured: 1,
                    tags: '$doneTagsAsObjects',
                    items: "$allItems",
                    groups: "$doneGroupsAsObjects",
                    colorOne: 1,
                    colorTwo: 1
                }
            }
        ]).toArray()
        return responseReducer(200, course[0])
    }
    fetchCourse().then((r) => {
        res.status(r.responseStatus).send(r.responseText)
    }).catch(next)
};