import Email from 'email-templates';

import {checkRequest} from '../../../../services/checkRequest'
import {checkUser} from '../../../../services/checkUser'
import {config} from '../../../../configuration/config'
import {Connection} from '../../../../services/connectMongo'
import {Request, NextFunction, Response} from "express";
import {responseReducer} from "../../../../services/responseReducer";
import {ObjectID} from "mongodb";
import {emailConfig, emailContent} from "../../../../emails/email";
import {generateToken} from "../../../../services/generateToken";
import bcrypt from "bcryptjs";
import {createDirectory} from "jest-util";


export const signup = (req: Request, res: Response, next: NextFunction) => {
    const registrationData = ["email", "role", "username", "firstName", "lastName", "organizationId", "innerRole"]
    checkRequest(req, res, next, registrationData)
    const createUser = async () => {
        let insertedId: string
        await checkUser(req, res, next)
        let createdUser: {
            _id?: string
            userData: {
                active: boolean,
                email: string,
                role: string,
                username: string,
                firstName: string,
                lastName: string,
                organizationId: ObjectID,
                password: string,
                innerRole: string
            }
        } = {
            userData: {
                active: true,
                email: req.body.email,
                role: req.body.role,
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                organizationId: req.body.organizationId, //TODO: tényleges cégellenőrzést beletenni
                password: await bcrypt.hash("abcd", 12),
                innerRole: req.body.innerRole
            }
        }

        let insertedUser
        try {
            insertedUser = await Connection.db.collection("users").insertOne(createdUser)
        } catch (e) {
            throw new Error("Shit heppönsz" + e.toString())
        }
        const mailToken = await generateToken(req,res,next, insertedUser.insertedId, createdUser.userData.email)

        await new Email(emailConfig).send(emailContent(req.body.email, `${req.body.lastName} ${req.body.firstName}`, `${config.frontendUrl}/signup`, mailToken)).catch((err: string) => {
            throw new Error('Signing up failed, please try again later.' + err);
        });

        return responseReducer(201, "Sikeres regisztráció")
    }

    createUser().then((r) => {
        res.status(r.responseStatus).send(r.responseText)
    }).catch((e) => {
        res.status(400).send(e.toString())
    })

};
