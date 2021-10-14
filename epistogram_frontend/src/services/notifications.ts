import { useContext } from "react";
import { toast } from 'react-toastify';
import { DialogContext } from "../components/HOC/DialogFrame";

export type NotificationType = "error" | "info" | "warning";

export const showNotification = (text: string, type?: NotificationType) => {

    toast.info(
        text,
        {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
}

export const useDialog = () => {

    const dialogContext = useContext(DialogContext);

    return dialogContext!;
}

export const useShowErrorDialog = (title?: string) => {

    const { showDialog } = useDialog();

    const showErrorDialog = (descriptionOrError: string | any) => {

        const asAny = descriptionOrError as any;

        showDialog({
            title: title ?? "An error has occured.",
            description: asAny.message ?? asAny ?? "Unknown error.",
            secondButtonTitle: "Ok"
        });
    }

    return showErrorDialog;
}