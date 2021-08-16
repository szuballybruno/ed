import { IdType } from '../models/shared_models/types/sharedTypes';
import { useCollection } from './persistance';
import { AdminPageUserView } from '../models/shared_models/AdminPageUserDTO';
import { User } from '../models/entities/User';

export const getAdminPageUsersList = async (userId: IdType, searchText: string) => {

    const { getItemById, collection } = await useCollection("users");
    const user = await getItemById(userId) as User;

    const aggregateAllUsers = async () => {
        const allUsers = await collection.aggregate([
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
                    "name": { $concat: ["$userData.lastName", " ", "$userData.firstName"] },
                    "tasks": "$userData.tasks"
                }
            }, {
                $match: { "name": (new RegExp(searchText as string, 'i')) }
            }]).toArray()

        return allUsers as AdminPageUserView[];
    }

    const aggregateUsersByOrganization = async () => {
        const usersInOrganization = await collection.aggregate([
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

        return usersInOrganization as AdminPageUserView[];
    }

    const aggregateUsersByGroup = async () => {

        const usersInGroups = await collection.aggregate([
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

        return usersInGroups as AdminPageUserView[];
    }

    switch (user.userData.role) {

        case "admin":
            return await aggregateAllUsers();

        case "owner":
            return await aggregateUsersByOrganization();

        case "supervisor":
            return await aggregateUsersByGroup();

        default:
            throw new Error("A felhasználó egyik rolenak sem felel meg")
    }
}