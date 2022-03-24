import { createContext, ReactNode } from "react";

type XDialogContextType = {
    openDialog: (key: string) => void,
    closeDialog: () => void,
    mountContent: (key: string, content: ReactNode) => void,
    unmountContent: (key: string) => void,
    getOpenState: (key: string) => boolean
};

export const XDialogContext = createContext<XDialogContextType>({} as any);
