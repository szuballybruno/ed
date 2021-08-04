import {NextFunction, Request, Response} from "express";
import {MongoError, ObjectID} from "mongodb";
import {flattenObject} from "../../../../services/flattenObject";
import bcrypt from "bcryptjs";
import {UploadedFile} from "express-fileupload";
import {checkFile} from "../../../../services/checkFile";
import {createFile} from "../../../../services/fileServices";
import jwt from 'jsonwebtoken';
import {config} from "../../../../configuration/config";

const {responseReducer} = require('../../../../services/responseReducer')
const { Connection } = require('../../../../services/connectMongo')

const updateUserInDatabase = (userId: string, updateableObject: object) => {
    Connection.db.collection("users").findOneAndUpdate({
        "_id": new ObjectID(userId)
    }, {
        $set: updateableObject
    }, {
        upsert: false,
        new: true
    } as any, (err: MongoError) => {
        if (err) {
            throw new Error("Az adatok frissítése sikertelen!" + err)
        }
    })
}
//const { ObjectID } = require('mongodb').ObjectID

export const updateUser = (req: Request, res: Response, next: NextFunction) => {

    const flatBody = flattenObject(req.body)
    //Auth
    //authenticate(req, res, next)
    const updateData = async () => {
        //FindOneAndUpdate
        if (!req.body.currentPassword && req.body.newPassword) {
            let uploadedFile: UploadedFile

            const authHeader = req.headers.authorization
            let userData: {
                email: string
                userId: string
            } | undefined
            if (authHeader) {
                const token = authHeader.split(' ')[1];

                jwt.verify(token, config.tokenMailSecret, (err, user) => {
                    if (err) {
                        throw new Error("A token ellenőrzése sikertelen")
                    }
                    userData = user as {email: string, userId: string}
                })
            }
            if (req.files) {
                uploadedFile = req.files.file as UploadedFile
                createFile(uploadedFile, `/var/lib/assets/epistogram@development/users/${req.params.userId}/`, "avatar")
            }
            //checkFile(req, res, next)
            let hashedPassword;
            hashedPassword = await bcrypt.hash(req.body.newPassword, 12);


            await updateUserInDatabase(userData != undefined ? userData.userId : "" , {
                "userData.phoneNumber": req.body.phoneNumber,
                "userData.password": hashedPassword
            })

        } else if (req.body.currentPassword && req.body.newPassword) {
            let user;
            try {
                user = await Connection.db.collection("users").findOne({"_id": new ObjectID(req.params.userId)})
            } catch (e) {
                throw new Error("A jelszó beállítása sikertelen: DB")
            }

            try {
                const isMatch = await bcrypt.compare(req.body.currentPassword, user.userData.password);
                if (!isMatch) {
                    const err = new Error("A jelszó beállítása sikertelen: Bcrypt")
                    return next(err)
                }
            } catch (e) {
                return next(e)
            }
            let hashedPassword;

            hashedPassword = await bcrypt.hash(req.body.newPassword, 12);

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
