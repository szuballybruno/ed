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

export const showNotification = (text: string, opt?: {
    type?: NotificationType,
    autoCloseMs?: number,
    options?: ToastOptions
}) => {

    toast(text, {
        ...defaultNotiProps,
        autoClose: opt?.autoCloseMs
            ? opt.autoCloseMs
            : opt?.type === undefined
                ? 2000
                : 3000,
        type: opt?.type === 'warning' ? 'warning' : 'info',
        ...(opt?.options ?? {})
    });
};

export const useShowErrorDialog = () => {

    const errorDialogLogic = useContext(ErrorDialogContext)!;

    const showErrorDialog = useCallback((descriptionOrError?: any, title?: string) => {

        errorDialogLogic
            .openDialog({
                title: title ?? 'Ismeretlen hiba',
                description: descriptionOrError?.message
                    ?? descriptionOrError
                    ?? 'Ismeretlen hiba történt, kérlek próbáld újra később!'
            });
    }, [errorDialogLogic]);

    return showErrorDialog;
};