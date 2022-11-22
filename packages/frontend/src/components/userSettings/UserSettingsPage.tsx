import { applicationRoutes } from '../../configuration/applicationRoutes';
import { Responsivity } from '../../helpers/responsivity';
import { Navigator } from '../../services/core/navigatior';
import { NavigationLinkList } from '../NavigationLinkList';
import { ContentPane } from '../pageRootContainer/ContentPane';
import { LeftPane } from '../pageRootContainer/LeftPane';
import { EpistoRoutes } from '../universal/EpistoRoutes';
import { CoinTransactions } from './CoinTransactions';
import { Preferences } from './Preferences';

export const UserSettingsPage = () => {

    const { isMobile } = Responsivity
        .useIsMobileView();

    const { navigate3 } = Navigator
        .useNavigation();

    return <>

        <LeftPane
            hidden={isMobile}>

            <NavigationLinkList
                onNav={route => navigate3(route)}
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
