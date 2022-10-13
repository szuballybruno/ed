import React, { ReactNode } from 'react';
import { EpistoDialog } from '../universal/epistoDialog/EpistoDialog';
import { useEpistoDialogLogic } from '../universal/epistoDialog/EpistoDialogLogic';
import { EpistoDialogLogicType } from '../universal/epistoDialog/EpistoDialogTypes';

export type ErrorDialogProps = {
    descriptionOrError?: any,
    title?: string
};

export const ErrorDialogContext = React.createContext<EpistoDialogLogicType<ErrorDialogProps> | null>(null);

const ErrorDialog = ({ dialogLogic }: { dialogLogic: EpistoDialogLogicType<ErrorDialogProps> }) => {

    return <EpistoDialog
        closeButtonType='top'
        title={'Ismeretlen hiba'}
        description={({ descriptionOrError }) => descriptionOrError?.message
            ?? descriptionOrError
            ?? 'Ismeretlen hiba történt, kérlek próbáld újra később!'}
        logic={dialogLogic} >
    </EpistoDialog>;
};

export const ErrorDialogFrame = (props: {
    children: ReactNode
}) => {

    const dialogLogic = useEpistoDialogLogic<ErrorDialogProps>('errordialog');
    const { children } = props;

    return <>
        <ErrorDialog dialogLogic={dialogLogic}></ErrorDialog>

        <ErrorDialogContext.Provider value={dialogLogic}>
            {children}
        </ErrorDialogContext.Provider>
    </>;
};
