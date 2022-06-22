import { useCallback, useContext } from 'react';
import { toast, ToastOptions, ToastPosition } from 'react-toastify';
import { ErrorDialogContext } from '../../components/system/ErrorDialogFrame';

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

    const showErrorDialog = useCallback((descriptionOrError?: any, title?: string) => {

        errorDialogLogic
            .openDialog({
                title: title ?? 'Hiba',
                description: descriptionOrError?.message
                    ?? descriptionOrError
                    ?? 'Ismeretlen hiba, kerlek probald ujra kesobb!.'
            });
    }, [errorDialogLogic]);

    return showErrorDialog;
};