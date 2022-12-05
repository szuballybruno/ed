import { IXGatewayListener } from "@episto/x-gateway";
import { XOrmConnectionService } from "@episto/x-orm";
import { ServiceProviderInitializator } from "./initApp";
import { initTurboExpress } from "./instatiateTurboExpress";

export const startServerAsync = async (
    rootDir: string,
    getListenerAsync: (initializator: ServiceProviderInitializator) => Promise<IXGatewayListener>) => {

    const initializator = new ServiceProviderInitializator(rootDir);

    const listener = await getListenerAsync(initializator);

    /**
     * Validate schema
     */
    await initializator
        .useTransientServicesContextAsync(async serviceProvider => {

            const ormService = serviceProvider
                .getService(XOrmConnectionService);

            await ormService
                .validateSchemaAsync();
        });

    /**
     * INIT TURBO EXPRESS
     */
    const turboExpress = initTurboExpress(initializator, listener);

    /**
     * LISTEN (start server)
     */
    turboExpress.listen();
};