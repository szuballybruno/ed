import { FlexProps } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { GridOn, List } from "@mui/icons-material";
import { FormControl, FormGroup, Switch, Tab, Tabs } from "@mui/material";
import React, { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { ApplicationRoute, ButtonType } from "../../models/types";
import { useNavigation } from "../../services/core/navigatior";
import { useIsMatchingCurrentRoute } from "../../static/frontendHelpers";
import { translatableTexts } from "../../static/translatableTexts";
import { EpistoButton } from "../controls/EpistoButton";

export const AdminSubpageHeader = (props: {
    tabMenuItems?: ApplicationRoute[],
    children?: ReactNode,
    onSave?: () => void,
    headerButtons?: ButtonType[],
    subRouteLabel?: string,
    navigationQueryParams?: any
} & FlexProps) => {

    const {
        children,
        subRouteLabel,
        headerButtons,
        navigationQueryParams,
        tabMenuItems,
        onSave,
        ...css
    } = props;

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
        className="whall roundBorders"
        background="var(--transparentWhite70)"
        px="5px"
        position="relative">

        {/* tabs */}
        {(tabMenuItems || onSave) && (
            <Flex
                className="roundBorders"

                flexDirection="row"
                alignItems="center"
                justify={"space-between"}
                height={60}>

                {/* tabs */}
                <Flex
                    p="10px"
                    flex="1">
                    {tabMenuItems && <Tabs
                        className="roundBorders"
                        TabIndicatorProps={{
                            style: {
                                display: "none",
                            },
                        }}
                        sx={{
                            "&.MuiTabs-root": {
                                //background: "var(--transparentIntenseBlue85)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: 45,
                                minHeight: 0
                            }
                        }}
                        value={currentMatchingRoute?.route}
                        onChange={(_, route: string) => handleNavigateToTab(route)}>

                        {tabMenuItems
                            .map(tabRoute => {

                                return <Tab
                                    sx={{
                                        "&.MuiTab-root": {
                                            color: "#444",
                                            cursor: "pointer",
                                            backgroundColor: "transparent",
                                            padding: "6px 16px",
                                            border: "none",
                                            borderRadius: "5px",
                                            display: "flex",
                                            justifyContent: "center",
                                            height: "41px",
                                            minHeight: "0px"
                                        },
                                        "&.MuiTouchRipple-root": {
                                            lineHeight: "0px"
                                        },
                                        "&.Mui-selected": {
                                            color: "#444",
                                            fontWeight: "bold",
                                            background: "var(--transparentIntenseTeal)"
                                        }
                                    }}
                                    label={tabRoute.title}
                                    value={tabRoute.route} />
                            })}
                    </Tabs>}
                </Flex>

                {/* header buttons */}
                <Flex>

                    {/* header buttons */}
                    {headerButtons && headerButtons
                        .map(x => <EpistoButton
                            style={{
                                color: "#555",
                                marginRight: "10px",
                                //background: "var(--transparentIntenseTeal)",
                                fontWeight: "bold",
                                height: 41
                            }}
                            variant="plain"
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
    </Flex >
}
