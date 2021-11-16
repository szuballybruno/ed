
export class AdvancedTimer {

    private _timeoutRef: NodeJS.Timeout | null;
    private _startTime: Date | null;
    private _endCallback: null | (() => void);

    currentRemainingMiliseconds: number;
    maxMiliseconds: number;
    isEnded: boolean;
    isRunning: boolean;
    isIdle: boolean;

    constructor(maxMiliseconds: number, endCallback?: () => void) {

        this.currentRemainingMiliseconds = maxMiliseconds;
        this._timeoutRef = null;
        this._startTime = null;
        this._endCallback = endCallback ?? null;

        this.maxMiliseconds = maxMiliseconds;
        this.isEnded = false;
        this.isRunning = false;
        this.isIdle = true;
    }

    setEndCallback = (callback: () => void) => {

        this._endCallback = callback;
    }

    getTotalElapsedMiliseconds = () => {

        const currentRemainingMilisecs = this.currentRemainingMiliseconds - (this.isRunning ? this.getCurrentElapsedMiliseconds() : 0);
        return this.maxMiliseconds - currentRemainingMilisecs;
    }

    pause = () => {

        if (!this._timeoutRef || this.isEnded)
            return;

        clearTimeout(this._timeoutRef);

        this.currentRemainingMiliseconds = this.currentRemainingMiliseconds - this.getCurrentElapsedMiliseconds();
        this.isRunning = false;
    }

    start = () => {

        if (this.isRunning || this.isEnded)
            return;

        const timeout = setTimeout(() => {

            this.pause();
            this.isEnded = true;

            if (this._endCallback)
                this._endCallback();
        }, this.currentRemainingMiliseconds);

        this.isRunning = true;
        this.isIdle = false;
        this._startTime = new Date();
        this._timeoutRef = timeout;
    }

    reset = () => {

        if (!this._timeoutRef)
            return;

        clearTimeout(this._timeoutRef);

        this.isRunning = false;
        this.isEnded = false;
        this.isIdle = true;
        this.currentRemainingMiliseconds = this.maxMiliseconds;
    }

    restart = () => {

        if (this.isRunning)
            return;

        this.reset();
        this.start();
    }

    private getCurrentElapsedMiliseconds = () => {

        if (!this._startTime)
            return 0;

        return Math.abs(new Date().getTime() - this._startTime.getTime());
    }
}