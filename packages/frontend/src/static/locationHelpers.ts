import { XSafeObjectWrapper } from '@episto/commonlogic';
import { useCallback } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { ApplicationRoute } from '../models/types';
import { Navigator } from '../services/core/navigatior';

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

/**
 * @deprecated nono
 */
const _useRouteValues = <TParams, TQuery>(route: ApplicationRoute<TParams, TQuery>) => {

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

export const useRouteParams_OLD = <TParams, TQuery>(route: ApplicationRoute<TParams, TQuery>) => {

    return _useRouteValues(route).params;
};

export const useRouteQuery = <TParams, TQuery>(route: ApplicationRoute<TParams, TQuery>) => {

    return _useRouteValues(route).query;
};

const _parseUrlByTemplate = (currentUrl: string, route: ApplicationRoute<any, any>) => {

    const template = route.route.getAbsolutePath();
    const currentUrlSegments = currentUrl.split('/');
    const templateSegments = template.split('/');
    const params = {} as any;

    /**
     * Check if template segment lenght is greater than the url segment length,
     * this is a "fatal" error, so we return immediately  
     */
    if (templateSegments.length > currentUrlSegments.length)
        return {};

    const paramMatches = templateSegments
        .map((templateSegment, templateSegmentIndex) => {

            const urlSegment = currentUrlSegments[templateSegmentIndex];

            const isSegementParameter = templateSegment
                .startsWith(':');

            // parse parameter
            if (isSegementParameter) {

                const parameterKey = templateSegment
                    .replace(':', '');

                return {
                    value: urlSegment,
                    name: parameterKey
                };
            }

            // parse normal segment 
            else {

                const isMatchingUrlSegment = templateSegment === urlSegment;

                return isMatchingUrlSegment
                    ? 'notparam'
                    : 'mismatch';
            }
        });

    // mimatch error
    if (paramMatches.some(x => x === 'mismatch'))
        return {};

    // set param values 
    paramMatches
        .filter(x => x !== 'mismatch' && x !== 'notparam')
        .forEach((x: any) => {

            params[x.name] = x.value;
        });

    return params;
};

/**
 * Up to date solution to parse route params
 */
export const useRouteParams2 = <TParams, TQuery>(route: ApplicationRoute<TParams, TQuery>) => {

    // unused, just for UI update triggers 
    const _ = useLocation();
    const currentUrl = window.location.pathname;
    const paramsObj = _parseUrlByTemplate(currentUrl, route);

    return new XSafeObjectWrapper<TParams>(paramsObj);
};

export const useQueryParams = <TParams = any>() => {

    const [searchParams] = useSearchParams();

    const searchParamsObj = (() => {

        const query = {} as any;
        const keysIterator = searchParams.keys();

        let currentIter = keysIterator.next();
        while (!currentIter.done) {

            const key = currentIter.value;

            // HACKY! TODO
            if (key !== 'done' && key !== 'value') {

                query[key] = searchParams.get(key);
            }

            currentIter = keysIterator.next();
        }

        return query;
    })();

    return new XSafeObjectWrapper<TParams>(searchParamsObj as any);
};


export const useSetQueryParams = <TParmas = any>() => {

    const [, setSearchParams] = useSearchParams();
    const searchParams = useQueryParams().data;

    const setQueryParams = (key: keyof TParmas, value: string | null) => {

        // append param 
        if (value !== null) {

            const newParmas = { ...searchParams, [key]: value };
            setSearchParams(newParmas);
        }

        // remove param 
        else {

            const newParmas: any = { ...searchParams };
            delete newParmas[key];
            setSearchParams(newParmas);
        }
    };

    return { setQueryParams };
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

const _replaceRouteParam = <TParams>(
    route: ApplicationRoute<TParams, any>,
    paramKey: keyof TParams,
    paramValue: string) => {

    const currentUrl = window.location.pathname;
    const params = _parseUrlByTemplate(currentUrl, route);
    const oldParamValue = params[paramKey];

    if (oldParamValue === undefined)
        throw new Error(`Param key "${paramKey as any}" not found on parsed url!`);

    const fullRoute = route.route.getAbsolutePath();
    const paramToken = `:${paramKey as any}`;

    const replacedRouteCurrent = fullRoute
        .replace(paramToken, oldParamValue);

    const replacedRouteNew = fullRoute
        .replace(paramToken, paramValue);

    const newRoute = currentUrl
        .replace(replacedRouteCurrent, replacedRouteNew);

    return newRoute;
};

export const useSetRouteParam = <TParams>(
    route: ApplicationRoute<TParams, any>,
    paramKey: keyof TParams) => {

    const { hrefNavigate } = Navigator
        .useHrefNav();

    return {
        setRouteParam: useCallback((paramValue: string) => {

            const newRoute = _replaceRouteParam(route, paramKey, paramValue);
            hrefNavigate(newRoute);
        }, [route, paramKey, hrefNavigate])
    };
};

export const LocationHelpers = {
    useRouteParams2,
    useSetQueryParams,
    useQueryParams,
    useSetRouteParam
};