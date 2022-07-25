import { useLocation, useParams, useSearchParams } from 'react-router-dom';

export const useIntParam = (name: string) => {

    const param = useParams()[name];
    if (!param)
        return null;

    return parseInt(param);
};

export const useStringParam = (name: string) => {

    const param = useParams()[name];
    if (!param)
        return null;

    return param;
};

export const useQueryVal = (name: string) => {

    const [query] = useSearchParams();
    const val = query.get(name);

    return val;
};

export const useBoolParam = (name: string) => {

    const params = useParams();
    const value = params[name];

    if (value !== 'true' && value !== 'false')
        throw new Error('Failed to parse boolean url param!');

    return value === 'true';
};

export const useSetQueryParams = () => {

    const location = useLocation();

    return (query: any) => {

        // window
        //     .history
        //     .pushState({
        //         query
        //         pathname: location.pathname,
        //         search: stringifyQueryObject(query)
        //     });
    };
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