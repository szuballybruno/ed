import dayjs from "dayjs";
import { Response } from "express";
import { GlobalConfiguration } from "../services/misc/GlobalConfiguration";

export const setAuthCookies = (config: GlobalConfiguration, res: Response, accessToken: string, refreshToken: string) => {

    const setAccessTokenCookie = (res: Response, accessToken: string) => {

        res.cookie(config.misc.accessTokenCookieName, accessToken, {
            secure: true,
            httpOnly: true,
            expires: dayjs().add(config.security.accessTokenLifespanInS, "seconds").toDate(),
            sameSite: "none"
            // domain: isLocalhost ? undefined : frontendUrl
        });
    }

    const setRefreshTokenCookie = (res: Response, refreshToken: string) => {

        res.cookie(config.misc.refreshTokenCookieName, refreshToken, {
            secure: true,
            httpOnly: true,
            expires: dayjs().add(config.security.refreshTokenLifespanInS, "seconds").toDate(),
            sameSite: "none"
            // domain: isLocalhost ? undefined : frontendUrl
        });
    }

    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);
}