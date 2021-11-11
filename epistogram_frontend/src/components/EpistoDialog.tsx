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

    const closeDialog = () => {

        setIsOpen(false);
    }

    const [buttons, setButtons] = useState<ButtonType[]>([]);

    const openDialog = (opt?: DialogOptions) => {

        if (opt) {

            if (opt.title)
                setTitle(opt.title);

            if (opt.description)
                setDescription(opt.description);

            let defaultButtons = [
                {
                    title: "Bezaras",
                    action: closeDialog
                }
            ];

            if (opt.buttons)
                defaultButtons = defaultButtons.concat(opt.buttons);

            setButtons(defaultButtons);
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
    showCloseButton?: boolean,
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

    const { children, showCloseButton, buttonComponents, fullScreenX, fullScreenY } = props;

    return <Dialog
        open={isOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={fullScreenX ? "xl" : undefined}
        fullWidth={fullScreenX}
        style={{
            zIndex: 10000
        }}>

        <Flex id="dialogTitle" direction="column" minWidth="500px" height={fullScreenY ? "90vh" : undefined}>

            <Flex justify="space-between">
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>

                {showCloseButton && <Close
                    onClick={closeDialog}
                    style={{ margin: "20px", cursor: "pointer" }}>
                    Bezaras
                </Close>}
            </Flex>

            <DialogContent style={{ padding: "0px" }}>
                {description && description}
                {children}
            </DialogContent>

        </Flex>

        <DialogActions>
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
        </DialogActions>
    </Dialog>
}
