import { Connection } from "./connectMongo";
import { getUserById } from "./userService";

export const getRefreshTokenByUserId = async (userId: string) => {

    const user = await getUserById(userId);
    return user?.userData.refreshToken;
}

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