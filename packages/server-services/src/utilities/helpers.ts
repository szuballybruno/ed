import { Id } from '@episto/commontypes';
import { XORMUtils } from '@episto/x-orm';
import moment from 'moment';
import { User } from '../models/entity/misc/User';
import { ClassType } from '../services/misc/advancedTypes/ClassType';
import { KeyofConstrained } from './misc';

export const snoozeAsync = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getFullName = (user: User) => toFullName(user.firstName, user.lastName);

export const toFullName = (firstName: string, lastName: string, culture?: 'en' | 'hu') => {

    if (culture === 'hu')
        return `${lastName} ${firstName}`;

    return `${firstName} ${lastName}`;
};

export const isXMinutesAgo = (date: Date, minutes: number) => {

    return moment(date)
        .add(minutes, 'minutes')
        .toDate() < new Date();
};

export const getJoinColumnName = <T>(c: ClassType<T>, prop: KeyofConstrained<T, Id<any> | null>) => {

    return {
        name: XORMUtils.toSQLSnakeCasing(prop as string)
    };
};

export const getJoinColumnInverseSide = <TCurrent>() => {

    return <TOther>(fn: (other: TOther) => TCurrent): ((other: TOther) => TCurrent) => {

        return fn;
    };
};

export function replaceAll(originalText: string, searchText: string, replaceText: string) {

    const result = originalText
        .split(searchText)
        .join(replaceText);

    return result;
}

export const newNotImplemented = (): Error => {

    throw new Error('Not implemented!');
    return {} as any;
};

/**
 * Encapsulation of JS's fucked up regex match syntax
 */
export const regexMatchAll = (text: string, regex: RegExp): string[] => {

    const matches = text.match(regex) ?? [] as string[];

    return matches.map(x => '' + x);
};

export const forN = <T>(iterations: number, action: (index: number) => T) => {

    const returnValues = [] as T[];
    for (let index = 0; index < iterations; index++) {

        returnValues.push(action(index));
    }

    return returnValues;
};

export const getRandomNumber = () => {

    return Math.random();
};

export const toSqlDate = (date: Date) => {

    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`;
};

export const trimTimeFromDate = (date: Date) => {

    date.setHours(0, 0, 0, 0);
    return date;
};

/** This will shift the Date with the UTC offset, 
 * so JS will think it's a UTC date, and won't convert it again. 
  */
export const fakeUtcShiftDate = (date: Date) => {

    const now_utc = Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds());

    return new Date(now_utc);
};

/**
 * Gets the difference between two dates in days
 * @param dateA First date
 * @param dateB Second date
 */
export const dateDiffInDays = (dateA: Date, dateB: Date) => {

    if (!dateA || !dateB)
        throw new Error('Date A or Date B is null or undefined!');

    // Discard the time and time-zone information.
    const utc1 = Date.UTC(dateA.getFullYear(), dateA.getMonth(), dateA.getDate());
    const utc2 = Date.UTC(dateB.getFullYear(), dateB.getMonth(), dateB.getDate());

    const timeDiff = Math.floor(utc2 - utc1);
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return daysDiff;
};

/**
 * Adds days to the specified date
 * @param date Date
 * @param number Number of days to be added
 */
export const addDays = (date: Date, number: number) => {

    const newDate = new Date(date);

    return new Date(newDate.setDate(newDate.getDate() + number));
};

/**
 * Adjusts the base with the amount specified in percentage
 * e.g.: 10 + 50% = 15
 * @param base 
 * @param percentage 
 * @returns 
 */
export const adjustByPercentage = (base: number, percentage: number) => {

    return base + base * percentage / 100;
};

/**
 * Calculates the difference in percentage between
 * two numbers
 * @param a
  */
export const relativeDiffInPercentage = (a: number, b: number) => {
    return -100 * (a - b) / ((a + b) / 2);
};

export const filterByProperty = <T extends Object, TKeyField extends keyof T>(
    arr: T[],
    searchKey: TKeyField,
    searchTerm: string | boolean | number | null
) => {

    if (searchTerm === null)
        return arr;

    if (searchTerm === false)
        return arr;

    return arr.filter(x => {

        const value = x[searchKey];

        if (typeof value === 'string' && typeof searchTerm === 'string')
            return value.toString()
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        if (typeof value === 'boolean' && typeof searchTerm === 'boolean')
            return value === searchTerm;

        if (typeof value === 'number' && typeof searchTerm === 'number')
            return value === searchTerm;
    });
};

export const orderByProperty = <T extends Object, TKeyField extends keyof T>(
    arr: T[],
    key: TKeyField,
    direction: 'asc' | 'desc'
) => {

    const sortByProperty = (key: TKeyField, direction: 'asc' | 'desc') => {
        return (a: T, b: T) => {

            const aValue = a[key];
            const bValue = b[key];

            if (typeof aValue !== 'string' || typeof bValue !== 'string')
                return 0;

            const aProp = aValue.toString()
                .toLowerCase();
            const bProp = bValue.toString()
                .toLowerCase();

            if (aProp < bProp && direction === 'asc')
                return -1;

            if (aProp < bProp && direction === 'desc')
                return 1;

            if (aProp > bProp && direction === 'asc')
                return 1;

            if (aProp > bProp && direction === 'desc')
                return -1;

            return 0;
        };
    };

    return arr.sort(sortByProperty(key, direction));
};

export const mergeArraysByKey = <TBase, TOther>(
    arr1: TBase[],
    arr2: TOther[],
    key: keyof TBase & keyof TOther
): (TBase & TOther)[] => {

    const map = new Map();

    arr1
        .forEach(item => map
            .set(item[key], item));

    arr2
        .forEach(item => map
            .set(item[key], {
                ...map.get(item[key]),
                ...item
            })
        );

    return Array.from(map.values());
};

export const getArrayAverage = (arr: number[]) => {

    return arr.reduce((a, b) => a + b, 0) / arr.length;
};

export const sleepAsync = (seconds: number) => {

    return new Promise<void>((resolve, reject) => {

        const handler = () => {

            resolve();
        };

        setTimeout(handler, seconds * 1000);
    });
};

/**
 * Make all properties in T optional
 */
export declare type OptionalEntity<TObject> = {
    [TProperty in keyof TObject]?: TObject[TProperty] | (() => string);
};

/**
 * Make all properties in T optional. Deep version.
 */
export declare type DeepOptionalEntity<TObject> = {
    [TProperty in keyof TObject]?: (TObject[TProperty] extends Array<infer U>
        ? Array<DeepOptionalEntity<U>>
        : TObject[TProperty] extends ReadonlyArray<infer U>
        ? ReadonlyArray<DeepOptionalEntity<U>>
        : DeepOptionalEntity<TObject[TProperty]>) | (() => string);
};