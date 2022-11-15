import { useEffect, useMemo, useRef } from 'react';
import { ObjectComparer } from '../static/objectComparer';

const useMemoize = <T>(obj: T, onChange?: (changedProps: string[]) => void): T => {

    const objPropsArray = Object
        .values(obj as any);

    const ref = useRef<T>(obj);
    const mem = useMemo(() => obj, [objPropsArray.length, ...objPropsArray]);

    useEffect(() => {

        const refValue = ref.current;

        const changedProps = ObjectComparer
            .compareObjects(refValue, mem);

        if (onChange)
            onChange(changedProps);

        ref.current = mem;
    }, [mem, ref, onChange]);

    return mem;
};

export const HelperHooks = {
    useMemoize
};