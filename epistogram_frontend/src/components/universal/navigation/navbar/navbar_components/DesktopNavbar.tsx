import { Box, Flex } from "@chakra-ui/react";
import { Button } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import React, { useRef, useState } from 'react';
import { NavLink } from "react-router-dom";
import { getAssetUrl } from "../../../../../frontendHelpers";
import { useNavigation } from "../../../../../services/navigatior";
import { EpistoButton } from "../../../EpistoButton";
import { FlexImage } from "../../../FlexImage";
import { MenuItemsType } from "../Navbar";
import classes from "./desktopNavbar.module.scss";
import NavbarButton from "./NavbarButton";
import { EpistoPopper } from "../../../EpistoPopper";

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

    const ref = useRef<HTMLDivElement>(null);
    const [popperOpen, setPopperOpen] = useState(false);

    return (
        <Flex align="center" width="100%" justify="space-between">

            <EpistoPopper
                isOpen={popperOpen}
                target={ref?.current}
                placementX="left"
                handleClose={() => setPopperOpen(false)} />

            {/* logo link */}
            <NavLink to={homeUrl} className={classes.logoWrapper}>
                <FlexImage url={getAssetUrl("/images/logo.png")} height="90%" width="100%" />
            </NavLink>

            {/* menu items */}
            <Flex display={props.hideLinks ? "none" : "flex"}>
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
            <Flex pr="10px">

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

                <Box bg="blue" width="40px" height="40px" ref={ref} onClick={() => setPopperOpen(true)}></Box>
            </Flex>
        </Flex>
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