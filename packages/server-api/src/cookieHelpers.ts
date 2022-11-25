import { GlobalConfigurationService } from '@episto/server-services';
import dayjs from 'dayjs';
import { ICookieOptions, ITurboRequest, ITurboResponse } from './XTurboExpress/XTurboExpressTypes';

export const setAuthCookies = (
    config: GlobalConfigurationService,
    res: ITurboResponse,
    accessToken: string,
    refreshToken: string,
    options: ICookieOptions) => {

    res.setCookie(config.misc.accessTokenCookieName, accessToken, {
        ...options,
        expires: dayjs()
            .add(config.security.tokenLifespans.accessTokenLifespanInS, 'seconds')
            .toDate(),
    });

    res.setCookie(config.misc.refreshTokenCookieName, refreshToken, {
        ...options,
        expires: dayjs()
            .add(config.security.tokenLifespans.refreshTokenLifespanInS, 'seconds')
            .toDate()
    });
};

export const getAuthCookies = (req: ITurboRequest, config: GlobalConfigurationService) => {

    return {
        accessToken: req.getCookie(config.misc.accessTokenCookieName),
        refreshToken: req.getCookie(config.misc.refreshTokenCookieName)
    };
};