import { Box, Flex } from "@chakra-ui/react";
import { Button } from "@material-ui/core";
import { PlayArrow } from "@material-ui/icons";
import React from 'react';
import { NavLink } from "react-router-dom";
import { getAssetUrl } from "../../../../../frontendHelpers";
import { useNavigation } from "../../../../../services/navigatior";
import { FlexImage } from "../../../FlexImage";
import { MenuItemsType } from "../Navbar";
import classes from "./desktopNavbar.module.scss";
import NavbarButton from "./NavbarButton";

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

    return (
        <Flex align="center" width="100%" justify="space-between">

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
                        return <Box p="10px">
                            <NavbarButton
                                key={index}
                                index={index}
                                menuName={item.menuName}
                                menuPath={item.menuPath} />
                        </Box>
                    })}
            </Flex>

            {/* content */}
            <Flex pr="10px">

                {/* show something new  */}
                <Button variant={"outlined"}
                    size={"large"}
                    className={classes.showSomethingButton}
                    style={{ color: "white" }}>
                    Mutass valamit!
                </Button>

                {/* continue watching  */}
                {currentCourseItemCode &&
                    <Button
                        variant={"outlined"}
                        size={"large"}
                        onClick={continueWatching}
                        className={classes.playButton}>
                        <PlayArrow />
                    </Button>}
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