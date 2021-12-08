import { ReactNode, useContext } from "react";
import { toast, ToastOptions, ToastPosition } from 'react-toastify';
import { ErrorDialogContext } from "../../components/system/DialogFrame";

export type NotificationType = "error" | "info" | "warning";

const defaultNotiProps = {
    position: "bottom-right" as ToastPosition,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}

export const showNotification = (text: string, type?: NotificationType, options?: ToastOptions) => {

    toast(text, {
        ...defaultNotiProps,
        autoClose: type === undefined ? 2000 : 3000,
        type: type === "warning" ? "warning" : "info",
        ...(options ?? {})
    });
}

export const useShowErrorDialog = (title?: string) => {

    const errorDialogLogic = useContext(ErrorDialogContext)!;

    const showErrorDialog = (descriptionOrError: string | any) => {

        const asAny = descriptionOrError as any;

        errorDialogLogic
            .openDialog({
                title: title ?? "An error has occured.",
                description: asAny.message ?? asAny ?? "Unknown error."
            });
    }

    return showErrorDialog;
}