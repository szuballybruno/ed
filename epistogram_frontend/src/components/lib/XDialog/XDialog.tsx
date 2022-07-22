import React, { ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { XDialogHosterContext } from './XDialoContext';

export const useXDialogLogic = (key: string) => {

    const xDialogHoster = useContext(XDialogHosterContext);

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

export const XDialog = (props: {
    children: ReactNode,
    logic: XDialogLogicType
}) => {

    const { children, logic } = props;
    const { getHostElement, mountContent, unmountContent } = logic;

    // mount / unmount from content pool
    useEffect(() => {

        mountContent();
        return unmountContent;
    }, []);

    const hostElement = getHostElement();

    console.log('--- XDialog update: ' + logic.key);

    console.log('host: ');
    console.log(hostElement);

    // render 
    if (!hostElement)
        return <></>;

    return createPortal(children as any, hostElement);
};