import { useEffect } from "react";
import { LagBehindNotificationDTO } from "../../shared/dtos/LagBehindNotificationDTO";
import { EpistoDialog, useEpistoDialogLogic } from "../EpistoDialog";

export const LagBehindNotificationEventHandler = (props: {
    data: LagBehindNotificationDTO | null
}) => {

    const { data } = props;

    const dialogLogic = useEpistoDialogLogic("lagbehind", {
        defaultCloseButtonType: "top"
    });

    useEffect(() => {

        if (!data)
            return;

        dialogLogic.openDialog();
    }, [data]);

    return <>
        <EpistoDialog logic={dialogLogic}>

            {data?.lagBehindPercentage}
        </EpistoDialog>
    </>
}