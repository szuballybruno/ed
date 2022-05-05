import cors from 'cors';
import { VerboseError } from '../../shared/types/VerboseError';
import { getAsyncMiddlewareHandler } from '../../utilities/apiHelpers';
import { GlobalConfiguration } from './GlobalConfiguration';

export const getUnderMaintanenceMiddleware = (config: GlobalConfiguration) => getAsyncMiddlewareHandler(async (req, res, next) => {

    if (!config.misc.isUnderMaintanence)
        return;

    throw new VerboseError('Server is under maintanence!', 'under maintenance');
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