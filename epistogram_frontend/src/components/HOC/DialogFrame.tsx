import React, { ReactNode } from "react";
import { EpistoDialog, EpistoDialogLogicType, useEpistoDialogLogic } from "../EpistoDialog";

export const ErrorDialogContext = React.createContext<EpistoDialogLogicType | null>(null);

export const ErrorDialogFrame = (props: {
    children: ReactNode
}) => {

    const dialogLogic = useEpistoDialogLogic();
    const { children } = props;

    return <>
        <EpistoDialog logic={dialogLogic}></EpistoDialog>

        <ErrorDialogContext.Provider value={dialogLogic}>
            {children}
        </ErrorDialogContext.Provider>
    </>
}
