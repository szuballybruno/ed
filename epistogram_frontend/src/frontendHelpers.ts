import { useMediaQuery } from "@chakra-ui/react";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { matchPath, useLocation } from "react-router-dom";
import { globalConfig } from "./configuration/config";
import { ErrorType } from "./models/shared_models/types/sharedTypes";
import { LoadingStateType } from "./models/types";

export const dateTimeToString = (date: Date) => {

    if (!date)
        return "";

    if (isString(date))
        return new Date(date).toLocaleString();

    return date.toLocaleString();
}

export const toDateStringFormatted = (date: Date) => {

    // getting the index of the month 0-11
    const monthIndex = date.getMonth();
    // getting day of the month 1-31
    const dayIndex = date.getDate();

    return `${getMonthName(monthIndex)}. ${dayIndex}`;
}

export const daysUntil = (firstDate: Date, secondDate: Date) => {

    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffDays = Math.round(Math.abs(((firstDate as any) - (secondDate as any)) / oneDay));

    return diffDays;
}


/**
 * Gets the month name by monthIndex
 * @param index Index of the month from 0-11
 */
export const getMonthName = (index: number) => {

    return [
        "Jan",
        "Febr",
        "Márc",
        "Ápr",
        "Máj",
        "Jún",
        "Júl",
        "Aug",
        "Szept",
        "Okt",
        "Nov",
        "Dec"
    ][index];
}

export const disallowWindowNavigation = () => {
    window.onbeforeunload = (event) => {
        const e = event || window.event;
        // Cancel the event
        // e.preventDefault();
        if (e) {
            e.returnValue = ''; // Legacy method for cross browser support
        }
        return ''; // Legacy method for cross browser support
    };
}

export const useIsMatchingCurrentRoute = () => {

    const currentPath = useLocation().pathname;

    const isMatchingCurrentRoute = (route: string, exact?: boolean) => {

        const match = matchPath(
            currentPath,
            {
                path: route,
                exact: !!exact,
                strict: false
            });

        return !!match;
    };

    return isMatchingCurrentRoute;
}

export const isString = (obj: any) => typeof obj === 'string' || obj instanceof String;

export function distinct<T>(array: T[]) {

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    var unique = array.filter(onlyUnique);

    return unique;
}

export const usePaging = <T>(
    items: T[],
    onPreviousOverNavigation?: () => void,
    onNextOverNavigation?: () => void) => {

    if (!hasValue(items))
        throw new Error("Cannot page a null or undefined items collection!");

    const [currentItemIndex, setCurrentItemIndex] = useState(0);

    const isLast = currentItemIndex === items.length - 1;
    const isFirst = currentItemIndex === 0;
    const currentItem = items[currentItemIndex] as T | null;

    const next = () => {

        if (isLast) {

            if (onNextOverNavigation)
                onNextOverNavigation();
        } else {

            setCurrentItemIndex(currentItemIndex + 1);
        }
    }

    const previous = () => {

        if (isFirst) {

            if (onPreviousOverNavigation)
                onPreviousOverNavigation();
        } else {

            setCurrentItemIndex(currentItemIndex - 1);
        }
    }

    const setItem = (itemIndex: number) => {

        if (itemIndex < 0)
            throw new Error("Item index is less than 0!");

        if (itemIndex > items.length - 1)
            throw new Error("Item index is more than the length of the items collection!");

        setCurrentItemIndex(itemIndex);
    }

    const jumpToLast = () => {

        setItem(items.length - 1);
    }

    return {
        items,
        next,
        previous,
        isLast,
        isFirst,
        currentIndex: currentItemIndex,
        currentItem,
        setItem,
        jumpToLast
    } as PagingType<T>;
}

export type PagingType<T> = {

    next: () => void;
    previous: () => void;
    setItem: (itemIndex: number) => void;
    jumpToLast: () => void;

    items: T[];
    currentItem: T | null;

    isLast: boolean;
    isFirst: boolean;
    currentIndex: number;
};

export const getQueryParam = (name: string) => {

    const params = queryString.parse(window.location.search);
    return params[name] as string;
};


export const useIsDesktopView = () => {

    const [isDesktopView] = useMediaQuery("(min-width: 980px)")
    return isDesktopView;
}

export const useReactQuery = <T>(
    queryKey: any[],
    queryFunc: () => Promise<T>,
    enabled?: boolean) => {

    const isEnabled = enabled === true || enabled === undefined;

    const queryResult = useQuery(
        queryKey,
        queryFunc, {
        retry: false,
        refetchOnWindowFocus: false,
        enabled: isEnabled
    });

    const { status, refetch, isFetching, data, ...queryResult2 } = queryResult;

    return {
        status: isFetching ? "loading" : status as LoadingStateType,
        refetch: async () => {

            await refetch();
        },
        data: data ?? null,
        ...queryResult2
    }
}

export const getAssetUrl = (path: string) => globalConfig.assetStorageUrl + ("/" + path).replace("//", "/");

export const hasValue = (obj: any) => {

    if (obj === undefined)
        return false;

    if (obj === null)
        return false;

    if (obj === "")
        return false;

    return true;
}

export const reloadPage = () => window.location.reload();

export const isBetweenThreshold = (valueA: number, valueB: number, threshold: number) => {

    return (valueA - threshold) < valueB && valueB < (valueA + threshold);
}

export const getRandomInteger = (min: number, max: number) => {

    return Math.floor(Math.random() * (max - min)) + min;
}

export const secondsToTime = (e: any) => {
    let h = Math.floor(e / 3600).toString().padStart(2, '0'),
        m = Math.floor(e % 3600 / 60).toString().padStart(2, '0'),
        s = Math.floor(e % 60).toString().padStart(2, '0');

    return h !== '00' ? h + ':' + m + ':' + s : m + ':' + s;
}

export const isArray = (obj: any) => {

    return Array.isArray(obj);
}

export const objToArray = (obj: any) => {

    const properties = [] as any[];

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {

            const element = obj[key];
            properties.push(element);
        }
    }

    return properties;
}

export const isCurrentRoute = (route: string) => window.location.pathname === route;

export class TypedError extends Error {

    errorType: ErrorType;

    constructor(message: string, errorType: ErrorType) {

        super(message);
        this.errorType = errorType;
    }
}

export const getEventValueCallback = (callback: (value: any) => void) => {

    const inputChangeHandler = (e: React.ChangeEvent<{ value: unknown, name?: string }>) => {

        callback(e.currentTarget.value);
    }

    return inputChangeHandler;
}

export const getEventFileCallback = (callback: (value: any) => void) => {

    const inputChangeHandler = (e: React.ChangeEvent<{ files: unknown, name?: string }>) => {

        callback(e.currentTarget.files);
    }

    return inputChangeHandler;
}

export const getErrorTypeByHTTPCode = (code: number): ErrorType => {

    if (code === 400)
        return "bad request";

    if (code === 500)
        return "internal server error";

    if (code === 403)
        return "forbidden";

    return "http error";
}

export const useTimer = (callback: () => void, delayMiliseconds: number) => {

    const [isRunning, setIsRunning] = useState(false);
    const [timer,] = useState<Timer>(createTimer(callback, setIsRunning, delayMiliseconds));

    return {
        ...timer!,
        isRunning
    }
}

export const createTimer = (callback: () => void, onIsRunningChanged: (isRunning: boolean) => void, delayMiliseconds: number) => {

    let remainingMiliseconds = delayMiliseconds;
    let isEnded = false;
    let timeoutRef = null as null | NodeJS.Timeout;
    let startTime = null as Date | null;
    let isRunning = false;

    const getCurrentElapsedMiliseconds = () => {

        if (!startTime)
            return 0;

        return Math.abs(new Date().getTime() - startTime.getTime());
    }

    const handleIsRunningChanged = (isRunninga: boolean) => {

        isRunning = isRunninga;
        onIsRunningChanged(isRunninga);
    }

    const stop = () => {

        if (!timeoutRef || isEnded)
            return;

        const remainingMilisecs = remainingMiliseconds - getCurrentElapsedMiliseconds();

        console.log("Stopping timer... remaining secs: " + remainingMilisecs);

        handleIsRunningChanged(false);
        clearTimeout(timeoutRef);
        remainingMiliseconds = remainingMilisecs;
    }

    const start = () => {

        if (isRunning || isEnded)
            return;

        console.log("Starting timer... remaining secs: " + remainingMiliseconds);

        const timeout = setTimeout(() => {

            stop();
            isEnded = true;
            callback();
        }, remainingMiliseconds);

        handleIsRunningChanged(true);
        startTime = new Date();
        timeoutRef = timeout;
    }

    const restart = () => {

        if (isRunning)
            return;

        isEnded = false;
        remainingMiliseconds = delayMiliseconds;

        console.log("Restarting timer... " + remainingMiliseconds);

        start();
    }

    return {
        restart,
        start,
        stop
    }
}

export type Timer = ReturnType<typeof createTimer>;
