import {Connection} from "./connectMongo";

export const getRefreshTokenByUserEmail = async (userEmail: string) => {
    let existingUser
    try {
        existingUser = await Connection.db.collection("users").findOne({"userData.email": userEmail});
    } catch (e) {
        throw new Error("Invalid credentials " + userEmail)
    }


    if (!existingUser) {
        throw new Error("Invalid credentials" + userEmail)
    }

    return existingUser.userData.refreshToken

}

export const setRefreshToken = async (userEmail: string, token: string) => {
    return Connection.db.collection("users").updateOne({"userData.email": userEmail}, {
        $set: {
            "userData.refreshToken": token
        }
    })
}

export const removeRefreshToken = (userEmail: string) => {
    return Connection.db.collection("users").updateOne({"userData.email": userEmail}, {$unset: "userData.refreshToken"})
}