import { createContext, RefObject, useContext } from 'react';

export type XDialogContextType = {
    hosterRef: RefObject<HTMLDivElement>
}

export const XDialogHosterContext = createContext<XDialogContextType>({} as any);

export const useXDialogHosterContext = () => useContext(XDialogHosterContext);
