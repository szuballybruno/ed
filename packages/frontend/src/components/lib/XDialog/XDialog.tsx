import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { useXDialogHosterContext } from './XDialoContext';
import { XDialogLogicType } from './XDialogLogic';

export const XDialog = ({
    children,
    logic
}: {
    children: ReactNode,
    logic: XDialogLogicType
}) => {

    const hostElementRef = useXDialogHosterContext().hosterRef.current;
    const renderContent = !logic.onlyRenderIfOpen || logic.isOpen;
    const contentIsHidden = !logic.onlyRenderIfOpen && !logic.isOpen;
    const handleClose = logic.closeDialog;

    if (!hostElementRef || !renderContent)
        return <></>;

    const content = (
        <EpistoFlex2
            zIndex="1000"
            position="absolute"
            width='100vw'
            height='100vh'
            align='center'
            justify='center'
            background='rgb(0,0,0,0.3)'
            display={contentIsHidden ? 'none' : undefined} >

            <div
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%'
                }}
                onClick={handleClose} />

            {children}
        </EpistoFlex2 >
    );

    return createPortal(content, hostElementRef);
};