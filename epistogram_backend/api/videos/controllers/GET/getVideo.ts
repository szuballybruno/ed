import {Request, Response, NextFunction} from "express";
import {ObjectID} from "mongodb";

const {responseReducer} = require('../../../../services/responseReducer')
const { Connection } = require('../../../../services/connectMongo')

export const getVideo = (req: Request, res: Response, next: NextFunction) => {
    const fetchCourses = async () => {
        const video = await Connection.db.collection("videos").aggregate([
            {
                '$lookup': {
                    'from': 'courses',
                    'let': {
                        'courseId': {
                            '$toObjectId': '$courseId'
                        }
                    },
                    'pipeline': [
                        {
                            '$match': {
                                '$expr': {
                                    '$eq': [
                                        '$_id', '$$courseId'
                                    ]
                                }
                            }
                        }
                    ],
                    'as': 'courses'
                }
            }, {
                '$unwind': {
                    'path': '$courses',
                    'preserveNullAndEmptyArrays': true
                }
            },{
                $match: {"_id": new ObjectID(req.params.videoId + "")}
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
            },{
                '$lookup': {
                    'from': 'overlays',
                    'let': {
                        'inOverlays': '$overlays'
                    },
                    'pipeline': [
                        {
                            '$match': {
                                '$expr': {
                                    '$map': {
                                        "input": "$$inOverlays",
                                        "as": "overlay",
                                        "in": {
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
            },{
                $project: {
                    "_id": 1,
                    "thumbnailUrl": 1,
                    "title": 1,
                    "subTitle": 1,
                    "length": 1,
                    "watchCount": "0",
                    "description": 1,
                    "url": 1,
                    "overlays": '$allOverlays',
                    "tags": "$doneTagsAsObjects",
                    "showAutomaticOverlay": 1,
                    "courseName": "$courses.name",
                }
            }]).toArray()
        return responseReducer(200, video[0])
    }
    fetchCourses().then((r) => {
        res.status(r.responseStatus).send(r.responseText)
    }).catch(next)
};
