import { Flex } from "@chakra-ui/layout";
import { Close } from "@mui/icons-material";
import React, { ReactNode, useState } from "react";
import { ButtonType, DialogOptions } from "../models/types";
import { EpistoButton } from "./controls/EpistoButton";
import { EpistoHeader } from "./EpistoHeader";
import { useXDialogLogic, XDialog } from "./lib/XDialog/XDialog";

export const useEpistoDialogLogic = (key: string, dialogOptions?: DialogOptions) => {

    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState(dialogOptions?.title ?? "");
    const [description, setDescription] = useState(dialogOptions?.description ?? "");
    const defaultCloseButtonType = dialogOptions?.defaultCloseButtonType ?? "bottom";

    const closeDialog = () => {

        setIsOpen(false);
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

        setIsOpen(true);
    }

    return {
        isOpen,
        title,
        description,
        buttons,
        dialogOptions,
        openDialog,
        closeDialog,
        key
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

    const xlogic = useXDialogLogic(logic.key);

    return <XDialog
        logic={xlogic}>

        {/* title and content */}
        <Flex
            id="dialogTitle"
            direction="column"
            width="100%"
            overflow="hidden"
            minWidth="500px"
            height={fullScreenY ? "90vh" : undefined}
            position="relative">

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
        </Flex>

        {/* buttons */}
        {buttons.length > 0 && <>
            <Flex
                p="10px"
                flexDirection="row-reverse">

                {buttons
                    .map(x => <EpistoButton
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
    </XDialog>
}

{/* <Dialog
        open={isOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={fullScreenX ? "xl" : undefined}
        fullWidth={fullScreenX}

        sx={sx}
        style={{
            zIndex: 10000
            //background: "var(--transparentWhite90)"
        }}></Dialog> */}
