import { Flex } from "@chakra-ui/layout";
import { NavLink } from "react-router-dom";
import { ApplicationRoute } from "../models/types";
import { isCurrentRoute } from "../static/frontendHelpers";
import { EpistoFont } from "./controls/EpistoFont";

export const NavigationLinkList = (props: { items: ApplicationRoute[], isNoText?: boolean }) => {

    const { items } = props;

    return <Flex direction="column">
        {items
            .map((menuItem, index) => {

                const isCurrent = isCurrentRoute(menuItem.route);

                return <NavLink
                    to={menuItem.route}
                    key={index}>
                    <Flex
                        p="5px 15px"
                        align="center">

                        {/* icon */}
                        {menuItem.icon}

                        {/* text */}
                        {!props.isNoText && <EpistoFont
                            fontSize="fontNormal14"
                            isUppercase
                            style={{
                                marginLeft: "10px",
                                color: "var(--mildDeepBlue)",
                                fontWeight: isCurrent ? "bold" : 500
                            }}>
                            {menuItem.title}
                        </EpistoFont>}

                    </Flex>
                </NavLink>;
            })}
    </Flex >;
};
