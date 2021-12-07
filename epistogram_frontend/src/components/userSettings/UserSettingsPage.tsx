import { Flex } from '@chakra-ui/layout';
import React from 'react';
import { Switch } from 'react-router';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { getRoute } from '../../MainRouting';
import Navbar from '../navbar/Navbar';
import { NavigationLinkList } from '../NavigationLinkList';
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from '../system/MainPanels';
import { CoinTransactions } from './CoinTransactions';
import { Preferences } from './Preferences';

const FeaturePreview = () => {

    return <Flex className="whall">
        <iframe src="https://epistogram.com/upcoming-features" className="whall"></iframe>
    </Flex>
}

const DevelopmentNotes = () => {

    return <Flex className="whall">
        <iframe src="https://epistogram.com/release-notes" className="whall"></iframe>
    </Flex>
}

export const UserSettingsPage = () => {

    return <MainWrapper>

        <Navbar />

        <ContentWrapper>

            <LeftPanel p="20px" flexBasis="300px" >
                <NavigationLinkList
                    items={[
                        applicationRoutes.settingsRoute.preferencesRoute,
                        applicationRoutes.settingsRoute.featurePreviewRoute,
                        applicationRoutes.settingsRoute.developmentNotes,
                        applicationRoutes.settingsRoute.coinTransactionsRoute
                    ]}></NavigationLinkList>
            </LeftPanel>

            <RightPanel>

                <Switch>
                    {getRoute(applicationRoutes.settingsRoute.preferencesRoute, <Preferences />)}
                    {getRoute(applicationRoutes.settingsRoute.featurePreviewRoute, <FeaturePreview />)}
                    {getRoute(applicationRoutes.settingsRoute.developmentNotes, <DevelopmentNotes />)}
                    {getRoute(applicationRoutes.settingsRoute.coinTransactionsRoute, <CoinTransactions />)}
                </Switch>
            </RightPanel>
        </ContentWrapper>
    </MainWrapper>
}
