import { Box } from "@chakra-ui/layout";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import React, { ReactNode } from 'react';
import { matchPath, useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import { applicationRoutes } from "../../../../configuration/applicationRoutes";
import { objToArray } from "../../../../frontendHelpers";
import {Flex} from "@chakra-ui/react";

export const AdministrationSubpageHeader = (props: { children?: ReactNode }) => {

    const { children } = props;

    const currentPath = useLocation().pathname;
    const isMatchingCurrentRoute = (route: string, exact: boolean) => {

        const match = matchPath(
            currentPath,
            {
                path: route,
                exact: exact,
                strict: false
            });

        return !!match;
    };

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

        const Content = () => <Typography
            style={{ fontWeight: props.isCurrent ? "bold" : undefined }}>
            {props.iconComponent}
            {props.title}
        </Typography>

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

    return <Flex direction={"column"} >
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


        {children}
    </Flex>
}
