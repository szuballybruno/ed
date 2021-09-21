import { Box, Flex } from "@chakra-ui/react";
import { PlayArrow } from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { Typography } from "@mui/material";
import React, { useContext, useRef, useState } from 'react';
import { NavLink } from "react-router-dom";
import { getAssetUrl } from "../../../../../frontendHelpers";
import { RouteItemType } from "../../../../../models/types";
import { getCourseItemUrl, useNavigation } from "../../../../../services/navigatior";
import { EpistoConinInfo } from "../../../../EpistoCoinInfo";
import { CurrentUserContext } from "../../../../HOC/AuthenticationFrame";
import { EpistoButton } from "../../../EpistoButton";
import { EpistoPopper } from "../../../EpistoPopper";
import { FlexImage } from "../../../FlexImage";
import classes from "./desktopNavbar.module.scss";
import NavbarButton from "./NavbarButton";

const DesktopNavbar = (props: {
    currentCourseItemCode: string | null,
    menuItems: RouteItemType[],
    hideLinks: boolean
}) => {

    const { navigateToPlayer, navigate } = useNavigation();
    const currentCourseItemCode = props.currentCourseItemCode;

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
            <Flex display={hideLinks ? "none" : "flex"} height="50px">
                {props
                    .menuItems
                    .map((item, index) => {
                        return <NavbarButton
                            key={index}
                            menuName={item.title}
                            menuPath={item.route} />
                    })}

                {/* continue watching  */}
                {currentCourseItemCode &&
                    <NavbarButton
                        menuPath={getCourseItemUrl(currentCourseItemCode)}>

                        <EpistoButton
                            style={{ flex: "1", color: "var(--epistoTeal)" }}
                            variant="outlined"
                            icon={
                                <img
                                    src={getAssetUrl("/icons/play2.svg")}
                                    style={{
                                        width: "25px",
                                        height: "25px",
                                        marginRight: "5px"
                                    }} />
                            }>
                            Aktuális Kurzus
                        </EpistoButton>
                    </NavbarButton>}
            </Flex >

            {/* content */}
            < Flex display={hideLinks ? "none" : undefined} pr="10px" align="center" >

                <EpistoConinInfo height="45px" />

                <Box width="1px" height="40px" margin="0 10px 0 10px" bg="var(--mildGrey)"></Box>

                {!!user && <EpistoButton
                    ref={ref}
                    variant="plain"
                    onClick={() => setPopperOpen(true)}
                    padding="0px"
                    isRound
                    size="55px"
                    style={{
                        border: "3px solid var(--epistoTeal)",
                        margin: "0px",
                    }}>
                    <FlexImage
                        className="whall hoverShine"
                        overflow="hidden"
                        url={user.avatarUrl!}></FlexImage>
                </EpistoButton>}
            </Flex >

            {/* user menu */}
            < EpistoPopper
                isOpen={popperOpen}
                target={ref?.current}
                placementX="left"
                handleClose={() => setPopperOpen(false)}>
                {
                    userMenuItems
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
                        })
                }
            </EpistoPopper >
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