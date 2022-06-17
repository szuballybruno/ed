import { Flex } from '@chakra-ui/layout';
import React from 'react';
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

        <LeftPane p="20px"
            flexBasis="300px" >

            <NavigationLinkList
                routes={[
                    applicationRoutes.settingsRoute.preferencesRoute
                ]} />
        </LeftPane>

        <ContentPane>
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
