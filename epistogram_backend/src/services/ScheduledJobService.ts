import { CronJob } from "cron";

export type ScheduleTimeType = {

    // 0-59
    seconds?: string,

    // 0-59
    minutes?: string,

    // 0-23
    hours?: string,

    // 1-31
    daysOfMonth?: string,

    // 1-12
    month?: string,

    // 0-6
    daysOfWeek?: string
}

export class ScheduledJobService {

    constructor() {

    }

    scheduleJob(time: ScheduleTimeType, job: () => void) {

        const seconds = time.seconds ?? "*";
        const minutes = time.minutes ?? "*";
        const hours = time.hours ?? "*";
        const daysOfMonth = time.daysOfMonth ?? "*";
        const month = time.month ?? "*";
        const daysOfWeek = time.daysOfWeek ?? "*";

        const cronTime = `${seconds} ${minutes} ${hours} ${daysOfMonth} ${month} ${daysOfWeek}`;

        new CronJob(cronTime, job).start();
    }
}