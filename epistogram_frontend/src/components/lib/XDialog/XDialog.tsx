import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { XDialogContext } from './XDialoContext';

export const useXDialogLogic = (key: string) => {

    const [isOpen, setIsOpen] = useState(false);

    return {
        key,
        isOpen,
        setIsOpen
    };
};

export type XDialogLogicType = ReturnType<typeof useXDialogLogic>;

export const XDialog = (props: {
    children: ReactNode,
    logic: XDialogLogicType
}) => {

    const { children, logic } = props;

    const {
        mountContent,
        unmountContent,
        getOpenState,
        openDialog,
        closeDialog,
        getHostElement
    } = useContext(XDialogContext);

    const isReallyOpen = getOpenState(logic.key);
    const hostElement = getHostElement(logic.key);

    // mount / unmount from content pool
    useEffect(() => {

        mountContent(logic.key);

        return () => {

            unmountContent(logic.key);
        };
    }, []);

    // open close dialog based on logic
    useEffect(() => {

        if (logic.isOpen) {

            openDialog(logic.key);
        }
        else {

            closeDialog();
        }
    }, [logic.isOpen]);

    // sync logic state with global state, 
    // since global state can change by itself 
    useEffect(() => {

        if (logic.isOpen != isReallyOpen)
            logic.setIsOpen(isReallyOpen);
    }, [isReallyOpen]);

    if (!hostElement)
        return <></>;

    return createPortal(children, hostElement);
};