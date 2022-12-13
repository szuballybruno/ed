
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