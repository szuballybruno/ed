import cors from 'cors';
import { GlobalConfiguration } from './GlobalConfiguration';

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