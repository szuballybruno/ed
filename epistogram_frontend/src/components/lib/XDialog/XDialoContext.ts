import { createContext, ReactNode } from 'react';

type XDialogContextType = {
    openDialog: (key: string) => void,
    closeDialog: () => void,
    mountContent: (key: string) => void,
    unmountContent: (key: string) => void,
    getOpenState: (key: string) => boolean,
    getHostElement: (key: string) => Element
};

export const XDialogContext = createContext<XDialogContextType>({} as any);
