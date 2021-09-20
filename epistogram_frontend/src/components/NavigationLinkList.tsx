import { Flex } from "@chakra-ui/layout"
import { Typography } from "@mui/material";
import { NavLink, useRouteMatch } from "react-router-dom";
import { NavigationListItemType } from "../models/types"

export const NavigationLinkList = (props: { items: NavigationListItemType[] }) => {

    const { items } = props;

    const isCurrentRoute = (route: string) => window.location.pathname == route;

    return <Flex direction="column">
        {items
            .map((menuItem, index) => {

                const isCurrent = isCurrentRoute(menuItem.route);

                return <NavLink
                    exact
                    to={menuItem.route}
                    key={index}>
                    <Flex
                        p="20px"
                        borderRadius="10px"
                        className={`leftBorderOnHover ${isCurrent ? "mildShadow" : ""}`}
                        // background={isCurrent ? "var(--epistoTeal)" : undefined}
                        align="center">

                        {/* icon */}
                        {menuItem.icon}

                        {/* text */}
                        <Typography
                            color={"secondary"}
                            variant={"button"}
                            style={{
                                marginLeft: "10px",
                                // color: isCurrent ? "white" : undefined
                            }}>
                            {menuItem.title}
                        </Typography>
                    </Flex>
                </NavLink>
            })}
    </Flex >
}