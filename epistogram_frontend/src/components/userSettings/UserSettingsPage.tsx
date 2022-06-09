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

const FeaturePreview = () => {

    return <Flex className="whall">
        <iframe src="https://epistogram.com/upcoming-features"
            className="whall"></iframe>
    </Flex>;
};

const DevelopmentNotes = () => {

    return <Flex className="whall">
        <iframe src="https://epistogram.com/release-notes"
            className="whall"></iframe>
    </Flex>;
};

export const UserSettingsPage = () => {

    return <PageRootContainer>

        <LeftPane p="20px"
            flexBasis="300px" >

            <NavigationLinkList
                routes={[
                    applicationRoutes.settingsRoute.preferencesRoute,
                    applicationRoutes.settingsRoute.coinTransactionsRoute,
                    applicationRoutes.settingsRoute.featurePreviewRoute,
                    applicationRoutes.settingsRoute.developmentNotesRoute
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
                    },
                    {
                        route: applicationRoutes.settingsRoute.featurePreviewRoute,
                        element: <FeaturePreview />,
                    },
                    {
                        route: applicationRoutes.settingsRoute.developmentNotesRoute,
                        element: <DevelopmentNotes />,
                    }
                ]} />
        </ContentPane>
    </PageRootContainer>;
};
