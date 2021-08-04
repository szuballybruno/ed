import {responseReducer} from '../../../../services/responseReducer'
import { Connection } from '../../../../services/connectMongo'
import {Request, Response, NextFunction, response} from "express";
import {checkRequest} from "../../../../services/checkRequest";
import {ObjectID} from "mongodb";

export const getUsers = (req: Request, res: Response, next: NextFunction) => {

    checkRequest(req, res, next, ["userId", "organizationId"])
    const fetchUsers = async () => {
        const user = await Connection.db.collection("users").findOne({_id: new ObjectID(req.query.userId as string)})

        switch (user.userData.role) {
            case "admin":
                const allUsers = await Connection.db.collection("users").aggregate([
                    {
                        '$lookup': {
                            'from': 'organizations',
                            'let': {
                                'organizationId': {
                                    '$toObjectId': '$userData.organizationId'
                                }
                            },
                            'pipeline': [
                                {
                                    '$match': {
                                        '$expr': {
                                            '$eq': [
                                                '$_id', '$$organizationId'
                                            ]
                                        }
                                    }
                                }
                            ],
                            'as': 'orgs'
                        }
                    }, {
                        $unwind: {
                            path: "$orgs",
                            preserveNullAndEmptyArrays: true
                        }
                    }, {
                    $project: {
                        "_id": 1,
                        "active": "$userData.active",
                        "email": "$userData.email",
                        "firstName": "$userData.firstName",
                        "lastName": "$userData.lastName",
                        "phoneNumber": "$userData.phoneNumber",
                        "role": "$userData.role",
                        "innerRole": "$userData.innerRole",
                        "organizationName": "$orgs.organizationName",
                        "name" : { $concat : [ "$userData.lastName", " ", "$userData.firstName" ] },
                        "tasks": "$userData.tasks"
                    }
                }, {
                    $match: { "name": (new RegExp(req.query.searchData as string, 'i'))}
                }]).toArray()
                return responseReducer(200, allUsers)
            case "owner":
                const usersInOrganization = await Connection.db.collection("users").aggregate([
                    {
                        '$lookup': {
                            'from': 'organizations',
                            'let': {
                                'organizationId': {
                                    '$toObjectId': '$userData.organizationId'
                                }
                            },
                            'pipeline': [
                                {
                                    '$match': {
                                        '$expr': {
                                            '$eq': [
                                                '$_id', '$$organizationId'
                                            ]
                                        }
                                    }
                                }
                            ],
                            'as': 'orgs'
                        }
                    }, {
                        '$unwind': {
                            'path': '$orgs',
                            'preserveNullAndEmptyArrays': false
                        }
                    }, {
                        '$project': {
                            '_id': 1,
                            'active': '$userData.active',
                            'email': '$userData.email',
                            'firstName': '$userData.firstName',
                            'lastName': '$userData.lastName',
                            'phoneNumber': '$userData.phoneNumber',
                            'role': '$userData.role',
                            'innerRole': '$userData.innerRole',
                            'organizationName': '$orgs.organizationName',
                            'name': {
                                '$concat': [
                                    '$userData.lastName', ' ', '$userData.firstName'
                                ]
                            },
                            'groups': '$filteredGroups.groupName'
                        }
                    }
                ]).toArray()
                return responseReducer(200, usersInOrganization)
            case "supervisor":
                const usersInGroups = await Connection.db.collection("users").aggregate([
                    {
                        '$lookup': {
                            'from': 'organizations',
                            'let': {
                                'organizationId': {
                                    '$toObjectId': '$userData.organizationId'
                                }
                            },
                            'pipeline': [
                                {
                                    '$match': {
                                        '$expr': {
                                            '$eq': [
                                                '$_id', '$$organizationId'
                                            ]
                                        }
                                    }
                                }
                            ],
                            'as': 'orgs'
                        }
                    }, {
                        '$unwind': {
                            'path': '$orgs',
                            'preserveNullAndEmptyArrays': false
                        }
                    }, {
                        '$lookup': {
                            'from': 'groups',
                            'let': {
                                'groups': {
                                    '$ifNull': [
                                        '$userData.groups', []
                                    ]
                                },
                                'userId': {
                                    '$toObjectId': '6022c270f66f803c80243250'
                                }
                            },
                            'pipeline': [
                                {
                                    '$match': {
                                        '$expr': {
                                            '$eq': [
                                                '$$userId', '$groupSupervisorId'
                                            ]
                                        }
                                    }
                                }
                            ],
                            'as': 'searchableGroups'
                        }
                    }, {
                        '$lookup': {
                            'from': 'groups',
                            'localField': 'userData.groups.groupId',
                            'foreignField': '_id',
                            'as': 'filteredGroups'
                        }
                    }, {
                        '$match': {
                            'filteredGroups.0': {
                                '$exists': true
                            }
                        }
                    }, {
                        '$project': {
                            '_id': 1,
                            'active': '$userData.active',
                            'email': '$userData.email',
                            'firstName': '$userData.firstName',
                            'lastName': '$userData.lastName',
                            'phoneNumber': '$userData.phoneNumber',
                            'role': '$userData.role',
                            'innerRole': '$userData.innerRole',
                            'organizationName': '$orgs.organizationName',
                            'name': {
                                '$concat': [
                                    '$userData.lastName', ' ', '$userData.firstName'
                                ]
                            },
                            'groups': '$filteredGroups.groupName'
                        }
                    }
                ]).toArray()
                return responseReducer(200, usersInGroups)
            default:
                throw new Error("A felhasználó egyik rolenak sem felel meg")
        }
    }

    fetchUsers().then(r => {
        res.status(r.responseStatus).send(r.responseText)
    }).catch(err => {
        res.status(400).send(err.toString())
    })
};
