import { useCallback, useMemo, useState } from 'react';

export const useXDialogLogic = (key: string, onlyRenderIfOpen: boolean) => {

    const [isOpen, setIsOpen] = useState(false);
    const openDialog = useCallback(() => setIsOpen(true), []);
    const closeDialog = useCallback(() => setIsOpen(false), []);

    const bundle = useMemo(() => ({
        key,
        isOpen,
        onlyRenderIfOpen,
        openDialog,
        closeDialog,
    }), [
        key,
        isOpen,
        onlyRenderIfOpen,
        openDialog,
        closeDialog
    ]);

    return bundle;
};

export type XDialogLogicType = ReturnType<typeof useXDialogLogic>;