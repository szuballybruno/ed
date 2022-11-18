import { useRef, useState } from 'react';
import { ObjectComparer } from '../static/objectComparer';

/**
 * Memoize object by it's propery values 
 * rather than it's reference value
 * for example {} = {} will be equal, not like in react, where {} triggers a new update 
 */
const useMemoize = <T>(latestObject: T, onChange?: (changedProps: string[]) => void): T => {

    const latestObjectSafe = latestObject ?? {} as T;
    const [memoizedObject, setMemoizedObject] = useState(latestObjectSafe);

    const changedProps = ObjectComparer
        .compareObjects(memoizedObject, latestObjectSafe);

    const isChanged = changedProps
        .any();

    if (isChanged) {

        setMemoizedObject(latestObjectSafe);

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