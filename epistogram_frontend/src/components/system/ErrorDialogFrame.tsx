import { Flex } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { EpistoDialog } from '../universal/epistoDialog/EpistoDialog';
import { useEpistoDialogLogic } from '../universal/epistoDialog/EpistoDialogLogic';
import { EpistoDialogLogicType } from '../universal/epistoDialog/EpistoDialogTypes';

export const ErrorDialogContext = React.createContext<EpistoDialogLogicType | null>(null);

const ErrorDialog = ({ logic }: { logic: EpistoDialogLogicType }) => {

    return <EpistoDialog logic={logic}>
        <Flex m="30px">
            An error has occured!
            Please try again later.
        </Flex>
    </EpistoDialog>;
};

export const ErrorDialogFrame = (props: {
    children: ReactNode
}) => {

    const dialogLogic = useEpistoDialogLogic('errordialog');
    const { children } = props;

    return <>
        <ErrorDialog logic={dialogLogic}></ErrorDialog>

        <ErrorDialogContext.Provider value={dialogLogic}>
            {children}
        </ErrorDialogContext.Provider>
    </>;
};
