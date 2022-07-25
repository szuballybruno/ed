import { useCallback, useMemo } from 'react';
import { useXDialogHosterContext } from './XDialoContext';

export const useXDialogLogic = (key: string) => {

    const xDialogHoster = useXDialogHosterContext(key);

    const isOpen = useMemo(() => xDialogHoster.getOpenState(key), [key, xDialogHoster.getOpenState]);

    const openDialog = useCallback(() => xDialogHoster.openDialog(key), [key, xDialogHoster.openDialog]);

    const closeDialog = useCallback(() => xDialogHoster.closeDialog(key), [key, xDialogHoster.closeDialog]);

    const mountContent = useCallback(() => xDialogHoster.mountContent(key), [key, xDialogHoster.mountContent]);

    const unmountContent = useCallback(() => xDialogHoster.unmountContent(key), [key, xDialogHoster.unmountContent]);

    const getHostElement = useCallback(() => xDialogHoster.getHostElement(key), [key, xDialogHoster.getHostElement]);

    const bundle = useMemo(() => ({
        key,
        isOpen,
        openDialog,
        closeDialog,
        mountContent,
        unmountContent,
        getHostElement
    }),
        [
            key,
            isOpen,
            openDialog,
            closeDialog,
            mountContent,
            unmountContent,
            getHostElement
        ]);

    return bundle;
};

export type XDialogLogicType = ReturnType<typeof useXDialogLogic>;