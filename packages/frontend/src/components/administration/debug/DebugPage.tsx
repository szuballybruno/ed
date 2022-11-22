import { CSSProperties, useState } from 'react';
import { LoadingStateType } from '../../../models/types';
import { useShowErrorDialog } from '../../../services/core/notifications';
import { translatableTexts } from '../../../static/translatableTexts';
import { CoinRewardDialog } from '../../CoinRewardDialog';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoGrid } from '../../controls/EpistoGrid';
import { useEpistoDialogLogic } from '../../universal/epistoDialog/EpistoDialogLogic';
import { AdminBreadcrumbsHeader } from '../breadcrumbsHeader/AdminBreadcrumbsHeader';

export const DebugPage = () => {

    const showError = useShowErrorDialog();

    const [loadingState, setLoadingState] = useState<LoadingStateType>('idle');

    const debugButtonStyle: CSSProperties = {
        background: 'var(--transparentWhite70)',
        height: '100px',
        whiteSpace: 'normal'
    };

    const getLoadingStateColor = () => {

        if (loadingState === 'idle')
            return 'var(--deepGreen)';

        if (loadingState === 'error')
            return 'var(--intenseRed)';

        if (loadingState === 'loading')
            return 'var(--intenseOrange)';

        if (loadingState === 'success')
            return 'var(--intenseRed)';

    };

    const dialogLogic = useEpistoDialogLogic('reward');

    return <>
        <AdminBreadcrumbsHeader>
        </AdminBreadcrumbsHeader>;

        <EpistoGrid
            width="100%"
            minColumnWidth={'200px'}
            gap={'10px'}
            auto={'fill'}>

            <EpistoButton
                style={debugButtonStyle}
                onClick={() => {
                    showError();
                }}>

                show empty error
            </EpistoButton>

            <EpistoButton
                style={debugButtonStyle}
                onClick={() => {
                    showError('Random description');
                }}>

                show error with description only
            </EpistoButton>

            <EpistoButton
                style={debugButtonStyle}
                onClick={() => {
                    showError('Random description', 'Random title');
                }}>

                show error with description and title
            </EpistoButton>

            <EpistoButton
                style={debugButtonStyle}
                onClick={() => {
                    dialogLogic.openDialog();
                }}>

                show coin reward dialog
            </EpistoButton>

            <EpistoButton
                style={debugButtonStyle}
                onClick={() => {
                    setLoadingState('error');

                    setTimeout(() => {
                        setLoadingState('idle');
                    }, 5000);
                }}>

                Change loadingState to error for 5 sec
            </EpistoButton>

            <EpistoButton
                style={debugButtonStyle}
                onClick={() => {
                    setLoadingState('loading');

                    setTimeout(() => {
                        setLoadingState('idle');
                    }, 5000);
                }}>

                Change loadingState to loading for 5 sec
            </EpistoButton>

            <EpistoFlex2
                className='roundBorders'
                align='center'
                justify='center'
                background={getLoadingStateColor()}>

                Current loading state: {loadingState}
            </EpistoFlex2>
        </EpistoGrid>

        <CoinRewardDialog
            lottiePath={'lottie_json/session_streak_3.json'}
            coinRewardAmount={100}
            dialogLogic={dialogLogic}
            text={translatableTexts.eventListener.threeDaysStreak} />
    </>
};