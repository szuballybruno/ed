import React, { ReactNode } from 'react';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoDialog } from '../universal/epistoDialog/EpistoDialog';
import { useEpistoDialogLogic } from '../universal/epistoDialog/EpistoDialogLogic';
import { EpistoDialogLogicType } from '../universal/epistoDialog/EpistoDialogTypes';

export const ErrorDialogContext = React.createContext<EpistoDialogLogicType | null>(null);

const ErrorDialog = ({ dialogLogic }: { dialogLogic: EpistoDialogLogicType }) => {

    return <EpistoDialog
        closeButtonType='top'
        title='Asd!'
        logic={dialogLogic}>

        <EpistoFlex2
            p='15px'
            width='400px'>

            An error has occured!
            Please try again later.
        </EpistoFlex2>
    </EpistoDialog>;
};

export const ErrorDialogFrame = (props: {
    children: ReactNode
}) => {

    const dialogLogic = useEpistoDialogLogic('errordialog');
    const { children } = props;

    return <>
        <ErrorDialog dialogLogic={dialogLogic}></ErrorDialog>

        <ErrorDialogContext.Provider value={dialogLogic}>
            {children}
        </ErrorDialogContext.Provider>
    </>;
};
