import { Connection } from "./connectMongo";
import { getUserDTOById } from "./userService";

export const setUserActiveRefreshToken = async (userEmail: string, token: string) => {
    return Connection.db.collection("users").updateOne({ "userData.email": userEmail }, {
        $set: {
            "userData.refreshToken": token
        }
    })
}

export const removeRefreshToken = (userEmail: string) => {
    return Connection.db.collection("users").updateOne({ "userData.email": userEmail }, { $unset: "userData.refreshToken" })
}