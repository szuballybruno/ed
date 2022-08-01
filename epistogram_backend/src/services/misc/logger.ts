import { constraintFn } from '../../utilities/misc';

type LogEntryType = 'error' | 'info' | 'warning' | 'strong' | 'secondary';
type ConsoleColorType = { code: string };

export const ConsoleColor = constraintFn<ConsoleColorType>()({
    red: { code: '31m' },
    gray: { code: '90m' },
    blue: { code: '94m' },
    purple: { code: '95m' },
    yellow: { code: '33m' }
});

/**
 * @deprecated DO NOT USE - use LoggerService 
 */
export const logWarning = (content: any) => log(content, { entryType: 'warning' });

/**
 * @deprecated DO NOT USE - use LoggerService 
 */
export const logError = (content: any) => log(content, { entryType: 'error' });

/**
 * @deprecated DO NOT USE - use LoggerService 
 */
export const logSecondary = (content: any) => log(content, { entryType: 'secondary' });

const loggingEnabled = false;

/**
 * @deprecated DO NOT USE - use LoggerService 
 */
export const log = (content: any, opts?: {
    entryType?: LogEntryType,
    color?: ConsoleColorType,
    noStamp?: boolean
}) => {

    // if (!loggingEnabled)
    //     return;

    const dateTime = new Date();
    const miliseconds = dateTime.getMilliseconds();
    const options = { hour12: false };
    const dateTimeString = dateTime.toLocaleString('en-US', options);
    const entryType = opts?.entryType ?? 'info';
    const color = opts?.color ?? null;
    const noStamp = !!opts?.noStamp;

    const getColor = (code: ConsoleColorType) => '\x1b[' + code.code + '%s\x1b[0m';

    const stamp = `[${dateTimeString}.${miliseconds}]`;

    if (entryType === 'warning')
        console.warn(getColor(ConsoleColor.yellow), content);

    if (entryType === 'error')
        console.error(getColor(ConsoleColor.red), content);

    if (entryType === 'info') {

        const line = `${noStamp ? '' : stamp + ' '}${content}`;
        color
            ? console.log(getColor(color), line)
            : console.log(line);
    }

    if (entryType === 'secondary')
        console.log(getColor(ConsoleColor.gray), `${stamp} -- ${content}`);

    if (entryType === 'strong') {

        console.log(`[${dateTimeString}.${miliseconds}] ------------> ${content}`);
    }
};

export const logObject = (obj: any) => {

    console.log(obj);
};