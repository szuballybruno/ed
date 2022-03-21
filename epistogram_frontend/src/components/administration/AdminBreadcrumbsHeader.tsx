import { Box, Flex, FlexProps } from "@chakra-ui/react"
import { GridOn, List } from "@mui/icons-material";
import { FormControlLabel, FormGroup, Switch, styled, FormControl } from "@mui/material";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { ReactNode, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { applicationRoutes } from "../../configuration/applicationRoutes";
import { useCourseBriefData } from "../../services/api/courseApiService";
import { useShopItemBriefData } from "../../services/api/shopApiService";
import { useBriefUserData } from "../../services/api/userApiService";
import { objToArray, useIsMatchingCurrentRoute } from "../../static/frontendHelpers";
import { EpistoFont } from "../controls/EpistoFont";

export const BreadcrumbLink = (props: {
    to?: string,
    title: string,
    iconComponent?: ReactNode,
    isCurrent?: boolean
}) => {

    const Content = () => <Flex>
        {props.iconComponent && <Flex width={27} height="100%" m={"2px 10px 2px 2px"}>
            {props.iconComponent}
        </Flex>}

        <EpistoFont
            style={{
                display: "flex",
                flexDirection: "row",
                fontWeight: props.isCurrent ? "bold" : undefined,
                alignItems: "center",
                padding: "0 2px 0 5px"
            }}>
            {props.title}
        </EpistoFont>
    </Flex>

    const { to } = props;
    const isLink = !props.isCurrent && to;

    return <Box>

        {isLink
            ? <NavLink to={to!}>
                <Content />
            </NavLink>
            : <Content />}
    </Box>
}

export const AdminBreadcrumbsHeader = (props: {
    children?: ReactNode,
    breadcrumbs?: ReactNode[],
    subRouteLabel?: string,
    viewSwitchChecked?: boolean,
    viewSwitchFunction?: (checked: boolean) => void
} & FlexProps) => {

    const { subRouteLabel, children, breadcrumbs, viewSwitchChecked, viewSwitchFunction, ...css } = props;

    const urlParams = useParams<{ userId: string, courseId: string, videoId: string, examId: string, shopItemId: string }>();
    const location = useLocation()

    const userId = urlParams.userId ? parseInt(urlParams.userId) : null;
    const courseId = urlParams.courseId ? parseInt(urlParams.courseId) : null;
    const shopItemId = urlParams.shopItemId ? parseInt(urlParams.shopItemId) : null;

    const isMatchingCurrentRoute = useIsMatchingCurrentRoute();
    const currentRoute = objToArray(applicationRoutes.administrationRoute)
        .filter(route => isMatchingCurrentRoute(route, false))[0];

    const { briefUserData } = useBriefUserData(userId);
    const { courseBriefData } = useCourseBriefData(courseId);
    const { shopItemBriefData } = useShopItemBriefData(shopItemId);

    const subRouteName = subRouteLabel
        ? subRouteLabel
        : (briefUserData?.fullName || courseBriefData?.title || shopItemBriefData?.name);

    const subRoute = subRouteName
        ? { title: subRouteName! }
        : null;


    return <Flex
        flex="1"
        mb="20px"
        direction={"column"}>

        <Flex
            justify="space-between"
            minH="38px">
            {/* breadcrumbs */}
            {breadcrumbs
                ? <Breadcrumbs>
                    {breadcrumbs}
                </Breadcrumbs>
                : <Breadcrumbs>
                    {currentRoute && <BreadcrumbLink
                        isCurrent={!subRoute}
                        to={currentRoute.route}
                        title={currentRoute.title}
                        iconComponent={currentRoute.icon} />}

                    {subRoute && <BreadcrumbLink
                        isCurrent
                        title={subRoute.title} />}
                </Breadcrumbs>}

            {viewSwitchFunction && <FormGroup>

                <FormControl style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <List />
                    <Switch
                        checked={viewSwitchChecked}
                        onChange={(e) => {
                            if (!viewSwitchFunction)
                                return

                            viewSwitchFunction(e.currentTarget.checked)
                        }} />
                    <GridOn />
                </FormControl>
            </FormGroup>}
        </Flex>



        {/* children  */}
        <Flex
            direction="row"
            mt="10px"
            flex="1"
            {...css}>

            {children}
        </Flex>
    </Flex>
}