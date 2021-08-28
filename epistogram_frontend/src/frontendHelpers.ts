import { useState } from "react";
import { useQuery } from "react-query";
import { ErrorType } from "./models/shared_models/types/sharedTypes";
import { LoadingStateType } from "./store/application/ApplicationRunningStateInterface";
import queryString from "query-string";

export const disallowWindowNavigation = () => {
    window.onbeforeunload = (event) => {
        const e = event || window.event;
        // Cancel the event
        e.preventDefault();
        if (e) {
            e.returnValue = ''; // Legacy method for cross browser support
        }
        return ''; // Legacy method for cross browser support
    };
}

export const usePaging = <T>(
    items: T[],
    onPreviousOverNavigation?: () => void,
    onNextOverNavigation?: () => void) => {

    const [currentItemIndex, setCurrentItemIndex] = useState(0);

    const isLast = currentItemIndex == items.length - 1;
    const isFirst = currentItemIndex == 0;
    const currentItem = items[currentItemIndex];

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


    return {
        next,
        previous,
        isLast,
        isFirst,
        currentIndex: currentItemIndex,
        currentItem
    }
}

export const getQueryParam = (name: string) => {

    const params = queryString.parse(window.location.search);
    return params[name] as string;
};

export type PagingType = ReturnType<typeof usePaging>;

export const useReactQuery = <T>(
    queryKey: any[],
    queryFunc: () => Promise<T>,
    enabled?: boolean) => {

    const queryResult = useQuery(
        queryKey,
        queryFunc, {
        retry: false,
        refetchOnWindowFocus: false,
        enabled: enabled
    });

    const { status, ...queryResult2 } = queryResult;

    return {
        status: status as LoadingStateType,
        ...queryResult2
    }
}

export const hasValue = (obj: any) => {

    return (!!obj || obj === false) && obj !== "";
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

    if (code == 400)
        return "bad request";

    if (code == 500)
        return "internal server error";

    if (code == 403)
        return "forbidden";

    return "http error";
}