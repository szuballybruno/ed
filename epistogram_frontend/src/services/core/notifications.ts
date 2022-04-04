import { useContext } from 'react';
import { toast, ToastOptions, ToastPosition } from 'react-toastify';
import { ErrorDialogContext } from '../../components/system/DialogFrame';

export type NotificationType = 'error' | 'info' | 'warning';

const defaultNotiProps = {
    position: 'bottom-right' as ToastPosition,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};

export const showNotification = (text: string, type?: NotificationType, options?: ToastOptions) => {

    toast(text, {
        ...defaultNotiProps,
        autoClose: type === undefined ? 2000 : 3000,
        type: type === 'warning' ? 'warning' : 'info',
        ...(options ?? {})
    });
};

export const useShowErrorDialog = () => {

    const errorDialogLogic = useContext(ErrorDialogContext)!;

    const showErrorDialog = (descriptionOrError: string | any, title?: string) => {

        const asAny = descriptionOrError as any;

        errorDialogLogic
            .openDialog({
                title: title ?? 'Hiba',
                description: asAny.message ?? asAny ?? 'Ismeretlen hiba, kerlek probald ujra kesobb!.'
            });
    };

    return showErrorDialog;
};