import { applicationRoutes } from '../../configuration/applicationRoutes';
import { ContentPane } from '../ContentPane';
import { LeftPane } from '../LeftPane';
import { NavigationLinkList } from '../NavigationLinkList';
import { PageRootContainer } from '../PageRootContainer';
import { EpistoRoutes } from '../universal/EpistoRoutes';
import { CoinTransactions } from './CoinTransactions';
import { Preferences } from './Preferences';

export const UserSettingsPage = () => {

    return <PageRootContainer>

        <LeftPane
            padding="20px"
            basis="300px" >

            <NavigationLinkList
                routes={[
                    applicationRoutes.settingsRoute.preferencesRoute
                ]} />
        </LeftPane>

        <ContentPane noMaxWidth>
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
    </PageRootContainer>;
};
