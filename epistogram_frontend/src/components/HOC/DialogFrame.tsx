import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React, { ReactNode, useState } from "react";

export type DialogOptions = {
    title: string,
    description: string,
    firstButtonTitle?: string,
    firstButtonAction?: () => void,
    secondButtonTitle?: string,
    secondButtonAction?: () => void
}

export const useDialogState = () => {

    const [dialogOptions, setDialogOptions] = useState<DialogOptions>();
    const [isOpen, setIsOpen] = useState(false);

    const showDialog = (options: DialogOptions) => {

        setDialogOptions(options);
        setIsOpen(true);
    }

    const closeDialog = () => {

        console.log("close dialog");
        setIsOpen(false);
    }

    return {
        dialogOptions,
        isOpen,
        closeDialog,
        showDialog
    }
}

export type DialogStateType = ReturnType<typeof useDialogState>;

export const DialogContext = React.createContext<DialogStateType | null>(null);

export const DialogFrame = (props: {
    children: ReactNode
}) => {

    const dialogState = useDialogState();
    const { children } = props;

    const {
        isOpen,
        dialogOptions,
        closeDialog
    } = dialogState;

    return <>
        <Dialog
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
                <DialogContentText id="alert-dialog-description">
                    {dialogOptions?.description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {dialogOptions?.firstButtonTitle && <Button
                    color="primary"
                    onClick={() => {

                        closeDialog();

                        if (dialogOptions?.firstButtonAction)
                            dialogOptions?.firstButtonAction();
                    }}>
                    {dialogOptions?.firstButtonTitle}
                </Button>}

                {dialogOptions?.secondButtonTitle && <Button
                    onClick={() => {

                        closeDialog();

                        if (dialogOptions.secondButtonAction)
                            dialogOptions.secondButtonAction();
                    }}
                    color="primary"
                    autoFocus>
                    {dialogOptions?.secondButtonTitle}
                </Button>}
            </DialogActions>
        </Dialog>

        <DialogContext.Provider value={dialogState}>
            {children}
        </DialogContext.Provider>
    </>
}
