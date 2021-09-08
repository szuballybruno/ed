import React, {useContext} from 'react';
import classes from './settings.module.scss'
import AdminDashboardHeader from "../../../administration/universal/adminDashboardHeader/AdminDashboardHeader";
import ProfileImage from "../../../universal/atomic/profileImage/ProfileImage";
import SettingsItem from "./settings_components/SettingsItem";
import EditItem from "../../../universal/atomic/editItem/EditItem";
import {CurrentUserContext} from "../../../../HOC/AuthenticationFrame";


const Settings = () => {

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

    return (
        <div className={classes.settingsWrapper}>
            <AdminDashboardHeader titleText={"Adatlap"} />
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


            <AdminDashboardHeader titleText={"Megjelenítés"} />
            <div className={classes.viewSettingsWrapper}>
                {viewSettingsData.map((item, index) => {
                    return <SettingsItem title={item} switchState={false} switchOnChange={setSemmi} switchProperty={"twoFactorAuth"} />
                })}
            </div>


            <AdminDashboardHeader titleText={"Biztonság"} />
            <div className={classes.securityWrapper}>
                <SettingsItem title={"Kétfaktoros autentikáció"} switchState={false} switchOnChange={setSemmi} switchProperty={"twoFactorAuth"} />
                <SettingsItem title={"Engedélyezett otthoni eszközök"} linkTitle={"Eszközök mutatása"} onClick={setSemmi} />
                <SettingsItem linkTitle={"Jelszó módosítása"} link={"/profilom/beallitasok/jelszo"} />
            </div>


            <AdminDashboardHeader titleText={"Értesítések"} />
            <div className={classes.notificationsWrapper}>
                {notificationData.map((item, index) => {
                    return <SettingsItem title={item} switchState={false} switchOnChange={setSemmi} switchProperty={"twoFactorAuth"} />
                })}


            </div>
            <AdminDashboardHeader titleText={""} />
        </div>
    );
};

export default Settings;
