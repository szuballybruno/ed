
export const getKeys = <T>(obj: T): (keyof T)[] => {

    const keys: any[] = [];
    for (const key in obj) {

        keys.push(key as keyof T);
    }

    return keys;
};

export const getKeyValues = <T>(obj: T) => {

    return Object
        .keys(obj as any)
        .map((key) => ({
            key: key as keyof T,
            value: (obj as any)[key]
        }));
};

const compareDatesWithoutTime = (dateA: Date, dateB: Date) => {

    return new Date(dateA).setHours(0, 0, 0, 0) === new Date(dateB).setHours(0, 0, 0, 0);
}

export const DateHelpers = {
    compareDatesWithoutTime
}

export const deepMergeObjects = (...objects: any[]) => {

    const isObject = (obj: any) => obj && typeof obj === 'object';

    return objects
        .reduce((prev, obj) => {

            Object
                .keys(obj)
                .forEach(key => {
                    const pVal = prev[key];
                    const oVal = obj[key];

                    if (isObject(pVal) && isObject(oVal)) {
                        prev[key] = deepMergeObjects(pVal, oVal);
                    }
                    else {
                        prev[key] = oVal;
                    }
                });

            return prev;
        }, {});
}

/**
 * Retruns if the value is in 
 * range specified by the threshold
 * example: value: 90, taget: 100, threshold: 20 -> true
 * since the range is now 80 - 120 and 90 is in it. 
 */
export const valueInRange = (value: number, target: number, threshold: number) => {

    if (value > target - threshold && value < target + threshold)
        return true;

    return false;
}