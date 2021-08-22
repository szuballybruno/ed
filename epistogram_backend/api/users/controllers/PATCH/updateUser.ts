import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { ObjectID } from "mongodb";
import { globalConfig } from "../../../../server";
import { comparePasswordAsync, hashPasswordAsync } from "../../../../services/crypt";
import { createFile } from "../../../../services/fileServices";
import { flattenObject } from "../../../../services/flattenObject";
import { verifyJWTToken } from "../../../../services/jwtGen";
import { useCollection } from "../../../../services/persistance";
import { getSingleFileFromRequest, requestHasFiles } from "../../../../utilities/helpers";

const { responseReducer } = require('../../../../services/responseReducer')
const { Connection } = require('../../../../services/connectMongo')

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {

    const { updateAsync } = await useCollection("users");

    type UserDataType = { email: string, userId: string };
    const flatBody = flattenObject(req.body)
    const updateData = async () => {
        //FindOneAndUpdate
        if (!req.body.currentPassword && req.body.newPassword) {
            let uploadedFile: UploadedFile

            const authHeader = req.headers.authorization
            let userData: UserDataType | undefined
            if (authHeader) {

                const token = authHeader.split(' ')[1];
                userData = verifyJWTToken<UserDataType>(token, globalConfig.mail.tokenMailSecret);
            }
            if (requestHasFiles(req)) {
                uploadedFile = getSingleFileFromRequest(req);
                createFile(uploadedFile, `/var/lib/assets/epistogram@development/users/${req.params.userId}/`, "avatar")
            }
            //checkFile(req, res, next)
            let hashedPassword;
            hashedPassword = await hashPasswordAsync(req.body.newPassword);

            if (!userData)
                return;

            await updateAsync(userData != undefined ? userData.userId : "", {
                "userData.phoneNumber": req.body.phoneNumber,
                "userData.password": hashedPassword
            });

        } else if (req.body.currentPassword && req.body.newPassword) {
            let user;
            try {
                user = await Connection.db.collection("users").findOne({ "_id": new ObjectID(req.params.userId) })
            } catch (e) {
                throw new Error("A jelszó beállítása sikertelen: DB")
            }

            try {
                const isMatch = await comparePasswordAsync(req.body.currentPassword, user.userData.password);
                if (!isMatch) {
                    const err = new Error("A jelszó beállítása sikertelen: Bcrypt")
                    return next(err)
                }
            } catch (e) {
                return next(e)
            }
            let hashedPassword;

            hashedPassword = await hashPasswordAsync(req.body.newPassword);

            /* await updateUserInDatabase(req.params.userId, {
                 "userData.password": hashedPassword
             })*/
        } else {
            // await updateUserInDatabase(req.params.userId, flattenObject(flatBody))
        }
        return responseReducer(201, "Az adatok frissítése sikeres!")
    }
    updateData().then((r) => {
        res.status(r.responseStatus).send(r.responseText)
    }).catch(next)
};
