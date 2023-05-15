import { ErrorOutline } from '@mui/icons-material';
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
        title={({ title }) => title
            ? title
            : 'Ismeretlen hiba'}
        logic={dialogLogic} >

        <EpistoFlex2
            align='center'
            p='0 15px 15px 15px'>

            <EpistoFlex2
                align='center'
                height='100%'
                width='70px'>

                <ErrorOutline
                    style={{
                        width: '50px',
                        height: '50px'
                    }} />
            </EpistoFlex2>

            <EpistoFlex2>

                {dialogLogic?.params?.descriptionOrError
                    ? dialogLogic.params.descriptionOrError
                    : 'Ismeretlen hiba történt, kérlek próbáld újra később!'}
            </EpistoFlex2>
        </EpistoFlex2>
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
