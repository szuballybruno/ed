import { Box, Flex } from "@chakra-ui/react";
import { Button, Typography } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import React, { useContext, useRef, useState } from 'react';
import { NavLink } from "react-router-dom";
import { getAssetUrl } from "../../../../../frontendHelpers";
import { useNavigation } from "../../../../../services/navigatior";
import { EpistoButton } from "../../../EpistoButton";
import { FlexImage } from "../../../FlexImage";
import { MenuItemsType } from "../Navbar";
import classes from "./desktopNavbar.module.scss";
import NavbarButton from "./NavbarButton";
import { EpistoPopper } from "../../../EpistoPopper";
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import { CurrentUserContext } from "../../../../../HOC/AuthenticationFrame";

const userMenuItems = [
    {
        name: "Settings",
        path: "user/settings",
        icon: <SettingsIcon></SettingsIcon>
    },
    {
        name: "Profile Dashboard",
        path: "",
        icon: <DashboardIcon></DashboardIcon>
    },
    {
        name: "Log Out",
        path: "",
        icon: <LogoutIcon></LogoutIcon>,
        color: "var(--mildRed)"
    }
]

const DesktopNavbar = (props: {
    currentCourseItemCode: string | null,
    menuItems: MenuItemsType,
    hideLinks: boolean
}) => {

    const { navigateToPlayer } = useNavigation();
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
                    .middleMenu
                    .map((item, index) => {
                        return <Box
                            p="10px"
                            key={index}>
                            <NavbarButton
                                index={index}
                                menuName={item.menuName}
                                menuPath={item.menuPath} />
                        </Box>
                    })}
            </Flex>

            {/* content */}
            <Flex display={hideLinks ? "none" : undefined} pr="10px" align="center">

                <Flex height="45px" pr="10px">
                    {/* show something new  */}
                    <EpistoButton variant="colored">
                        Mutass valamit!
                    </EpistoButton>

                    {/* continue watching  */}
                    {currentCourseItemCode &&
                        <EpistoButton
                            variant="outlined"
                            onClick={continueWatching}>
                            <PlayArrow />
                        </EpistoButton>}
                </Flex>

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
                            style={{ background: x.color }}>
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