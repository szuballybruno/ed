const compareObjects = (oldObject: any, currentObject: any) => {

    const changedProps = Object
        .keys(currentObject)
        .concat(Object.keys(oldObject))
        .groupBy(x => x)
        .map(x => x.key)
        .filter(k => {

            const newVal = currentObject[k];
            const oldVal = oldObject[k];
            const equal = newVal === oldVal;

            return !equal;
        });

    return changedProps;
};

const isEqual = (oldObject: any, currentObject: any, callback?: (changedProps: string[]) => void) => {

    const changedProps = compareObjects(oldObject, currentObject);

    if (callback)
        callback(changedProps);

    return changedProps.none();
};

export const ObjectComparer = {
    compareObjects,
    isEqual
};