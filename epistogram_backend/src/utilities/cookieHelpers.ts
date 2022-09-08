import dayjs from 'dayjs';
import { GlobalConfiguration } from '../services/misc/GlobalConfiguration';
import { ICookieOptions, ITurboResponse } from './XTurboExpress/XTurboExpressTypes';

export const setAuthCookies = (
    config: GlobalConfiguration,
    res: ITurboResponse,
    accessToken: string,
    refreshToken: string,
    options: ICookieOptions) => {

    const setAccessTokenCookie = (res: ITurboResponse, accessToken: string) => {

        res.setCookie(config.misc.accessTokenCookieName, accessToken, {
            ...options,
            expires: dayjs()
                .add(config.security.tokenLifespans.accessTokenLifespanInS, 'seconds')
                .toDate(),
        });
    };

    const setRefreshTokenCookie = (res: ITurboResponse, refreshToken: string) => {

        res.setCookie(config.misc.refreshTokenCookieName, refreshToken, {
            ...options,
            expires: dayjs()
                .add(config.security.tokenLifespans.refreshTokenLifespanInS, 'seconds')
                .toDate()
        });
    };

    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);
};