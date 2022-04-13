import { log, logSecondary } from './misc/logger';

export class LoggerService {

    log(text: string) {

        log(text);
    }

    logSecondary(text: string) {

        logSecondary(text);
    }
}