import { Box, FlexProps } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { Tab, Tabs } from "@mui/material";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import React, { ReactNode } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { applicationRoutes } from "../../configuration/applicationRoutes";
import { objToArray, useIsMatchingCurrentRoute } from "../../frontendHelpers";
import { ApplicationRoute } from "../../models/types";
import { useCourseBriefData } from "../../services/courseService";
import { useNavigation } from "../../services/navigatior";
import { useBriefUserData } from "../../services/userManagementService";
import { EpistoButton } from "../universal/EpistoButton";

export const AdminSubpageHeader = (props: {
    tabMenuItems?: ApplicationRoute[],
    children?: ReactNode,
    onSave?: () => void
} & FlexProps) => {

    const { children, tabMenuItems, onSave, ...css } = props;
    const isMatchingCurrentRoute = useIsMatchingCurrentRoute();
    const { navigate } = useNavigation();
    const urlParams = useParams<{ userId: string, courseId: string, videoId: string, examId: string }>();
    const userId = urlParams.userId ? parseInt(urlParams.userId) : null;
    const courseId = urlParams.courseId ? parseInt(urlParams.courseId) : null;
    const videoId = urlParams.videoId ? parseInt(urlParams.videoId) : null;
    const examId = urlParams.examId ? parseInt(urlParams.examId) : null;

    const currentRoute = objToArray(applicationRoutes.administrationRoute)
        .filter(route => isMatchingCurrentRoute(route, false))[0];

    // const subRoute = objToArray(currentRoute)
    //     .filter(x => isMatchingCurrentRoute(x.route, true))[0];

    const { briefUserData } = useBriefUserData(userId);
    const { courseBriefData } = useCourseBriefData(courseId);

    const subRouteName = (briefUserData?.fullName || courseBriefData?.title);
    const subRoute = subRouteName
        ? { title: subRouteName! }
        : null;

    const BreadcrumbLink = (props: {
        to?: string,
        title: string,
        iconComponent?: ReactNode,
        isCurrent?: boolean
    }) => {

        const Content = () => <Flex>
            {props.iconComponent && <Flex w={27} h="100%" p={2}>
                {props.iconComponent}
            </Flex>}

            <Typography
                style={{
                    display: "flex",
                    flexDirection: "row",
                    fontWeight: props.isCurrent ? "bold" : undefined,
                    alignItems: "center",
                    padding: "0 2px 0 5px"
                }}>
                {props.title}
            </Typography>
        </Flex>

        return <Box>

            {/* current is not a link */}
            {!!props.isCurrent && <Content></Content>}

            {/* otherwise is a link */}
            {!props.isCurrent && <NavLink to={props.to ?? ""}>
                {<Content></Content>}
            </NavLink>}
        </Box>
    }

    const currentMatchingRoute = (tabMenuItems ?? [])
        .filter(route => isMatchingCurrentRoute(route))[0];

    const navigateToTab = (path: string) => {

        navigate(path, { userId, courseId, videoId, examId });
    };

    return <Flex
        direction={"column"}
        className="whall"
        position="relative">

        {/* breadcrumbs */}
        <Flex
            direction={"row"}
            height={60}
            pl={20}
            justify={"flex-start"}
            align={"center"}
            className="dividerBorderBottom">

            <Breadcrumbs>
                {currentRoute && <BreadcrumbLink
                    isCurrent={!subRoute}
                    to={currentRoute.route}
                    title={currentRoute.title}
                    iconComponent={currentRoute.icon} />}

                {subRoute && <BreadcrumbLink
                    isCurrent
                    title={subRoute.title} />}
            </Breadcrumbs>
        </Flex>

        {/* tabs */}
        {tabMenuItems && <Flex
            mx={20}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            h={60}>

            <Tabs
                value={currentMatchingRoute?.route}
                onChange={(x, path) => navigateToTab(path)} >

                {tabMenuItems
                    .map(x => {

                        return <Tab label={x.title} value={x.route} />
                    })}
            </Tabs>
        </Flex>
        }

        {/* children  */}
        <Flex direction="column" flex="1" overflowY="scroll" px="20px" {...css}>
            {children}
        </Flex>

        {/* save button */}
        {onSave && <EpistoButton
            style={{
                position: "absolute",
                right: "40px",
                bottom: "40px"
            }}
            variant="colored"
            onClick={() => onSave()}>

            Mentes
        </EpistoButton>}
    </Flex>
}
