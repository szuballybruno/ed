import { JestLogger } from './jestLogger';

export const customIt = (text: string, fn: () => Promise<any>) => {
    return it(text, async () => {
        // try {

            JestLogger.logMain(`Running [it] block: "${text}"`);
            await fn();
        // }
        // catch (e: any) {

        //     console.error('----------------------- ERROR --------------------------');
        //     console.error(e);
        //     throw e;
        // }
    });
};