import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { XDialogLogicType } from './XDialogLogic';

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

    // render 
    if (!hostElement)
        return <></>;

    if (!logic.isOpen && logic.onlyRenderIfOpen)
        return <></>;

    return createPortal(children as any, hostElement);
};