import { ReactNode, useCallback, useContext } from 'react';
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

export const showNotificationAdvanced = (content: ReactNode, opts?: ToastOptions) => {

    toast(content, opts);
};

export const killNotification = (id: number | string) => toast.dismiss(id); 

export const useShowErrorDialog = () => {

    const errorDialogLogic = useContext(ErrorDialogContext)!;

    const showErrorDialog = useCallback((descriptionOrError?: any, title?: string) => {

        console.error('Opening error dialog... ' + descriptionOrError);

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

export const useShowErrorDialog2 = () => {

    const showErrorDialog = useShowErrorDialog();

    return { showErrorDialog };
};