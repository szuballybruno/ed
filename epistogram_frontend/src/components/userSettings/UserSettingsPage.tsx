import { Flex } from '@chakra-ui/layout';
import React from 'react';
import { Switch } from 'react-router';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { getRoute } from '../../MainRouting';
import { NavigationLinkList } from '../NavigationLinkList';
import { LeftPane, PageRootContainer, ContentPane } from '../system/MainPanels';
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

    return <PageRootContainer>

        <LeftPane p="20px" flexBasis="300px" >
            <NavigationLinkList
                items={[
                    applicationRoutes.settingsRoute.preferencesRoute,
                    applicationRoutes.settingsRoute.featurePreviewRoute,
                    applicationRoutes.settingsRoute.developmentNotes
                ]}></NavigationLinkList>
        </LeftPane>

        <ContentPane>

            <Switch>
                {getRoute(applicationRoutes.settingsRoute.preferencesRoute, <Preferences />)}
                {getRoute(applicationRoutes.settingsRoute.featurePreviewRoute, <FeaturePreview />)}
                {getRoute(applicationRoutes.settingsRoute.developmentNotes, <DevelopmentNotes />)}
            </Switch>
        </ContentPane>
    </PageRootContainer>
}
