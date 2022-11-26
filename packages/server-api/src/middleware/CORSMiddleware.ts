import { DomainProviderService } from '@episto/server-services';
import cors from 'cors';
import { ServiceProviderInitializator } from '../helpers/initApp';

export const getCORSMiddleware = async (initializator: ServiceProviderInitializator) => {

    const getCourseDomains: () => Promise<string[]> = async () => {

        const domains = await initializator
            .useTransientServicesContextAsync(async serviceProvider => {

                const domainPrivider = serviceProvider
                    .getService(DomainProviderService);

                return await domainPrivider
                    .getAllDomainsAsync();
            });

        return domains;
    };

    const middleware = cors({
        origin: function (origin, callback) {
            const promise = (async () => {
                try {

                    const domains = await getCourseDomains();

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