import { Flex } from "@chakra-ui/layout";
import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { isCurrentRoute } from "../static/frontendHelpers";
import { ApplicationRoute } from "../models/types";

export const NavigationLinkList = (props: { items: ApplicationRoute[] }) => {

    const { items } = props;

    return <Flex direction="column">
        {items
            .map((menuItem, index) => {

                const isCurrent = isCurrentRoute(menuItem.route);

                return <NavLink
                    exact
                    to={menuItem.route}
                    key={index}>
                    <Flex
                        p="5px 15px"
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
                                fontWeight: isCurrent ? "bold" : undefined
                            }}>
                            {menuItem.title}
                        </Typography>
                    </Flex>
                </NavLink>
            })}
    </Flex >
}
