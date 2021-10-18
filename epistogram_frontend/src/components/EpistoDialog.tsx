import { Flex } from "@chakra-ui/layout";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
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
    height?: string,
    showCloseButton?: boolean,
    buttons?: ReactNode,
    children?: ReactNode
}) => {

    const {
        isOpen,
        dialogOptions,
        closeDialog
    } = props.logic;

    const { children, showCloseButton, buttons, height } = props;

    return <Dialog
        open={isOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
        style={{
            zIndex: 10000,
        }}>

        <Flex direction="column" height={height}>

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

            <DialogContent>
                {children}
            </DialogContent>

        </Flex>

        <DialogActions>
            {buttons}
        </DialogActions>
    </Dialog>
}