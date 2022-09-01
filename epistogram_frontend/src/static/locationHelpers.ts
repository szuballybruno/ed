import { useParams, useSearchParams } from 'react-router-dom';
import { ApplicationRoute } from '../models/types';
import { XSafeObjectWrapper } from '../shared/logic/XSafeObjectWrapper';

/**
 * @deprecated use "useRouteParams" 
 */
export const useIntParam = (name: string): number | null => {

    const param = useParams()[name];
    if (!param)
        return null;

    const parsed = parseInt(param);

    if (Number.isNaN(parsed))
        throw new Error(`Parsing int param "${name}" failed.`);

    return parsed;
};

export const useRouteParams = <TParams, TQuery>(route: ApplicationRoute<TParams, TQuery>) => {

    return useRouteValues(route).params;
};

export const useRouteQuery = <TParams, TQuery>(route: ApplicationRoute<TParams, TQuery>) => {

    return useRouteValues(route).query;
};

export const useRouteValues = <TParams, TQuery>(route: ApplicationRoute<TParams, TQuery>) => {

    const queryObj = useSearchParams()[0];
    const query = {} as any;
    const keysIterator = queryObj.keys();

    let result = keysIterator.next();
    while (!result.done) {

        const key = result.value;
        query[key] = queryObj.get(key);
        result = keysIterator.next();
    }

    const params = useParams();

    return {
        params: new XSafeObjectWrapper<TParams>(params as any),
        query: new XSafeObjectWrapper<TQuery>(query as any)
    };
};

/**
 * @deprecated use "useRouteParams" 
 */
export const useStringParam = (name: string) => {

    const param = useParams()[name];
    if (!param)
        return null;

    return param;
};

/**
 * @deprecated use "useRouteParams" 
 */
export const useQueryVal = (name: string) => {

    const [query] = useSearchParams();
    const val = query.get(name);

    return val;
};

/**
 * @deprecated use "useRouteParams" 
 */
export const useBoolParam = (name: string) => {

    const params = useParams();
    const value = params[name];

    if (value !== 'true' && value !== 'false')
        throw new Error('Failed to parse boolean url param!');

    return value === 'true';
};

export const stringifyQueryObject = (queryObj: any) => {

    let qs = '?';

    for (const key in queryObj) {
        if (Object.prototype.hasOwnProperty.call(queryObj, key)) {

            const element = queryObj[key];
            const andMark = qs === '?'
                ? ''
                : '&';

            if (element !== undefined && element !== null)
                qs += andMark + key + '=' + element;
        }
    }

    return qs;
};