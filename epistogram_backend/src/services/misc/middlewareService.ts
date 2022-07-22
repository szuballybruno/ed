import cors from 'cors';
import { ErrorWithCode } from '../../shared/types/ErrorWithCode';
import { getAsyncMiddlewareHandler } from '../../utilities/apiHelpers';
import { GlobalConfiguration } from './GlobalConfiguration';

export const getUnderMaintanenceMiddleware = (config: GlobalConfiguration) => getAsyncMiddlewareHandler(async (req, res, next) => {

    if (!config.misc.isUnderMaintanence)
        return;

    throw new ErrorWithCode('Server is under maintanence!', 'under maintenance');
});

export const getCORSMiddleware = (config: GlobalConfiguration) => {

    const middleware = cors({
        origin: config.misc.frontendUrl,
        credentials: true,
        allowedHeaders: [
            'Origin',
            'X-Requested-With',
            'Content-Type',
            'Accept',
            'Authorization'
        ],
        preflightContinue: false,
        methods: 'DELETE, PATCH'
    });

    return middleware;
};