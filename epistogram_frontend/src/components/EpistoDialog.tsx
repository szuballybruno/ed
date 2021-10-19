import { Flex } from "@chakra-ui/layout";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React, { ReactNode, useState } from "react";
import { DialogOptions } from "../models/types";
import { EpistoButton } from "./universal/EpistoButton";

export const useEpistoDialogLogic = (dialogOptions: DialogOptions) => {

    const [isOpen, setIsOpen] = useState(false);

    const openDialog = () => {

        setIsOpen(true);
    }

    const closeDialog = () => {

        setIsOpen(false);
    }

    return {
        isOpen,
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
    buttons?: ReactNode,
    children?: ReactNode
}) => {

    const {
        isOpen,
        dialogOptions,
        closeDialog
    } = props.logic;

    const { children, showCloseButton, buttons, fullScreenX, fullScreenY } = props;

    return <Dialog
        open={isOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={fullScreenX ? "xl" : undefined}
        fullWidth={fullScreenX}
        style={{
            zIndex: 10000
        }}>

        <Flex direction="column" height={fullScreenY ? "90vh" : undefined}>

            <Flex justify="space-between">
                <DialogTitle id="alert-dialog-title">
                    {dialogOptions?.title}
                </DialogTitle>

                {showCloseButton && <EpistoButton
                    onClick={closeDialog}
                    variant="outlined"
                    style={{ margin: "5px" }}>
                    Bezaras
                </EpistoButton>}
            </Flex>

            <DialogContent style={{ padding: "0px" }}>
                {children}
            </DialogContent>

        </Flex>

        <DialogActions>
            {buttons}
        </DialogActions>
    </Dialog>
}