import { Flex } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { EpistoDialog } from '../universal/epistoDialog/EpistoDialog';
import { useEpistoDialogLogic } from '../universal/epistoDialog/EpistoDialogLogic';
import { EpistoDialogLogicType } from '../universal/epistoDialog/EpistoDialogTypes';

export const ErrorDialogContext = React.createContext<EpistoDialogLogicType | null>(null);

export const ErrorDialogFrame = (props: {
    children: ReactNode
}) => {

    const dialogLogic = useEpistoDialogLogic('errordialog');
    const { children } = props;

    return <>
        <EpistoDialog

            closeButtonType='top'
            title={dialogLogic.title}
            logic={dialogLogic}>

            <Flex
                p='15px'
                width='400px'>

                {dialogLogic.description}
            </Flex>
        </EpistoDialog>

        <ErrorDialogContext.Provider value={dialogLogic}>
            {children}
        </ErrorDialogContext.Provider>
    </>;
};
