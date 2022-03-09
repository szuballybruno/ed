import { Box, FlexProps } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { Tab, Tabs } from "@mui/material";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import React, { ReactNode } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { applicationRoutes } from "../../configuration/applicationRoutes";
import { ApplicationRoute, ButtonType } from "../../models/types";
import { useCourseBriefData } from "../../services/api/courseApiService";
import { useShopItemBriefData } from "../../services/api/shopApiService";
import { useBriefUserData } from "../../services/api/userApiService";
import { useNavigation } from "../../services/core/navigatior";
import { objToArray, useIsMatchingCurrentRoute } from "../../static/frontendHelpers";
import { translatableTexts } from "../../static/translatableTexts";
import { EpistoButton } from "../controls/EpistoButton";
import { EpistoFont } from "../controls/EpistoFont";

export const AdminSubpageHeader = (props: {
    tabMenuItems?: ApplicationRoute[],
    children?: ReactNode,
    onSave?: () => void,
    headerButtons?: ButtonType[],
    subRouteLabel?: string,
    navigationQueryParams?: any
} & FlexProps) => {

    const { children, subRouteLabel, headerButtons, navigationQueryParams, tabMenuItems, onSave, ...css } = props;
    const tabMenuItemsList = (tabMenuItems ?? []);
    const isMatchingCurrentRoute = useIsMatchingCurrentRoute();
    const { navigate } = useNavigation();
    const urlParams = useParams<{ userId: string, courseId: string, videoId: string, examId: string, shopItemId: string }>();
    const userId = urlParams.userId ? parseInt(urlParams.userId) : null;
    const courseId = urlParams.courseId ? parseInt(urlParams.courseId) : null;
    const videoId = urlParams.videoId ? parseInt(urlParams.videoId) : null;
    const examId = urlParams.examId ? parseInt(urlParams.examId) : null;
    const shopItemId = urlParams.shopItemId ? parseInt(urlParams.shopItemId) : null;

    const currentMatchingRoute = tabMenuItemsList
        .filter(route => isMatchingCurrentRoute(route))[0];

    const handleNavigateToTab = (route: string) => {

        const tabRoute = tabMenuItemsList
            .filter(x => x.route === route)[0];

        if (tabRoute.navAction) {

            tabRoute.navAction();
        }
        else {

            navigate(route, {
                userId,
                courseId,
                videoId,
                examId,
                shopItemId,
                ...navigationQueryParams
            });
        }
    }

    return <Flex
        direction={"column"}
        className="whall"
        ml="5px"
        position="relative">

        {/* tabs */}
        {(tabMenuItems || onSave) && (
            <Flex
                className="roundBorders"
                bg="var(--transparentWhite70)"
                px="5px"
                flexDirection="row"
                alignItems="center"
                justify={"space-between"}
                height={65}>

                {/* tabs */}
                <Flex flex="1">
                    {tabMenuItems && <Tabs
                        value={currentMatchingRoute?.route}
                        onChange={(_, route: string) => handleNavigateToTab(route)}>

                        {tabMenuItems
                            .map(tabRoute => {

                                return <Tab
                                    label={tabRoute.title}
                                    value={tabRoute.route} />
                            })}
                    </Tabs>}
                </Flex>

                {/* header buttons */}
                <Flex mr="20px">

                    {/* header buttons */}
                    {headerButtons && headerButtons
                        .map(x => <EpistoButton
                            style={{
                                marginRight: "10px"
                            }}
                            variant="colored"
                            onClick={x.action}>
                            {x.icon}
                            {x.title}
                        </EpistoButton>)}

                    {/* save button */}
                    {onSave && <EpistoButton
                        variant="colored"
                        onClick={() => onSave()}>

                        {translatableTexts.misc.save}
                    </EpistoButton>}
                </Flex>
            </Flex>
        )}

        {/* children  */}
        <Flex
            direction="row"
            flex="1"
            {...css}>

            {children}
        </Flex>
    </Flex>
}
