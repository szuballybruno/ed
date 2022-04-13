type LogEntryType = 'error' | 'info' | 'warning' | 'strong' | 'secondary';

export const logWarning = (content: any) => log(content, 'warning');

export const logError = (content: any) => log(content, 'error');

export const logSecondary = (content: any) => log(content, 'secondary');

export const log = (content: any, entryType?: LogEntryType) => {

    const dateTime = new Date();
    const miliseconds = dateTime.getMilliseconds();
    const options = { hour12: false };
    const dateTimeString = dateTime.toLocaleString('en-US', options);

    const getColor = (code: string) => `\x1b[${code}%s\x1b[0m`;

    const stamp = `[${dateTimeString}.${miliseconds}]`;

    if (!entryType)
        entryType = 'info';

    if (entryType === 'warning')
        console.warn(content);

    if (entryType === 'error')
        console.error(getColor('31m'), content);

    if (entryType === 'info')
        console.log(`${stamp} ${content}`);

    if (entryType === 'secondary')
        console.log(getColor('90m'), `${stamp} -- ${content}`);

    if (entryType === 'strong') {

        console.log(`[${dateTimeString}.${miliseconds}] ------------> ${content}`);
    }
};

export const logObject = (obj: any) => {

    console.log(obj);
};