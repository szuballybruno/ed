import { GlobalConfigurationService } from '@episto/server-services';
import { IXCookieOptions, IXGatewayRequest, IXGatewayResponse } from '@thinkhub/x-gateway';
import dayjs from 'dayjs';

export const setAuthCookies = (
    config: GlobalConfigurationService,
    res: IXGatewayResponse,
    accessToken: string,
    refreshToken: string,
    options: IXCookieOptions) => {

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

export const getAuthCookies = (req: IXGatewayRequest, config: GlobalConfigurationService) => {

    return {
        accessToken: req.getCookie(config.misc.accessTokenCookieName),
        refreshToken: req.getCookie(config.misc.refreshTokenCookieName)
    };
};