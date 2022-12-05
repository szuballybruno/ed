import { writeFileSync } from "fs";

let logs: string[] = [];

const log = (msg: string, logsOnly?: boolean) => {

    logs.push(msg);

    if (!logsOnly)
        console.log(msg);
};

const flush = () => {

    const logsPath = './logs/testlogs.txt';
    
    log(`Flushing logs to ${logsPath}`);

    writeFileSync(logsPath, logs.join('\n'));
}

export const Logger = {
    log,
    flush
};