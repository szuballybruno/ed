import { useContext } from "react";
import { toast } from 'react-toastify';
import { ErrorDialogContext } from "../components/system/DialogFrame";

export type NotificationType = "error" | "info" | "warning";

export const showNotification = (text: string, type?: NotificationType) => {

    toast.info(
        text,
        {
            position: "bottom-right",
            autoClose: type === undefined ? 2000 : 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            type: type === "warning" ? "warning" : "info"
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