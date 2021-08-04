import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {responseReducer} from '../../../../services/responseReducer'
import { Connection } from '../../../../services/connectMongo'
import { Request, Response } from "express";

export const login = (req: Request, res: Response) => {
    const email = req.query.email;
    const password = req.query.password;

    const authenticate = async () => {
        let existingUser
        try {
            existingUser = await Connection.db.collection("users").findOne({"userData.email": email});
        } catch (e) {
            return responseReducer(401, "Invalid credentials, could not log you in. " + e)
        }


        if (!existingUser) {
            return responseReducer(401, "Invalid credentials, could not log you in.");
        }

        let isValidPassword = false;
        try {
            isValidPassword = await bcrypt.compare(password as string, existingUser.userData.password);
        } catch (err) {
            return responseReducer(400, "No credentials, could not log you inc. " + err);
        }

        if (!isValidPassword) {
            return responseReducer(401, "No credentials, could not log you ind. " + req.query.password + " asd" + isValidPassword);
        }

        let token;
        try {
            token = jwt.sign(
                {userId: existingUser._id, email: existingUser.userData.email},
                'AROWILLSAVETHECODE',
                {expiresIn: '24h'}
            );
        } catch (err) {
            return responseReducer(500, "Logging in failed, please try again later." + err);
        }

        return responseReducer(200, {

            userId: existingUser._id,
            supervisorId: existingUser.userData.supervisorId,
            email: existingUser.userData.email,
            role: existingUser.userData.role,
            token: token,
            organizationId: existingUser.userData.organizationId
        });
    }

    authenticate().then((r) => {
        return res.status(r.responseStatus).end(JSON.stringify(r.responseText))
    }).catch((e) => {
        return res.status(e.errorCode).end(e.errorText)
    })
};
