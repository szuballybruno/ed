import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import React, { useState } from "react";

export type DialogOptions = {
    title: string,
    description: string,
    firstButtonTitle?: string,
    firstButtonAction?: () => void,
    secondButtonTitle?: string,
    secondButtonAction?: () => void
}

export const useDialogState = () => {

    const [description, setDescription] = useState<string>();
    const [firstButtonTitle, setFirstButtonTitle] = useState<string>();
    const [firstButtonAction, setFirstButtonAction] = useState<() => void>();
    const [secondButtonTitle, setSecondButtonTitle] = useState<string>();
    const [secondButtonAction, setSecondButtonAction] = useState<() => void>();
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState<string>();

    const showDialog = (options: DialogOptions) => {

        setTitle(options.title);
        setDescription(options.description);
        setFirstButtonTitle(options.firstButtonTitle);
        setFirstButtonAction(options.firstButtonAction);
        setSecondButtonTitle(options.secondButtonTitle);
        setSecondButtonAction(options.secondButtonAction);

        setIsOpen(true);
    }

    const closeDialog = () => {

        setIsOpen(false);
    }

    return {
        title,
        isOpen,
        closeDialog,
        showDialog,
        description,
        firstButtonTitle,
        firstButtonAction,
        secondButtonTitle,
        secondButtonAction,
    }
}

export type DialogStateType = ReturnType<typeof useDialogState>;

export const DialogContext = React.createContext<DialogStateType | null>(null);

export const DialogFrame = (props: {
    children: JSX.Element;
}) => {

    const dialogState = useDialogState();
    const { children } = props;

    const {
        isOpen,
        title,
        description,
        firstButtonAction,
        firstButtonTitle,
        secondButtonAction,
        secondButtonTitle,
        closeDialog
    } = dialogState

    return <>
        <Dialog
            open={isOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            style={{
                zIndex: 10000
            }}>
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {(!!firstButtonTitle) && <Button
                    color="primary"
                    onClick={() => {

                        closeDialog();

                        if (firstButtonAction)
                            firstButtonAction();
                    }}>
                    {firstButtonTitle}
                </Button>}

                {(!!secondButtonTitle) && <Button
                    onClick={() => {

                        closeDialog();

                        if (secondButtonAction)
                            secondButtonAction();
                    }}
                    color="primary"
                    autoFocus>
                    {secondButtonTitle}
                </Button>}
            </DialogActions>
        </Dialog>
        <DialogContext.Provider value={dialogState}>
            {children}
        </DialogContext.Provider>
    </>
}
