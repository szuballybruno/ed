import { Flex } from '@chakra-ui/layout';
import { Close } from '@mui/icons-material';
import React, { ReactNode, useState } from 'react';
import { ButtonType, DialogOptions } from '../models/types';
import { EpistoButton } from './controls/EpistoButton';
import { EpistoHeader } from './EpistoHeader';
import { useXDialogLogic, XDialog, XDialogLogicType } from './lib/XDialog/XDialog';

export const useEpistoDialogLogic = <TParams = any,>(key: string, dialogOptions?: DialogOptions<TParams>): EpistoDialogLogicType<TParams> => {

    const [title, setTitle] = useState(dialogOptions?.title ?? '');
    const [description, setDescription] = useState(dialogOptions?.description ?? '');
    const [params, setParams] = useState(dialogOptions?.params);
    const defaultCloseButtonType = dialogOptions?.defaultCloseButtonType ?? 'bottom';
    const xlogic = useXDialogLogic(key);

    const closeDialog = () => {

        xlogic.setIsOpen(false);
    };

    const defaultButtons = defaultCloseButtonType === 'bottom'
        ? [
            {
                title: 'Bezárás',
                action: closeDialog
            }
        ]
        : [];

    const [buttons, setButtons] = useState<ButtonType[]>(defaultButtons
        .concat(dialogOptions?.buttons ?? []));

    const openDialog = (opt?: DialogOptions<TParams>) => {

        if (opt) {

            if (opt.title)
                setTitle(opt.title);

            if (opt.description)
                setDescription(opt.description);

            if (opt.buttons)
                setButtons(defaultButtons.concat(opt.buttons ?? []));

            if (opt.params)
                setParams(opt.params);
        }

        xlogic.setIsOpen(true);
    };

    return {
        isOpen: xlogic.isOpen,
        title,
        description,
        buttons,
        params,
        dialogOptions,
        openDialog,
        closeDialog,
        xlogic
    };
};

export type EpistoDialogLogicType<TParams = any> = {
    isOpen: boolean;
    title: string;
    description: string;
    buttons: any;
    params?: TParams;
    dialogOptions: any;
    openDialog: any;
    closeDialog: any;
    xlogic: XDialogLogicType;
};

export const EpistoDialog = <TParams = any>(props: {
    logic: EpistoDialogLogicType<TParams>,
    fullScreenX?: boolean,
    fullScreenY?: boolean,
    buttonComponents?: ReactNode,
    children?: ReactNode
}) => {

    const {
        title,
        description,
        buttons,
        closeDialog,
    } = props.logic;

    const { children, logic, buttonComponents, fullScreenX, fullScreenY } = props;

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
            boxShadow="0px 0px 30px 50px rgba(0,0,0,0.2)">

            {title && <EpistoHeader
                margin="15px"
                text={title} />}

            {logic.dialogOptions?.defaultCloseButtonType === 'top' && <Close
                onClick={closeDialog}
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
            {buttons.length > 0 && <>
                <Flex
                    p="10px"
                    flexDirection="row-reverse">

                    {buttons
                        .map((x, index) => <EpistoButton
                            key={index}
                            variant="outlined"
                            onClick={() => {

                                x.action();
                                closeDialog();
                            }}>
                            {x.title}
                        </EpistoButton>)}
                    {buttonComponents}
                </Flex>
            </>}
        </Flex>
    </XDialog>;
};
