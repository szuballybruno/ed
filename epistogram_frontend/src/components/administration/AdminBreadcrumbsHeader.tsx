import { Box, Flex, FlexProps } from "@chakra-ui/react"
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { ReactNode } from "react";
import { NavLink, useParams } from "react-router-dom";
import { applicationRoutes } from "../../configuration/applicationRoutes";
import { useCourseBriefData } from "../../services/api/courseApiService";
import { useShopItemBriefData } from "../../services/api/shopApiService";
import { useBriefUserData } from "../../services/api/userApiService";
import { objToArray, useIsMatchingCurrentRoute } from "../../static/frontendHelpers";
import { EpistoFont } from "../controls/EpistoFont";

export const AdminBreadcrumbsHeader = (props: {
    children?: ReactNode,
    subRouteLabel?: string,
} & FlexProps) => {
    const { subRouteLabel, children, ...css } = props;

    const urlParams = useParams<{ userId: string, courseId: string, videoId: string, examId: string, shopItemId: string }>();

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

    const BreadcrumbLink = (props: {
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

        return <Box>

            {/* current is not a link */}
            {!!props.isCurrent && <Content></Content>}

            {/* otherwise is a link */}
            {!props.isCurrent && <NavLink to={props.to ?? ""}>
                {<Content></Content>}
            </NavLink>}
        </Box>
    }

    return <Flex
        flex="1"
        mb="20px"
        direction={"column"}>

        {/* breadcrumbs */}
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