import { useEffect } from 'react';
import { LagBehindNotificationDTO } from '../../shared/dtos/LagBehindNotificationDTO';
import { EpistoDialog } from '../universal/epistoDialog/EpistoDialog';
import { useEpistoDialogLogic } from '../universal/epistoDialog/EpistoDialogLogic';

export const LagBehindNotificationEventHandler = (props: {
    data: LagBehindNotificationDTO | null,
    key: any
}) => {

    const { data, key } = props;

    const dialogLogic = useEpistoDialogLogic('lagbehind', {
        defaultCloseButtonType: 'top'
    });

    useEffect(() => {

        if (!data)
            return;

        dialogLogic.openDialog();
    }, [data]);

    return <>
        <EpistoDialog
            key={key}
            logic={dialogLogic}>

            {data?.lagBehindPercentage}
        </EpistoDialog>
    </>;
};