import { IdType } from "../models/shared_models/types/sharedTypes";
import { Connection } from "./connectMongo";

export const setUserActiveRefreshToken = async (userId: IdType, token: string) => {
    return Connection.db.collection("users").updateOne({ "_id": userId }, {
        $set: {
            "userData.refreshToken": token
        }
    })
}

export const removeRefreshToken = (userEmail: string) => {
    return Connection.db.collection("users").updateOne({ "userData.email": userEmail }, { $unset: "userData.refreshToken" })
}