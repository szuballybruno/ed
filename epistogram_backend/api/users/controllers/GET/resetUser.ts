import {responseReducer} from '../../../../services/responseReducer'
import { Connection } from '../../../../services/connectMongo'
import {Request, Response, NextFunction, response} from "express";
import {checkRequest} from "../../../../services/checkRequest";
import {ObjectID} from "mongodb";
import Email from "email-templates";
import {emailConfig, emailContent} from "../../../../emails/email";
import {config} from "../../../../configuration/config";
import {generateToken} from "../../../../services/generateToken";

export const resetUser = (req: Request, res: Response, next: NextFunction) => {
    const fetchUsers = async () => {
        const user = await Connection.db.collection("users").findOne({_id: new ObjectID(req.params.userId as string)})
        const mailToken = await generateToken(req,res,next,user._id, user.userData.email)
        await new Email(emailConfig).send(emailContent(user.userData.email, `${user.userData.lastName} ${user.userData.firstName}`, `${config.frontendUrl}/regisztracio`, mailToken)).catch((err: string) => {
            throw new Error('Jelszó visszaállító e-mail kiküldése sikertelen' + err);
        });
        return responseReducer(200, "Jelszó visszaállító e-mail kiküldve")
    }

    fetchUsers().then(r => {
        res.status(r.responseStatus).send(r.responseText)
    }).catch(next)
};
