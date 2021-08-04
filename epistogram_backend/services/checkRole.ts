const { Connection } = require('./connectMongo')
import mongodb from "mongodb"

const checkRole = (userId: mongodb.ObjectId | string): object | null => {

    let resolveMyPromise = async () => {
        return await Connection.db.collection("users").findOne({"_id": new mongodb.ObjectID(userId)})
    }


    return resolveMyPromise().then((r) => {
        return {
            role: r.basicData.role,
            groups: r.basicData.groups,
            organizationId: r.basicData.organizationId
        }
    })

}

export = checkRole