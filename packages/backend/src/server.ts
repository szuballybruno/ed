import { jsExtensions } from '@episto/commonlogic';
import { dirname } from 'path';
import './index';
import 'reflect-metadata'; // needs to be imported for TypeORM
import { fileURLToPath } from 'url';
import { LoggerService } from './services/LoggerService';
import { log } from './services/misc/logger';
import { ORMConnectionService } from './services/ORMConnectionService/ORMConnectionService';
import { ServiceProviderInitializator } from './startup/initApp';
import { initTurboExpress } from './startup/instatiateTurboExpress';
import { XTurboExpressListener } from './turboImplementations/XTurboExpressListener';


// RPC
type XRPCActionResult<TName, TAction> = {
    name: TName;
    action: TAction;
};

type XRPCAction = () => XRPCActionResult<any, any>;

type XRPCController<T> = {
    [K in keyof T]: XRPCAction
}

const fn = <TName extends Readonly<string>, TAction>(name: TName, fn: TAction): () => XRPCActionResult<TName, TAction> => {

    return null as any;
}

class AsdController implements XRPCController<AsdController> {

    constructor() {

    }

    getAsd = fn('get-asd', (param1: string) => {

        return {
            blah: 'fasz',
            ba: param1
        };
    })
}

class Asd2Controller implements XRPCController<Asd2Controller> {

    constructor() {

    }

    getLol = fn('get-lol', (param1: string) => {

        return {
            ny: 'fasz',
            ba: param1
        };
    })
}

type ControllersType = AsdController & Asd2Controller;

type ApiManifestType = {
    [K in keyof ControllersType as ReturnType<ControllersType[K]>['name']]: {
        paramsType: Parameters<ReturnType<ControllersType[K]>['action']>,
        returnType: ReturnType<ReturnType<ControllersType[K]>['action']>
    };
}

const call = <TActionKey extends keyof ApiManifestType>(
    action: TActionKey,
    ...args: ApiManifestType[TActionKey]['paramsType']): ApiManifestType[TActionKey]['returnType'] => {

    return null as any;
}

const res = call('get-lol', 'lol');

jsExtensions.initJsExtensions();

const rootDir = dirname(fileURLToPath(import.meta.url));

const startServerAsync = async (initializator: ServiceProviderInitializator) => {

    const listener = new XTurboExpressListener(
        initializator
            .getSingletonProvider()
            .getService(LoggerService),
        initializator
    );

    /**
     * Validate schema
     */
    await initializator
        .useTransientServicesContextAsync(async serviceProvider => {

            const ormService = serviceProvider
                .getService(ORMConnectionService);

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

await (async () => {

    log('');
    log('------------- APPLICATION STARTED ----------------');
    log('');

    const initializator = new ServiceProviderInitializator(rootDir, false);

    await startServerAsync(initializator);
})();