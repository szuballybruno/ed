import { Box, Flex } from "@chakra-ui/react";
import LogoutIcon from '@mui/icons-material/Logout';
import { Typography } from "@mui/material";
import React, { useContext, useRef, useState } from 'react';
import { applicationRoutes } from "../../configuration/applicationRoutes";
import { getAssetUrl } from "../../frontendHelpers";
import { ApplicationRoute } from "../../models/types";
import { useLogout } from "../../services/dataService";
import { getCourseItemUrl, useNavigation } from "../../services/navigatior";
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
    const [popperOpen, setPopperOpen] = useState(false);
    const hideLinks = props.hideLinks || !user;
    const { logoutUserAsync } = useLogout();
    const showError = useShowErrorDialog();

    const handleLogout = async () => {

        try {

            await logoutUserAsync();
            await fetchUserAsync();
        }
        catch (e) {

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
                            menuPath={getCourseItemUrl(currentCourseItemCode)}>

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
                </Flex >

                {/* content */}
                <Flex pr="10px" align="center" mr="15px">

                    <EpistoConinInfo height="45px" />

                    <Box width="1px" height="40px" margin="0 10px 0 10px" bg="var(--mildGrey)"></Box>

                    {!!user && <ProfileImage
                        url={user?.avatarUrl ?? null}
                        onClick={() => setPopperOpen(true)}
                        cursor="pointer"
                        className="square50"
                        ref={ref}></ProfileImage>}
                </Flex>
            </>}

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
            </EpistoPopper >
        </Flex >
    );
};

export default DesktopNavbar;
