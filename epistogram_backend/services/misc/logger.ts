type LogEntryType = "error" | "info" | "warning";

export const logWarning = (content: any) => log(content, "warning");

export const logError = (content: any) => log(content, "error");

export const log = (content: any, entryType?: LogEntryType) => {

    if (!entryType)
        entryType = "info";

    if (entryType == "warning")
        console.warn(content);

    if (entryType == "error")
        console.error(content);

    if (entryType == "info")
        console.log(content);
}