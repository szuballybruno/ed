import { useMediaQuery } from "@chakra-ui/react";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { matchPath, Route, useLocation } from "react-router-dom";
import { assetStorageUrl } from "./Environemnt";
import { ErrorType, UserRoleEnum } from "./models/shared_models/types/sharedTypes";
import { ApplicationRoute, LoadingStateType } from "./models/types";
import { translatableTexts } from "./translatableTexts";

export const dateTimeToString = (date: Date) => {

    if (!date)
        return "";

    if (isString(date))
        return new Date(date).toLocaleString();

    return date.toLocaleString();
}

export const getUrl = (path: string, params?: any, query?: any) => {

    let replacedPath = path;

    if (params) {
        for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {

                const element = params[key];
                const token = ":" + key;

                replacedPath = replacedPath.replace(token, element);
            }
        }
    }

    if (query) {

        replacedPath += stringifyQueryObject(query);
    }

    return replacedPath;
}

export const getRoleName = (roleId: number) => {

    if (roleId === UserRoleEnum.administratorId)
        return translatableTexts.roleNames.administrator;

    if (roleId === UserRoleEnum.supervisorId)
        return translatableTexts.roleNames.supervisor;

    return translatableTexts.roleNames.user;
}

export const roundNumber = (num: number, decimalPlaces?: number) => {

    if (!decimalPlaces)
        decimalPlaces = 1;

    const multiplier = decimalPlaces * 10;

    return Math.round(num * multiplier) / multiplier;
}

export const parseIntOrNull = (str: string) => {

    try {

        if (str === "" || str === null || str === undefined)
            str = "0";

        return parseInt(str);
    }
    catch (e) {

        return null;
    }
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

    const isMatchingCurrentRoute = (route: ApplicationRoute, exactOverride?: boolean) => {

        const match = matchPath(
            currentPath,
            {
                path: route.route,
                exact: exactOverride !== undefined ? exactOverride : !!route.exact,
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
    const advancedStatus = isFetching ? "loading" : status as LoadingStateType

    return {
        status: advancedStatus,
        refetch: async () => {

            await refetch();
        },
        data: data ?? null,
        ...queryResult2
    }
}

export const useReactQuery2 = <T>(
    url: string,
    queryFunc: (url: string) => Promise<T>,
    queryKey?: any[]) => {

    const queryResult = useQuery(
        [url, ...(queryKey ?? [])],
        () => queryFunc(url), {
        retry: false,
        refetchOnWindowFocus: false,
        keepPreviousData: true
    });

    const state = (queryResult.isIdle
        ? "idle"
        : queryResult.isFetching
            ? "loading"
            : queryResult.isError
                ? "error"
                : "success") as LoadingStateType;

    const refetch = async () => {

        await queryResult.refetch();
    };

    const result = {
        state,
        refetch,
        data: queryResult.data ?? null,
        error: queryResult.error
    };

    return result;
}

export const getAssetUrl = (path: string) => assetStorageUrl + ("/" + path).replace("//", "/");

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

export const stringifyQueryObject = (queryObj: any) => {

    let qs = "?";

    for (const key in queryObj) {
        if (Object.prototype.hasOwnProperty.call(queryObj, key)) {

            const element = queryObj[key];
            const andMark = qs === "?"
                ? ""
                : "&";

            if (element !== undefined && element !== null)
                qs += andMark + key + "=" + element;
        }
    }

    return qs;
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
