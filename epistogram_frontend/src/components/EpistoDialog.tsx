import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React, { ReactNode, useState } from "react";
import { DialogOptions } from "../models/types";

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
    buttons?: ReactNode,
    children?: ReactNode
}) => {

    const {
        isOpen,
        dialogOptions,
        closeDialog
    } = props.logic;

    const { children, buttons } = props;

    return <Dialog
        open={isOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{
            zIndex: 10000
        }}>

        <DialogTitle id="alert-dialog-title">
            {dialogOptions?.title}
        </DialogTitle>

        <DialogContent>
            {children}
        </DialogContent>

        <DialogActions>
            {buttons}
        </DialogActions>
    </Dialog>
}