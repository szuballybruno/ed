import { useEffect, useMemo, useRef } from 'react';
import browser from '../services/core/browserSniffingService';
import { ObjectComparer } from '../static/objectComparer';

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

        const changedProps = ObjectComparer
            .compareObjects(refValue, mem);

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