import { useRef } from 'react';
import { ObjectComparer } from '../static/objectComparer';

/**
 * Memoize object by it's propery values 
 * rather than it's reference value
 * for example {} = {} will be equal, not like in react, where {} triggers a new update 
 */
const useMemoize = <T>(latestObject: T, onChange?: (changedProps: string[]) => void): T => {

    const latestObjectSafe = latestObject ?? {} as T;
    const ref = useRef(latestObjectSafe);

    // compare props
    const changedProps = ObjectComparer
        .compareObjects(ref.current, latestObjectSafe);

    // return old ref which won't 
    // cause rerenders down the line
    if (!changedProps.any())
        return ref.current;

    // update old ref 
    ref.current = latestObjectSafe;

    // call on change
    if (onChange)
        onChange(changedProps);

    // return new obejct's value
    return ref.current;
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