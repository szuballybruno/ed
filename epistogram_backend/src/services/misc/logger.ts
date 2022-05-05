import { constraintFn } from '../../utilities/misc';

type LogEntryType = 'error' | 'info' | 'warning' | 'strong' | 'secondary' ;
type ConsoleColorType = { code: string };

export const ConsoleColor = constraintFn<ConsoleColorType>()({
    red: { code: '31m' },
    gray: { code: '90m' },
    blue: { code: '94m' },
    purple: { code: '95m' }
});

export const logWarning = (content: any) => log(content, { entryType: 'warning' });

export const logError = (content: any) => log(content, { entryType: 'error' });

export const logSecondary = (content: any) => log(content, { entryType: 'secondary' });

export const log = (content: any, opts?: {
    entryType?: LogEntryType,
    color?: ConsoleColorType
}) => {

    const dateTime = new Date();
    const miliseconds = dateTime.getMilliseconds();
    const options = { hour12: false };
    const dateTimeString = dateTime.toLocaleString('en-US', options);
    const entryType = opts?.entryType ?? 'info';
    const color = opts?.color ?? null;

    const getColor = (code: ConsoleColorType) => `\x1b[${code.code}%s\x1b[0m`;

    const stamp = `[${dateTimeString}.${miliseconds}]`;

    if (entryType === 'warning')
        console.warn(content);

    if (entryType === 'error')
        console.error(getColor(ConsoleColor.red), content);

    if (entryType === 'info'){

        const line = `${stamp} ${content}`;
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