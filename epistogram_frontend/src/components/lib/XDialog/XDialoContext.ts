import { createContext, useContext, useEffect } from 'react';
import { useForceUpdate } from '../../../static/frontendHelpers';
import { XDialogHoster } from './XDialogHoster';

export const XDialogHosterContext = createContext<XDialogHoster>({} as any);

export const useXDialogHosterContext = (key: string) => {

    const xDialogHoster = useContext(XDialogHosterContext);
    const forceUpdate = useForceUpdate();

    useEffect(() => {

        xDialogHoster
            .addOnUpdateListener(key, forceUpdate);

        return () => xDialogHoster
            .removeUpdateListener(key);
    }, []);

    return xDialogHoster;
};
