import { Box, Flex, Image } from "@chakra-ui/react";
import LogoutIcon from '@mui/icons-material/Logout';
import { Typography } from "@mui/material";
import React, { useContext, useRef, useState } from 'react';
import { applicationRoutes } from "../../configuration/applicationRoutes";
import { getAssetUrl } from "../../frontendHelpers";
import { RouteItemType } from "../../models/types";
import { getCourseItemUrl, useNavigation } from "../../services/navigatior";
import { EpistoConinInfo } from "../EpistoCoinInfo";
import { CurrentUserContext } from "../HOC/AuthenticationFrame";
import { EpistoButton } from "../universal/EpistoButton";
import { EpistoPopper } from "../universal/EpistoPopper";
import NavbarButton from "../universal/NavbarButton";

const menuItems = [
    applicationRoutes.homeRoute,
    applicationRoutes.availableCoursesRoute,
    applicationRoutes.learningRoute
] as RouteItemType[];

const DesktopNavbar = (props: {
    currentCourseItemCode: string | null,
    hideLinks: boolean
}) => {

    const { navigateToPlayer, navigate } = useNavigation();
    const currentCourseItemCode = props.currentCourseItemCode;
    const continueCourse = () => navigateToPlayer(currentCourseItemCode!);

    const homeUrl = applicationRoutes.rootHomeRoute.route;
    const user = useContext(CurrentUserContext)!;

    const ref = useRef<HTMLButtonElement>(null);
    const [popperOpen, setPopperOpen] = useState(false);
    const hideLinks = props.hideLinks || !user;

    const userMenuItems = [
        {
            name: applicationRoutes.settingsRoute.title,
            icon: applicationRoutes.settingsRoute.icon,
            onClick: () => navigate(applicationRoutes.settingsRoute.preferencesRoute.route)
        },
        {
            name: "Kijelentkezés",
            icon: <LogoutIcon></LogoutIcon>,
            color: "var(--mildRed)",
            onClick: () => { }
        }
    ]

    return (
        <Flex align="center" width="100%" justify="space-between">

            {/* logo link */}
            <img
                src={getAssetUrl("/images/logo.png")}
                style={{
                    width: "150px",
                    height: "50px",
                    objectFit: "contain",
                    marginLeft: "15px",
                    cursor: "pointer",
                }}
                onClick={() => {

                    if (user.userActivity.canAccessApplication)
                        navigate(homeUrl);
                }} />

            {/* menu items */}
            {!hideLinks && <>
                <Flex height="50px">
                    {menuItems
                        .map((item, index) => {
                            return <NavbarButton
                                key={index}
                                menuName={item.title}
                                menuPath={item.route} />
                        })}

                    {user.userActivity.canAccessAdministration && <NavbarButton
                        menuName={applicationRoutes.administrationRoute.title}
                        menuPath={applicationRoutes.administrationRoute.usersRoute.route} />}

                    {/* continue watching  */}
                    {currentCourseItemCode &&
                        <NavbarButton
                            menuPath={getCourseItemUrl(currentCourseItemCode)}>

                            <EpistoButton
                                style={{ flex: "1", color: "var(--epistoTeal)" }}
                                variant="outlined"
                                onClick={() => continueCourse()}
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
                <Flex pr="10px" align="center" mr="15px">

                    <EpistoConinInfo height="45px" />

                    <Box width="1px" height="40px" margin="0 10px 0 10px" bg="var(--mildGrey)"></Box>

                    {!!user && <EpistoButton
                        ref={ref}
                        variant="plain"
                        onClick={() => setPopperOpen(true)}
                        padding="0px"
                        isRound
                        size="45px"
                        style={{
                            border: "3px solid var(--epistoTeal)",
                            margin: "0px",
                        }}>
                        <Image
                            className="whall hoverShine"
                            objectFit="cover"
                            src={user.avatarUrl!}></Image>
                    </EpistoButton>}
                </Flex>
            </>}

            {/* user menu */}
            <EpistoPopper
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
