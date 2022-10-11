import React, { ReactNode } from 'react';
import { EpistoFlex2 } from '../controls/EpistoFlex';
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

        <EpistoFlex2
            p='15px'
            width='400px'>

            An error has occured!
            Please try again later.
        </EpistoFlex2>
    </EpistoDialog >;
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
