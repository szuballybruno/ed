import { Flex } from "@chakra-ui/layout";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React, { ReactNode, useState } from "react";
import { ButtonType, DialogOptions } from "../models/types";
import { EpistoButton } from "./universal/EpistoButton";
import { Close } from "@mui/icons-material";

export const useEpistoDialogLogic = (dialogOptions?: DialogOptions) => {

    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState(dialogOptions?.title ?? "");
    const [description, setDescription] = useState(dialogOptions?.description ?? "");
    const defaultCloseButtonType = dialogOptions?.defaultCloseButtonType ?? "bottom";

    const closeDialog = () => {

        setIsOpen(false);
    }

    const [buttons, setButtons] = useState<ButtonType[]>(defaultCloseButtonType === "bottom"
        ? [
            {
                title: "Bezaras",
                action: closeDialog
            }
        ]
        : []);

    const openDialog = (opt?: DialogOptions) => {

        if (opt) {

            if (opt.title)
                setTitle(opt.title);

            if (opt.description)
                setDescription(opt.description);

            if (opt.buttons)
                setButtons(buttons.concat(opt.buttons ?? []));
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
        closeDialog
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
        isOpen,
        title,
        description,
        buttons,
        closeDialog,
    } = props.logic;

    const { children, logic, buttonComponents, fullScreenX, fullScreenY } = props;

    return <Dialog
        open={isOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={fullScreenX ? "xl" : undefined}
        fullWidth={fullScreenX}
        style={{
            zIndex: 10000
        }}>

        {/* title and content */}
        <Flex
            id="dialogTitle"
            direction="column"
            minWidth="500px"
            height={fullScreenY ? "90vh" : undefined}
            position="relative">

            {title && <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>}

            {logic.dialogOptions?.defaultCloseButtonType === "top" && <Close
                onClick={closeDialog}
                style={{
                    margin: "15px",
                    cursor: "pointer",
                    position: "absolute",
                    right: 0,
                    top: 0
                }}>
                Bezaras
            </Close>}

            <DialogContent style={{ padding: "10px 0px 10px 0px" }}>
                {description && description}
                {children}
            </DialogContent>
        </Flex>

        {/* buttons */}
        {buttons.length > 0 && <Flex p="10px" flexDirection="row-reverse">
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
        </Flex>}
    </Dialog>
}
