import React, { useContext } from 'react';
import classes from './settings.module.scss'
import AdminDashboardHeader from "../administration/universal/adminDashboardHeader/AdminDashboardHeader";
import ProfileImage from "../universal/atomic/profileImage/ProfileImage";
import SettingsItem from "./settings_components/SettingsItem";
import EditItem from "../universal/atomic/editItem/EditItem";
import { CurrentUserContext } from "../HOC/AuthenticationFrame";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from '../HOC/MainPanels';
import Navbar from '../universal/navigation/navbar/Navbar';
import { RouteItemType } from '../../models/types';
import { NavigationLinkList } from '../NavigationLinkList';
import { Route, Switch } from 'react-router';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import MonitorIcon from '@mui/icons-material/Monitor';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';

const menuItems = [
    {
        title: "Adatlap",
        route: "/settings/preferences",
        icon: <PersonIcon color="secondary"></PersonIcon>
    },
    {
        title: "Megjelenítés",
        route: "/settings/display",
        icon: <MonitorIcon color="secondary"></MonitorIcon>
    },
    {
        title: "Biztonság",
        route: "/settings/security",
        icon: <SecurityIcon color="secondary"></SecurityIcon>
    },
    {
        title: "Értesítések",
        route: "/settings/notifications",
        icon: <NotificationsIcon color="secondary"></NotificationsIcon>
    }
] as RouteItemType[];

export const UserSettingsPage = () => {

    const user = useContext(CurrentUserContext);

    const dataSheetData = {
        name: "Név",
        email: "E-mail",
        jobTitle: "Beosztás",
        phoneNumber: "Telefonszám",
        userDescription: "Bemutatkozás",
        linkedInUrl: "LinkedIn"
    }

    const viewSettingsData = [
        "Téma",
        "Akadálymentesített mód",
        "Csökkentett adatforgalom"
    ]

    const notificationData = [
        "Új ajánlott kurzus",
        "Új kurzusok",
        "Vizsgaeredmény érkezett",
        "Új hírek az üzenőfalon",
        "Új vizsgakitöltés (csoportvezető)",
        "Jelentés elérhető (csoportvezető)",
        "Segítségkérés (csoportvezető)"
    ]

    const setSemmi = () => {
    }

    const Preferences = () => <>
        <div className={classes.dataSheetWrapper}>
            <div className={classes.profileImageWrapper}>
                <ProfileImage imageUrl={user?.avatarUrl ? user?.avatarUrl : ""} />
            </div>
            <div className={classes.dataSheetItemWrapper}>
                <EditItem
                    name={`asd`}
                    value={user?.name}
                    title={dataSheetData.name} />
                <EditItem
                    name={`asd`}
                    value={user?.email}
                    title={dataSheetData.email} />
                <EditItem
                    name={`asd`}
                    value={user?.phoneNumber}
                    title={dataSheetData.phoneNumber} />
                <EditItem
                    name={`asd`}
                    value={user?.jobTitle}
                    title={dataSheetData.jobTitle} />
            </div>
        </div>
    </>

    const DisplaySettings = () => <>
        <div className={classes.viewSettingsWrapper}>
            {viewSettingsData.map((item, index) => {
                return <SettingsItem title={item} switchState={false} switchOnChange={setSemmi} switchProperty={"twoFactorAuth"} />
            })}
        </div>
    </>

    const SecuritySettings = () => <>
        <div className={classes.securityWrapper}>
            <SettingsItem title={"Kétfaktoros autentikáció"} switchState={false} switchOnChange={setSemmi} switchProperty={"twoFactorAuth"} />
            <SettingsItem title={"Engedélyezett otthoni eszközök"} linkTitle={"Eszközök mutatása"} onClick={setSemmi} />
            <SettingsItem linkTitle={"Jelszó módosítása"} link={"/profilom/beallitasok/jelszo"} />
        </div>
    </>

    const NotificationSettings = () => <>
        <div className={classes.notificationsWrapper}>
            {notificationData.map((item, index) => {
                return <SettingsItem title={item} switchState={false} switchOnChange={setSemmi} switchProperty={"twoFactorAuth"} />
            })}
        </div>
    </>

    return <MainWrapper>

        <Navbar />

        <ContentWrapper>

            <LeftPanel p="20px">
                <NavigationLinkList items={menuItems}></NavigationLinkList>
            </LeftPanel>

            <RightPanel>

                <Switch>
                    <Route path={'/settings/preferences'}>
                        <Preferences></Preferences>
                    </Route>

                    <Route path={'/settings/display'}>
                        <DisplaySettings />
                    </Route>

                    <Route path={'/settings/security'}>
                        <SecuritySettings />
                    </Route>

                    <Route path={'/settings/notifications'}>
                        <NotificationSettings />
                    </Route>
                </Switch>
            </RightPanel>
        </ContentWrapper>
    </MainWrapper>
};
