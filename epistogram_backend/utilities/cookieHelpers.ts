import dayjs from "dayjs";
import { Response } from "express";
import { staticProvider } from "../staticProvider";

export const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {

    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);
}

const setAccessTokenCookie = (res: Response, accessToken: string) => {

    res.cookie(staticProvider.globalConfig.misc.accessTokenCookieName, accessToken, {
        secure: true,
        httpOnly: true,
        expires: dayjs().add(staticProvider.globalConfig.security.accessTokenLifespanInS, "seconds").toDate(),
        sameSite: "none"
        // domain: isLocalhost ? undefined : frontendUrl
    });
}

const setRefreshTokenCookie = (res: Response, refreshToken: string) => {

    res.cookie(staticProvider.globalConfig.misc.refreshTokenCookieName, refreshToken, {
        secure: true,
        httpOnly: true,
        expires: dayjs().add(staticProvider.globalConfig.security.refreshTokenLifespanInS, "seconds").toDate(),
        sameSite: "none"
        // domain: isLocalhost ? undefined : frontendUrl
    });
}