import { applicationRoutes } from '../../configuration/applicationRoutes';
import { Responsivity } from '../../helpers/responsivity';
import { ContentPane } from '../pageRootContainer/ContentPane';
import { LeftPane } from '../pageRootContainer/LeftPane';
import { NavigationLinkList } from '../NavigationLinkList';
import { EpistoRoutes } from '../universal/EpistoRoutes';
import { CoinTransactions } from './CoinTransactions';
import { Preferences } from './Preferences';

export const UserSettingsPage = () => {

    const { isMobile } = Responsivity
        .useIsMobileView();

    return <>

        <LeftPane
            hidden={isMobile}>

            <NavigationLinkList
                routes={[
                    applicationRoutes.settingsRoute.preferencesRoute
                ]} />
        </LeftPane>

        <ContentPane
            noPadding={isMobile}>

            <EpistoRoutes
                renderRoutes={[
                    {
                        route: applicationRoutes.settingsRoute.preferencesRoute,
                        element: <Preferences />,
                    },
                    {
                        route: applicationRoutes.settingsRoute.coinTransactionsRoute,
                        element: <CoinTransactions />,
                    }
                ]} />
        </ContentPane>
    </>;
};
