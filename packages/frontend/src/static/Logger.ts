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

        const msg = `[${key}] ${text}`;

        if (data === undefined) {

            console.log(msg);
        }
        else {

            console.log(msg, data);
        }
    }
};