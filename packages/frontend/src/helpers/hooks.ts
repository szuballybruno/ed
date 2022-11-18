import { useRef, useState } from 'react';
import { ObjectComparer } from '../static/objectComparer';

const useMemoize = <T>(latestObject: T, onChange?: (changedProps: string[]) => void): T => {

    const [memoizedObject, setMemoizedObject] = useState(latestObject);

    const changedProps = ObjectComparer
        .compareObjects(memoizedObject, latestObject);

    const isChanged = changedProps
        .any();

    if (isChanged) {

        setMemoizedObject(latestObject);

        if (onChange)
            onChange(changedProps);
    }

    return memoizedObject;
};

const useIsChanged = (value: any) => {

    const valueRef = useRef(value);
    const valueCahnged = valueRef.current !== value;
    valueRef.current = value;

    return valueCahnged;
};

export const HelperHooks = {
    useMemoize,
    useIsChanged
};