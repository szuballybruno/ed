import { Box } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { Tab, Tabs } from "@mui/material";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import React, { ReactNode } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { applicationRoutes } from "../../configuration/applicationRoutes";
import { objToArray, useIsMatchingCurrentRoute } from "../../frontendHelpers";
import { RouteItemType } from "../../models/types";
import { useNavigation } from "../../services/navigatior";

export const AdminSubpageHeader = (props: {
    tabMenuItems?: RouteItemType[],
    children?: ReactNode
}) => {

    const { children, tabMenuItems } = props;
    const isMatchingCurrentRoute = useIsMatchingCurrentRoute();
    const { navigate } = useNavigation();
    const urlParams = useParams<{ userId: string }>();

    const currentRoute = objToArray(applicationRoutes.administrationRoute)
        .filter(x => isMatchingCurrentRoute(x.route, x.exact))[0];

    const subRoute = objToArray(currentRoute)
        .filter(x => isMatchingCurrentRoute(x.route, true))[0];

    const BreadcrumbLink = (props: {
        to: string,
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
                }}
            >
                {props.title}
            </Typography>
        </Flex>

        return <Box>

            {/* current is not a link */}
            {!!props.isCurrent && <Content></Content>}

            {/* otherwise is a link */}
            {!props.isCurrent && <NavLink to={props.to}>
                {<Content></Content>}
            </NavLink>}
        </Box>
    }

    //TODO: Navigate back to previously edited course or video on click e.g.: not to :courseId but the real courseId

    const currentMatchingRoute = (tabMenuItems ?? [])
        .filter(x => isMatchingCurrentRoute(x.route, x.isExact))[0];


    const navigateToTab = (path: string) => {

        navigate(path, { userId: urlParams.userId });
    };

    return <Flex direction={"column"} w="100%">
        <Flex flexDirection={"row"} h={60} pl={20} justifyContent={"flex-start"} alignItems={"center"} className="dividerBorderBottom">
            <Breadcrumbs>
                {currentRoute && <BreadcrumbLink
                    isCurrent={!subRoute}
                    to={currentRoute.route}
                    title={currentRoute.title}
                    iconComponent={currentRoute.icon} />}

                {subRoute && <BreadcrumbLink
                    isCurrent
                    to={subRoute.route}
                    title={subRoute.title}
                    iconComponent={subRoute.icon} />}
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
        {children}
    </Flex >
}
