import { Box, Divider, Flex, useMediaQuery } from "@chakra-ui/react";
import { Home, LocalMallOutlined, NotificationsNone } from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';
import { Typography } from "@mui/material";
import React, { useContext, useRef, useState } from 'react';
import { applicationRoutes } from "../../configuration/applicationRoutes";
import { getAssetUrl, getUrl } from "../../static/frontendHelpers";
import { mockNotifications } from "../../static/mockData";
import { ApplicationRoute } from "../../models/types";
import { useNavigation } from "../../services/core/navigatior";
import { useShowErrorDialog } from "../../services/core/notifications";
import { EpistoConinInfo } from "../EpistoCoinInfo";
import { CurrentUserContext, RefetchUserAsyncContext } from "../system/AuthenticationFrame";
import { ProfileImage } from "../ProfileImage";
import NavbarButton from "../universal/NavbarButton";
import { useLogout } from "../../services/api/authenticationApiService";
import { currentVersion } from "../../static/Environemnt";
import { EpistoButton } from "../controls/EpistoButton";
import { EpistoPopper } from "../controls/EpistoPopper";

const menuItems = [
    applicationRoutes.homeRoute,
    applicationRoutes.availableCoursesRoute,
    applicationRoutes.learningRoute
] as ApplicationRoute[];

const DesktopNavbar = (props: {
    currentCourseItemCode: string | null,
    hideLinks: boolean,
    showLogo?: boolean,
    backgroundContent?: any
}) => {

    const { backgroundContent, showLogo, currentCourseItemCode } = props;
    const { navigateToPlayer, navigate } = useNavigation();
    const continueCourse = () => navigateToPlayer(currentCourseItemCode!);

    const homeUrl = applicationRoutes.rootHomeRoute.route;

    const user = useContext(CurrentUserContext);
    const fetchUserAsync = useContext(RefetchUserAsyncContext);

    const ref = useRef<HTMLDivElement>(null);
    const [notificationsPopperOpen, setNotificationsPopperOpen] = useState(false);
    const [settingsPopperOpen, setSettingsPopperOpen] = useState(false);
    const hideLinks = props.hideLinks || !user;
    const { logoutUserAsync } = useLogout();
    const showError = useShowErrorDialog();

    const [isSmallerThan1180] = useMediaQuery('(min-width: 1180px)');
    const [isSmallerThan1000] = useMediaQuery('(min-width: 1000px)');

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
    ];

    const handleNavToCoinTransactions = () => {

        navigate(applicationRoutes.settingsRoute.coinTransactionsRoute.route);
    }

    return (
        <Flex
            align="center"
            width="100%"
            flex="1"
            height="60px"
            mt="10px"
            mb="10px"
            bg={backgroundContent}
            justify={hideLinks ? "center" : "space-between"}>

            {/* logo link */}

            {showLogo && <img
                src={getAssetUrl("/images/logo.svg")}
                style={{
                    width: "150px",
                    height: "50px",
                    objectFit: "contain",
                    cursor: "pointer",
                }}
                alt=""
                onClick={() => {
                    if (user?.userActivity?.canAccessApplication)
                        navigate(homeUrl);
                }} />}


            {/* menu items */}
            {
                !hideLinks && <>
                    {(isSmallerThan1180 && !showLogo) || (isSmallerThan1000 && showLogo) ?
                        <Flex height="50px" flex="1 0 600px">

                            {menuItems
                                .map((item, index) => {
                                    return <NavbarButton
                                        key={index}
                                        menuName={item.title}
                                        menuPath={item.route} />
                                })}

                            {/* continue watching with or without text  */}
                            {currentCourseItemCode &&
                                <NavbarButton
                                    menuPath={getUrl(applicationRoutes.playerRoute.route, { itemCode: currentCourseItemCode })}>

                                    <EpistoButton
                                        className="mildShadow"
                                        style={{
                                            flex: "1",
                                            color: "--epistoTeal",
                                            background: "var(--transparentWhite70)",
                                            border: "none"
                                        }}
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
                        </Flex> : <Flex>

                            {menuItems
                                .map((item, index) => {

                                    return <EpistoButton
                                        variant="plain"
                                        key={index}
                                        onClick={() => {
                                            navigate(item.route)
                                        }}>
                                        {item.icon}
                                    </EpistoButton>
                                })}

                            {/* continue watching  */}
                            {currentCourseItemCode &&
                                <NavbarButton
                                    menuPath={getUrl(applicationRoutes.playerRoute.route, { itemCode: currentCourseItemCode })}>

                                    <EpistoButton
                                        className="mildShadow"
                                        style={{
                                            color: "--epistoTeal",
                                            background: "var(--transparentWhite70)",
                                            border: "none"
                                        }}
                                        variant="outlined"
                                        onClick={() => continueCourse()}
                                        icon={
                                            <img
                                                alt=""
                                                src={getAssetUrl("/icons/play2.svg")}
                                                style={{
                                                    width: "25px",
                                                    height: "25px",
                                                }} />
                                        } />
                                </NavbarButton>}
                        </Flex>}

                    {/* shop and notification buttons */}
                    <Flex pr="10px" align="center" mr="15px">

                        {/* shop button */}
                        <EpistoButton
                            style={{
                                height: 40,
                                fontStyle: "normal"
                            }}
                            onClick={() => {
                                navigate("/shop")
                            }}
                            variant={"plain"}>

                            <Typography
                                fontSize={"1.0em"}
                                style={{
                                    margin: "0 7px",
                                    fontWeight: 500,
                                    textTransform: "uppercase"
                                }}>
                                Áruház
                            </Typography>

                            <img
                                className="square50"
                                src={getAssetUrl("/images/shop3D.png")}
                                alt=""
                                style={{
                                    objectFit: "contain"
                                }} />
                        </EpistoButton>

                        {/* notification bell 
                        <EpistoButton
                            className="roundBorders square50"
                            variant={"plain"}
                            onClick={() => {
                                setNotificationsPopperOpen(true)
                            }}>

                            <img
                                className="square50"
                                src={getAssetUrl("/images/bell3D.png")}
                                alt=""
                                style={{
                                    objectFit: "cover"
                                }} />
                        </EpistoButton>*/}

                        {/* vertical divider */}
                        <Box
                            width="1px"
                            height="40px"
                            margin="0 10px 0 10px"
                            bg="var(--mildGrey)">

                        </Box>

                        {!!user && <ProfileImage
                            url={user?.avatarUrl ?? null}
                            onClick={() => setSettingsPopperOpen(true)}
                            cursor="pointer"
                            className="square50"
                            ref={ref}></ProfileImage>}
                    </Flex>
                </>
            }

            {/* notifications menu */}
            <EpistoPopper
                isOpen={notificationsPopperOpen}
                target={ref?.current}
                placementX="left"
                handleClose={() => setNotificationsPopperOpen(false)}>

                {mockNotifications
                    .map((x, index) => {

                        return <Flex width={200} flexDirection={"column"}>

                            <Flex
                                width={200}
                                alignItems={"center"}
                                justifyContent={"center"}
                                my={10}>

                                <div
                                    style={{
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

                            {index + 1 < mockNotifications.length && <Divider height={1} width="100%" bgColor={"grey"} />}
                        </Flex>
                    })}
            </EpistoPopper>

            {/* user menu */}
            <EpistoPopper
                isOpen={settingsPopperOpen}
                target={ref?.current}
                placementX="left"
                handleClose={() => setSettingsPopperOpen(false)}>

                {/* episto coins */}
                <EpistoButton onClick={handleNavToCoinTransactions}>
                    <EpistoConinInfo height="45px" />
                </EpistoButton>

                <Divider height={1} width="100%" bgColor={"black"} />

                {user?.userActivity?.canAccessAdministration && <EpistoButton
                    variant={undefined}
                    onClick={() => {
                        navigate(applicationRoutes.administrationRoute.usersRoute.route)
                    }}>

                    <Flex className="whall" m="5px" align="center">

                        {applicationRoutes.administrationRoute.icon}

                        <Typography
                            style={{
                                marginLeft: "14px",
                                textAlign: "left",
                                fontSize: "14px"
                            }}>

                            {applicationRoutes.administrationRoute.title}
                        </Typography>
                    </Flex>
                </EpistoButton>}

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
                {/* version */}
                <Typography
                    style={{
                        zIndex: 3,
                        color: "gray",
                        background: "white",
                        padding: "5px",
                        marginTop: "20px"
                    }}
                    className="fontMid">
                    Verzió: {currentVersion ?? "1999.01.01.01:01"}
                </Typography>
            </EpistoPopper>
        </Flex >
    );
};

export default DesktopNavbar;
