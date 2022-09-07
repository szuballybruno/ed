import cors from 'cors';

export const getCORSMiddleware = (getCorsDomains: () => Promise<string[]>) => {

    const middleware = cors({
        origin: function (origin, callback) {
            const promise = (async () => {
                try {

                    const domains = await getCorsDomains();

                    callback(null, domains);
                }
                catch (e: any) {

                    callback(e, []);
                }
            })();
        },
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