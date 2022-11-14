import { useEffect, useMemo, useRef } from 'react';
import browser from '../services/core/browserSniffingService';

const useIsIPhone = () => {

    return { isIPhone: browser.isIPhone };
};

const useMemoize = <T>(obj: T, onChange?: (changedProps: string[]) => void): T => {

    const objPropsArray = Object
        .values(obj as any);

    const ref = useRef<T>(obj);
    const mem = useMemo(() => obj, [objPropsArray.length, ...objPropsArray]);

    useEffect(() => {

        const refValue = ref.current;

        const changedProps = Object
            .keys(mem as any)
            .concat(Object.keys(refValue as any))
            .groupBy(x => x)
            .map(x => x.key)
            .filter(k => {

                const newVal = mem[k];
                const oldVal = refValue[k];
                const equal = newVal === oldVal;

                return !equal;
            });

        if (onChange)
            onChange(changedProps);

        ref.current = mem;
    }, [mem, ref, onChange]);

    return mem;
};

export const HelperHooks = {
    useIsIPhone,
    useMemoize
};