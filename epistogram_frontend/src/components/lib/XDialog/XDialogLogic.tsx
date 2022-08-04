import { useXDialogHosterContext } from './XDialoContext';

export const useXDialogLogic = (key: string) => {

    const xDialogHoster = useXDialogHosterContext(key);

    const isOpen = xDialogHoster.getOpenState(key);

    const openDialog = () => xDialogHoster.openDialog(key);

    const closeDialog = () => xDialogHoster.closeDialog(key);

    const mountContent = () => xDialogHoster.mountContent(key);

    const unmountContent = () => xDialogHoster.unmountContent(key);

    const getHostElement = () => xDialogHoster.getHostElement(key);

    const bundle = {
        key,
        isOpen,
        openDialog,
        closeDialog,
        mountContent,
        unmountContent,
        getHostElement
    };

    return bundle;
};

export type XDialogLogicType = ReturnType<typeof useXDialogLogic>;