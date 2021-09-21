import { Box, Flex } from "@chakra-ui/react";
import { PlayArrow } from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { Typography } from "@mui/material";
import React, { useContext, useRef, useState } from 'react';
import { NavLink } from "react-router-dom";
import { getAssetUrl } from "../../../../../frontendHelpers";
import { NavigationListItemType } from "../../../../../models/types";
import { useNavigation } from "../../../../../services/navigatior";
import { EpistoConinInfo } from "../../../../EpistoCoinInfo";
import { CurrentUserContext } from "../../../../HOC/AuthenticationFrame";
import { EpistoButton } from "../../../EpistoButton";
import { EpistoPopper } from "../../../EpistoPopper";
import { FlexImage } from "../../../FlexImage";
import classes from "./desktopNavbar.module.scss";
import NavbarButton from "./NavbarButton";

const DesktopNavbar = (props: {
    currentCourseItemCode: string | null,
    menuItems: NavigationListItemType[],
    hideLinks: boolean
}) => {

    const { navigateToPlayer, navigate } = useNavigation();
    const currentCourseItemCode = props.currentCourseItemCode;
    const continueWatching = () => {

        if (currentCourseItemCode)
            navigateToPlayer(currentCourseItemCode);
    }
    const homeUrl = "/";
    const user = useContext(CurrentUserContext);

    const ref = useRef<HTMLButtonElement>(null);
    const [popperOpen, setPopperOpen] = useState(false);
    const { hideLinks } = props;

    const userMenuItems = [
        {
            name: "Settings",
            icon: <SettingsIcon></SettingsIcon>,
            onClick: () => navigate("/settings/preferences")
        },
        {
            name: "Log Out",
            icon: <LogoutIcon></LogoutIcon>,
            color: "var(--mildRed)",
            onClick: () => navigate("/settings")
        }
    ]

    return (
        <Flex align="center" width="100%" justify="space-between">

            {/* logo link */}
            <NavLink to={homeUrl} className={classes.logoWrapper}>
                <FlexImage url={getAssetUrl("/images/logo.png")} height="90%" width="100%" />
            </NavLink>

            {/* menu items */}
            <Flex display={hideLinks ? "none" : "flex"}>
                {props
                    .menuItems
                    .map((item, index) => {
                        return <Box
                            p="10px"
                            key={index}>
                            <NavbarButton
                                index={index}
                                menuName={item.title}
                                menuPath={item.route} />
                        </Box>
                    })}
            </Flex>

            {/* content */}
            <Flex display={hideLinks ? "none" : undefined} pr="10px" align="center">

                {/* continue watching  */}
                {currentCourseItemCode &&
                    <EpistoButton
                        style={{ marginRight: "10px" }}
                        variant="colored"
                        isRound
                        padding="10px 10px 10px 13px"
                        size="45px"
                        onClick={continueWatching}>
                        <img
                            className="whall"
                            src={getAssetUrl("/icons/play.svg")}
                            style={{
                                filter: "invert(1)"
                            }} />
                    </EpistoButton>}

                <EpistoConinInfo height="45px" mr="10px" />

                {!!user && <EpistoButton
                    ref={ref}
                    variant="plain"
                    onClick={() => setPopperOpen(true)}
                    padding="0px"
                    isRound
                    size="55px"
                    style={{
                        // border: "5px solid white", //var(--epistoTeal)
                        margin: "0px",
                    }}>
                    <FlexImage
                        className="whall hoverShine"
                        overflow="hidden"
                        url={user.avatarUrl!}></FlexImage>
                </EpistoButton>}
            </Flex>

            {/* user menu */}
            <EpistoPopper
                isOpen={popperOpen}
                target={ref?.current}
                placementX="left"
                handleClose={() => setPopperOpen(false)}>
                {userMenuItems
                    .map(x => {

                        return <EpistoButton
                            variant={x.color ? "colored" : undefined}
                            style={{ background: x.color }}
                            onClick={x.onClick}>
                            <Flex className="whall" m="5px" align="center">
                                {x.icon}
                                <Typography
                                    style={{
                                        marginLeft: "14px",
                                        textAlign: "left",
                                        fontSize: "14px"
                                    }}>
                                    {x.name}
                                </Typography>
                            </Flex>
                        </EpistoButton>
                    })}
            </EpistoPopper>
        </Flex >
    );
};

export default DesktopNavbar;

// updateActivity("",
//     "openPage",
//     window.location.href,
//     "DesktopNavbar-Button-PlayVideo",
//     "play",
//     "generalPassive",
//     "A felhasználó megnyit egy új oldalt",
//     true,
//     undefined,
//     undefined,
//     undefined,
//     undefined,
//     undefined,
//     undefined,
//     currentOrigin + "/watch/" + user.userData.currentCourse._id.get() + "/" + user.userData.currentItem._id.get()
// )