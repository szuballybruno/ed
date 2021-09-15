type LogEntryType = "error" | "info" | "warning";

export const logWarning = (content: any) => log(content, "warning");

export const logError = (content: any) => log(content, "error");

export const log = (content: any, entryType?: LogEntryType) => {

    const dateTime = new Date();
    const miliseconds = dateTime.getMilliseconds();
    const options = { hour12: false };
    const dateTimeString = dateTime.toLocaleString('en-US', options);

    content = `[${dateTimeString}.${miliseconds}] ${content}`;

    if (!entryType)
        entryType = "info";

    if (entryType == "warning")
        console.warn(content);

    if (entryType == "error")
        console.error(content);

    if (entryType == "info")
        console.log(content);
}