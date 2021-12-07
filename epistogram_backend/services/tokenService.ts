import { AccessTokenPayload } from "../models/DTOs/AccessTokenPayload";
import { InvitationTokenPayload } from "../models/shared_models/types/sharedTypes";
import { staticProvider } from "../staticProvider";
import { getJWTToken, verifyJWTToken } from "./misc/jwtGen";

//
// VERIFY
//

export const verifyAccessToken = (token: string) => {

    return verifyJWTToken<AccessTokenPayload>(token, staticProvider.globalConfig.security.jwtSignSecret);
}

export const verifyRefreshToken = (token: string) => {

    return verifyJWTToken<AccessTokenPayload>(token, staticProvider.globalConfig.security.jwtSignSecret);
}

export const verifyPublicRegistrationToken = (token: string) => {

    return verifyJWTToken(token, staticProvider.globalConfig.security.createPasswordTokenSecret);
}

export const verifyInvitaionToken = (token: string) => {

    return verifyJWTToken<InvitationTokenPayload>(token, staticProvider.globalConfig.mail.tokenMailSecret);
}

export const verifyPasswordResetToken = (token: string) => {

    return verifyJWTToken<{ userId: number }>(token, staticProvider.globalConfig.mail.tokenMailSecret);
}

//
// CREATE
//

export const createInvitationToken = (userId: number) => {

    return getJWTToken<InvitationTokenPayload>(
        { userId: userId },
        staticProvider.globalConfig.mail.tokenMailSecret,
        "9924h")
}

export const createAccessToken = (userId: number) => {

    return getJWTToken(
        { userId },
        staticProvider.globalConfig.security.jwtSignSecret,
        `${staticProvider.globalConfig.security.accessTokenLifespanInS}s`);
}

export const createRefreshToken = (userId: number) => {

    return getJWTToken(
        { userId },
        staticProvider.globalConfig.security.jwtSignSecret,
        `${staticProvider.globalConfig.security.refreshTokenLifespanInS}s`);
}

export const createResetPasswordToken = (userId: number) => {

    return getJWTToken(
        { userId },
        staticProvider.globalConfig.mail.tokenMailSecret,
        "24h");
}

export const createRegistrationToken = () => {

    return getJWTToken(
        { tokenNudli: "bekacomb" },
        staticProvider.globalConfig.security.createPasswordTokenSecret,
        "99999h");
}