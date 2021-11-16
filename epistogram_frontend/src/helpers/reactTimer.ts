import { useEffect, useMemo, useRef } from "react";
import { useForceUpdate } from "../frontendHelpers";
import { AdvancedTimer } from "./advancedTimer";

export const useReactTimer = (endCallback: () => void, delayMiliseconds: number, updateIntervalMiliseconds?: number) => {

    const forceUpdate = useForceUpdate();
    const callbackRef = useRef(endCallback);
    callbackRef.current = endCallback;
    const timer = useMemo(() => new AdvancedTimer(delayMiliseconds, () => callbackRef.current()), []);

    // const updateTimer = useMemo(() => {

    //     const updateTimer = new AdvancedTimer(updateIntervalMiliseconds ?? 50);

    //     const updateCallback = () => {

    //         forceUpdate();
    //         updateTimer.restart();
    //     };

    //     updateTimer.setEndCallback(updateCallback);

    //     return updateTimer;
    // }, []);

    // useEffect(() => {

    //     if (!updateTimer)
    //         return;

    //     if (timer.isRunning) {

    //         updateTimer.start();
    //     }
    //     else {

    //         updateTimer.reset();
    //     }
    // }, [timer.isRunning])

    const start = () => {

        timer.start();
        forceUpdate();
    }

    const pause = () => {

        timer.pause();
        forceUpdate();
    }

    const reset = () => {

        timer.reset();
        forceUpdate();
    }

    const restart = () => {

        timer.restart();
        forceUpdate();
    }

    return {
        isEnded: timer.isEnded,
        isIdle: timer.isIdle,
        isRunning: timer.isRunning,
        maxMiliseconds: timer.maxMiliseconds,
        totalElapsedMiliseconds: timer.getTotalElapsedMiliseconds(),
        remainingMiliseconds: timer.currentRemainingMiliseconds,
        start,
        pause,
        reset,
        restart
    }
}

export type ReactTimerType = ReturnType<typeof useReactTimer>;