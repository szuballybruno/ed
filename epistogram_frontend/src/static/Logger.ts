import { Environment, LoggingKeysType } from './Environemnt';

export const Logger = {

    log: (text: any) => {

        if (!Environment.loggingEnabled)
            return;

        console.log(text);
    },

    logScoped: (key: LoggingKeysType, text: string, data?: any) => {

        if (!Environment.loggingEnabledKeys.some(x => x === key))
            return;

        console.log(`[${key}] ${text}`);
        if (data)
            console.log(data);
    }
};