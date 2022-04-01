import { Flex } from "@chakra-ui/layout";
import React from "react";
import { applicationRoutes } from "../../configuration/applicationRoutes";
import { getRoute } from "../../MainRouting";
import { ContentPane } from "../ContentPane";
import { LeftPane } from "../LeftPane";
import { NavigationLinkList } from "../NavigationLinkList";
import { PageRootContainer } from "../PageRootContainer";
import { CoinTransactions } from "./CoinTransactions";
import { Preferences } from "./Preferences";

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
                items={[
                    applicationRoutes.settingsRoute.preferencesRoute,
                    applicationRoutes.settingsRoute.featurePreviewRoute,
                    applicationRoutes.settingsRoute.developmentNotes
                ]}></NavigationLinkList>
        </LeftPane>

        <ContentPane>

            {getRoute(applicationRoutes.settingsRoute.preferencesRoute, <Preferences />)}
            {getRoute(applicationRoutes.settingsRoute.coinTransactionsRoute, <CoinTransactions />)}
            {getRoute(applicationRoutes.settingsRoute.featurePreviewRoute, <FeaturePreview />)}
            {getRoute(applicationRoutes.settingsRoute.developmentNotes, <DevelopmentNotes />)}
        </ContentPane>
    </PageRootContainer>;
};
