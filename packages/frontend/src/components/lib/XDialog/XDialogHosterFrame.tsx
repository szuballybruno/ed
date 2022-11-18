import { ReactNode, useMemo, useRef } from 'react';
import { XDialogContextType, XDialogHosterContext } from './XDialoContext';

export const XDialogHosterFrame = ({ children }: { children: ReactNode }) => {

    const hosterRef = useRef<HTMLDivElement>(null);

    const contextValue = useMemo<XDialogContextType>(() => ({
        hosterRef
    }), [
        hosterRef
    ]);

    return <>

        <XDialogHosterContext.Provider
            value={contextValue}>

            <div
                id="dialog_host_root"
                ref={hosterRef}>
            </div>

            {children}
        </XDialogHosterContext.Provider>
    </>;
};