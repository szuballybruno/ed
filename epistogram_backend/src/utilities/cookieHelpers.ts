import dayjs from 'dayjs';
import { GlobalConfiguration } from '../services/misc/GlobalConfiguration';
import { ITurboResponse } from './XTurboExpress/XTurboExpressTypes';

export const setAuthCookies = (config: GlobalConfiguration, res: ITurboResponse, accessToken: string, refreshToken: string) => {

    const setAccessTokenCookie = (res: ITurboResponse, accessToken: string) => {

        res.setCookie(config.misc.accessTokenCookieName, accessToken, {
            secure: true,
            httpOnly: true,
            expires: dayjs()
                .add(config.security.tokenLifespans.accessTokenLifespanInS, 'seconds')
                .toDate(),
            sameSite: 'none'
            // domain: isLocalhost ? undefined : frontendUrl
        });
    };

    const setRefreshTokenCookie = (res: ITurboResponse, refreshToken: string) => {

        res.setCookie(config.misc.refreshTokenCookieName, refreshToken, {
            secure: true,
            httpOnly: true,
            expires: dayjs()
                .add(config.security.tokenLifespans.refreshTokenLifespanInS, 'seconds')
                .toDate(),
            sameSite: 'none'
            // domain: isLocalhost ? undefined : frontendUrl
        });
    };

    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);
};