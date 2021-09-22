import React, { useContext } from 'react';
import { Route, Switch } from 'react-router';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { CurrentUserContext } from "../HOC/AuthenticationFrame";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from '../HOC/MainPanels';
import { NavigationLinkList } from '../NavigationLinkList';
import EditItem from "../universal/atomic/editItem/EditItem";
import ProfileImage from "../universal/atomic/profileImage/ProfileImage";
import Navbar from '../universal/navigation/navbar/Navbar';
import classes from './settings.module.scss';
import SettingsItem from "./settings_components/SettingsItem";

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
                <NavigationLinkList items={[
                    applicationRoutes.settingsRoute.preferencesRoute,
                    applicationRoutes.settingsRoute.displayRoute,
                    applicationRoutes.settingsRoute.securityRoute,
                    applicationRoutes.settingsRoute.notificationsRoute
                ]}></NavigationLinkList>
            </LeftPanel>

            <RightPanel>

                <Switch>
                    <Route path={applicationRoutes.settingsRoute.preferencesRoute.route}>
                        <Preferences></Preferences>
                    </Route>

                    <Route path={applicationRoutes.settingsRoute.displayRoute.route}>
                        <DisplaySettings />
                    </Route>

                    <Route path={applicationRoutes.settingsRoute.securityRoute.route}>
                        <SecuritySettings />
                    </Route>

                    <Route path={applicationRoutes.settingsRoute.notificationsRoute.route}>
                        <NotificationSettings />
                    </Route>
                </Switch>
            </RightPanel>
        </ContentWrapper>
    </MainWrapper>
};
