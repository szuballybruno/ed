import { Flex } from '@chakra-ui/layout';
import { Close } from '@mui/icons-material';
import React, { ReactNode } from 'react';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoHeader } from '../../EpistoHeader';
import { XDialog } from '../../lib/XDialog/XDialog';
import { EpistoDialogLogicType } from './EpistoDialogTypes';

export const EpistoDialog = <TParams = any>(props: {
    closeButtonType?: 'bottom' | 'top',
    logic: EpistoDialogLogicType<TParams>,
    fullScreenX?: boolean,
    fullScreenY?: boolean,
    buttonComponents?: ReactNode,
    children?: ReactNode,
    title?: string,
    description?: string
}) => {

    const dialogLogic = props.logic;

    const {
        closeButtonType,
        children, logic,
        buttonComponents,
        fullScreenX,
        fullScreenY
    } = props;

    const dialogButtons = props.logic.buttons
        .concat(closeButtonType === 'bottom'
            ? [
                {
                    title: 'Bezárás',
                    action: (x: EpistoDialogLogicType<TParams>) => dialogLogic.closeDialog()
                }
            ]
            : []);

    const { title, description } = props;

    return <XDialog
        logic={logic.xlogic}>

        {/* episto dialog root */}
        <Flex
            id="episto_dialog_root"
            direction="column"
            width={fullScreenX ? '90%' : undefined}
            height={fullScreenY ? '90%' : undefined}
            overflow="hidden"
            position="relative"
            background="rgba(255,255,255,0.8)"
            backdropFilter="blur(10px)"
            borderRadius="7px"
            boxShadow="0px 0px 30px 0px rgb(0 0 0 / 20%)">

            {title && <EpistoHeader
                margin="15px"
                text={title} />}

            {closeButtonType === 'top' && <Close
                onClick={dialogLogic.closeDialog}
                style={{
                    color: 'black',
                    margin: '15px',
                    cursor: 'pointer',
                    position: 'absolute',
                    zIndex: 9999,
                    right: 0,
                    top: 0
                }}>
                Bezárás
            </Close>}

            <Flex
                id="dialogContentFlex"
                padding={children ? '0px' : '10px'}
                flex="1"
                minHeight="70px">

                {/* simple text content */}
                {description && description}

                {/* react node contnet */}
                {children}
            </Flex>

            {/* buttons */}
            {dialogButtons.length > 0 && <>
                <Flex
                    p="10px"
                    flexDirection="row-reverse">

                    {dialogButtons
                        .map((x, index) => <EpistoButton
                            key={index}
                            variant="outlined"
                            onClick={() => {

                                if (x.action)
                                    x.action(logic);

                                dialogLogic.closeDialog();
                            }}>
                            {x.title}
                        </EpistoButton>)}
                    {buttonComponents}
                </Flex>
            </>}
        </Flex>
    </XDialog>;
};
