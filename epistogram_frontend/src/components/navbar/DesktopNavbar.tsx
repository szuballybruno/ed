import { Box, Divider, Flex } from "@chakra-ui/react";
import { LocalMallOutlined, NotificationsNone } from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';
import { Typography } from "@mui/material";
import React, { useContext, useRef, useState } from 'react';
import { applicationRoutes } from "../../configuration/applicationRoutes";
import { getAssetUrl, getUrl } from "../../frontendHelpers";
import { mockNotifications } from "../../mockData";
import { ApplicationRoute } from "../../models/types";
import { useLogout } from "../../services/dataService";
import { useNavigation } from "../../services/navigatior";
import { useShowErrorDialog } from "../../services/notifications";
import { EpistoConinInfo } from "../EpistoCoinInfo";
import { CurrentUserContext, RefetchUserAsyncContext } from "../HOC/AuthenticationFrame";
import { ProfileImage } from "../ProfileImage";
import { EpistoButton } from "../universal/EpistoButton";
import { EpistoPopper } from "../universal/EpistoPopper";
import NavbarButton from "../universal/NavbarButton";

const menuItems = [
    applicationRoutes.homeRoute,
    applicationRoutes.availableCoursesRoute,
    applicationRoutes.learningRoute
] as ApplicationRoute[];

const DesktopNavbar = (props: {
    currentCourseItemCode: string | null,
    hideLinks: boolean
}) => {

    const { navigateToPlayer, navigate } = useNavigation();
    const currentCourseItemCode = props.currentCourseItemCode;
    const continueCourse = () => navigateToPlayer(currentCourseItemCode!);

    const homeUrl = applicationRoutes.rootHomeRoute.route;
    const user = useContext(CurrentUserContext)!;
    const fetchUserAsync = useContext(RefetchUserAsyncContext);

    const ref = useRef<HTMLDivElement>(null);
    const [notificationsPopperOpen, setNotificationsPopperOpen] = useState(false);
    const [settingsPopperOpen, setSettingsPopperOpen] = useState(false);
    const hideLinks = props.hideLinks || !user;
    const { logoutUserAsync } = useLogout();
    const showError = useShowErrorDialog();

    const handleLogout = async () => {

        try {

            await logoutUserAsync();
            await fetchUserAsync();
        } catch (e) {

            showError(e);
        }
    }

    const userMenuItems = [
        {
            name: applicationRoutes.settingsRoute.title,
            icon: applicationRoutes.settingsRoute.icon,
            onClick: () => navigate(applicationRoutes.settingsRoute.preferencesRoute.route)
        },
        {
            name: applicationRoutes.settingsRoute.featurePreviewRoute.title,
            icon: applicationRoutes.settingsRoute.featurePreviewRoute.icon,
            onClick: () => navigate(applicationRoutes.settingsRoute.featurePreviewRoute.route)
        },
        {
            name: applicationRoutes.settingsRoute.developmentNotes.title,
            icon: applicationRoutes.settingsRoute.developmentNotes.icon,
            onClick: () => navigate(applicationRoutes.settingsRoute.developmentNotes.route)
        },
        {
            name: "Kijelentkezés",
            icon: <LogoutIcon></LogoutIcon>,
            color: "var(--mildRed)",
            onClick: handleLogout
        }
    ]

    return (
        <Flex align="center" width="100%" justify="space-between">

            {/* logo link */}
            <img
                src={getAssetUrl("/images/logo.svg")}
                style={{
                    width: "150px",
                    height: "80px",
                    objectFit: "contain",
                    marginLeft: "15px",
                    cursor: "pointer",
                }}
                alt=""
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
                            menuPath={getUrl(applicationRoutes.playerRoute.route, { itemCode: currentCourseItemCode })}>

                            <EpistoButton
                                style={{ flex: "1", color: "var(--epistoTeal)" }}
                                variant="outlined"
                                onClick={() => continueCourse()}
                                icon={
                                    <img
                                        alt=""
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
                </Flex>

                {/* content */}
                <Flex pr="10px" align="center" mr="15px">

                    <EpistoButton
                        style={{
                            height: 35,
                            fontStyle: "normal",
                        }}
                        onClick={() => {
                            navigate("/shop")
                        }}
                        variant={"plain"}
                    >
                        <Typography fontSize={"1.0em"} style={{
                            margin: "0 7px",
                            textTransform: "uppercase"
                        }}>Áruház</Typography>
                        <LocalMallOutlined />
                    </EpistoButton>

                    <EpistoButton
                        style={{
                            borderRadius: "100%",
                            width: 35,
                            height: 35
                        }}
                        variant={"plain"}
                        onClick={() => {
                            setNotificationsPopperOpen(true)
                        }}
                    >
                        <NotificationsNone />
                    </EpistoButton>

                    <Box width="1px" height="40px" margin="0 10px 0 10px" bg="var(--mildGrey)"></Box>

                    {!!user && <ProfileImage
                        url={user?.avatarUrl ?? null}
                        onClick={() => setSettingsPopperOpen(true)}
                        cursor="pointer"
                        className="square50"
                        ref={ref}></ProfileImage>}
                </Flex>
            </>}

            {/* notifications menu */}
            <EpistoPopper
                isOpen={notificationsPopperOpen}
                target={ref?.current}
                placementX="left"
                handleClose={() => setNotificationsPopperOpen(false)}>
                {mockNotifications
                    .map((x, index) => {

                        return <Flex w={200} flexDirection={"column"} >
                            <Flex w={200} alignItems={"center"} justifyContent={"center"} my={10}>
                                <div style={{
                                    width: 3,
                                    height: 3,
                                    backgroundColor: "blue",
                                    borderRadius: "50%"
                                }} />

                                <Typography
                                    style={{
                                        marginLeft: "14px",
                                        textAlign: "left",
                                        fontSize: "14px"
                                    }}>
                                    {x.title}
                                </Typography>
                            </Flex>
                            {index + 1 < mockNotifications.length && <Divider h={1} w={"100%"} bgColor={"grey"} />}
                        </Flex>
                    })}
            </EpistoPopper>

            {/* user menu */}
            <EpistoPopper
                isOpen={settingsPopperOpen}
                target={ref?.current}
                placementX="left"
                handleClose={() => setSettingsPopperOpen(false)}>
                <Flex justifyContent={"center"}>
                    <EpistoConinInfo height="45px" />
                </Flex>
                <Divider h={1} w={"100%"} bgColor={"black"} />
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
        </Flex>
    );
};

export default DesktopNavbar;
