import { useState } from 'react';
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

export const HelperHooks = {
    useMemoize
};