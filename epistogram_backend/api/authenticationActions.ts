
import jwt from "jsonwebtoken";
import dayjs from "dayjs";
import { ExpressNext, ExpressRequest, ExpressResponse, globalConfig } from "../server";
import { log } from "../services/logger";

class User {
    email: string;
    password: string;
    id: number;

    constructor(email: string, password: string, id: number) {
        this.email = email;
        this.password = password;
        this.id = id;
    }
}

const getAccessToken = (user: User) => jwt.sign(JSON.stringify(user), globalConfig.security.jwtSignSecret);
const validateAccessToken = (token: string) => jwt.verify(token, globalConfig.security.jwtSignSecret);

const setAccessTokenCookie = (res: ExpressResponse, accessToken: string) => {
    res.cookie("accessToken", accessToken, {
        secure: false,
        httpOnly: false,
        expires: dayjs().add(30, "days").toDate()
    });
}

const getCookies = (req: ExpressRequest) => {

    const cookieString = (req.headers.cookie as string);
    if (!cookieString)
        return [];

    return cookieString
        .split('; ')
        .map(x => ({
            key: x.split("=")[0],
            value: x.split("=")[1]
        }));
}

const getCookie = (req: ExpressRequest, key: string) => getCookies(req).filter(x => x.key == key)[0];

const respondValidationError = (res: ExpressResponse, error: string) =>
    res.status(400).json({ error: error });

const users = [] as User[];

export const registerUserAction = (req: ExpressRequest, res: ExpressResponse, next: ExpressNext) => {

    const email = req.body?.email;
    const password = req.body?.password;

    if (!email) {

        respondValidationError(res, "Email is not provided!");
        return;
    }

    if (!password) {

        respondValidationError(res, "Password is not provided!");
        return;
    }

    // TODO: persist user in DB
    const user = new User(email, password, 1);
    users.push(user);

    const accessToken = getAccessToken(user);

    setAccessTokenCookie(res, accessToken);

    // res.setHeader('Access-Control-Allow-Credentials', 'true');
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost');

    res.sendStatus(200);
}

export const logInUserAction = (req: ExpressRequest, res: ExpressResponse, next: ExpressNext) => {

    const email = req.body.email;
    const password = req.body.password;

    if (!email)
        respondValidationError(res, "Email is not provided!");

    if (!password)
        respondValidationError(res, "Password is not provided!");

    // TODO: get user from DB
    const user = users.filter(x => x.email == email && x.password == password)[0];
    if (!user)
        res.sendStatus(418);

    const accessToken = getAccessToken(user);

    setAccessTokenCookie(res, accessToken);

    res.sendStatus(200);
}

export const getCurrentUser = (req: ExpressRequest, res: ExpressResponse, next: ExpressNext) => {

    log("Getting current user...");

    const accessToken = getCookie(req, "accessToken").value;
    const isValid = validateAccessToken(accessToken);

    if (!isValid) {

        res.sendStatus(403);
        return;
    }

    res.status(200).json(users[0]);
}