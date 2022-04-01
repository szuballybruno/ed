import { Flex } from "@chakra-ui/layout";
import { Close } from "@mui/icons-material";
import React, { ReactNode, useState } from "react";
import { ButtonType, DialogOptions } from "../models/types";
import { EpistoButton } from "./controls/EpistoButton";
import { EpistoHeader } from "./EpistoHeader";
import { useXDialogLogic, XDialog } from "./lib/XDialog/XDialog";

export const useEpistoDialogLogic = (key: string, dialogOptions?: DialogOptions) => {

    const [title, setTitle] = useState(dialogOptions?.title ?? "");
    const [description, setDescription] = useState(dialogOptions?.description ?? "");
    const defaultCloseButtonType = dialogOptions?.defaultCloseButtonType ?? "bottom";
    const xlogic = useXDialogLogic(key);

    const closeDialog = () => {

        xlogic.setIsOpen(false);
    }

    const defaultButtons = defaultCloseButtonType === "bottom"
        ? [
            {
                title: "Bezárás",
                action: closeDialog
            }
        ]
        : [];

    const [buttons, setButtons] = useState<ButtonType[]>(defaultButtons
        .concat(dialogOptions?.buttons ?? []));

    const openDialog = (opt?: DialogOptions) => {

        if (opt) {

            if (opt.title)
                setTitle(opt.title);

            if (opt.description)
                setDescription(opt.description);

            if (opt.buttons)
                setButtons(defaultButtons.concat(opt.buttons ?? []));
        }

        xlogic.setIsOpen(true);
    }

    return {
        isOpen: xlogic.isOpen,
        title,
        description,
        buttons,
        dialogOptions,
        openDialog,
        closeDialog,
        xlogic
    }
}

export type EpistoDialogLogicType = ReturnType<typeof useEpistoDialogLogic>;

export const EpistoDialog = (props: {
    logic: EpistoDialogLogicType,
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
            width={fullScreenX ? "90%" : undefined}
            height={fullScreenY ? "90%" : undefined}
            overflow="hidden"
            position="relative"
            background="rgba(255,255,255,0.8)"
            backdropFilter="blur(10px)"
            borderRadius="7px"
            boxShadow="0px 0px 30px 50px rgba(0,0,0,0.2)">

            {title && <EpistoHeader
                margin="15px"
                text={title} />}

            {logic.dialogOptions?.defaultCloseButtonType === "top" && <Close
                onClick={closeDialog}
                style={{
                    color: "black",
                    margin: "15px",
                    cursor: "pointer",
                    position: "absolute",
                    zIndex: 9999,
                    right: 0,
                    top: 0
                }}>
                Bezárás
            </Close>}

            <Flex
                id="dialogContentFlex"
                padding={children ? "0px" : "10px"}
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
    </XDialog>
}
