import bcrypt from "bcryptjs";
import Email from 'email-templates';
import { NextFunction, Request, Response } from "express";
import { ObjectID } from "mongodb";
import { getEmailConfig, emailContent } from "../../../../emails/email";
import { globalConfig } from "../../../../server";
import { checkRequest } from '../../../../services/checkRequest';
import { checkUser } from '../../../../services/checkUser';
import { Connection } from '../../../../services/connectMongo';
import { generateToken } from "../../../../services/generateToken";
import { responseReducer } from "../../../../services/responseReducer";

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

        await new Email(getEmailConfig()).send(emailContent(req.body.email, `${req.body.lastName} ${req.body.firstName}`, `${globalConfig.urls.frontendUrl}/signup`, mailToken)).catch((err: string) => {
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
