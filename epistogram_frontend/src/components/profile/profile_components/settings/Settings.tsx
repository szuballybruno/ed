import React from 'react';
import classes from './settings.module.scss'
import {useState} from "@hookstate/core";
import userDetailsState from "../../../../store/user/userSideState";
import AdminDashboardHeader from "../../../administration/universal/adminDashboardHeader/AdminDashboardHeader";
import ProfileImage from "../../../universal/atomic/profileImage/ProfileImage";
import SettingsItem from "./settings_components/SettingsItem";
import EditItem from "../../../universal/atomic/editItem/EditItem";
import {Cookies} from "react-cookie";
import instance from "../../../../services/axiosInstance";


const Settings = () => {
    const user = useState(userDetailsState)
    const cookies = new Cookies()

    const dataSheetData = [{
        name: "Vezetéknév",
        placeholderName: "lastName"
    },{
        name: "Keresztnév",
        placeholderName: "firstName"
    }, {
        name: "E-mail",
        placeholderName: "email"
    }, {
        name: "Beosztás",
        placeholderName: "innerRole"
    }, {
        name: "Telefonszám",
        placeholderName: "phoneNumber"
    }, {
        name: "Bemutatkozás",
        placeholderName: "userDescription"
    },{
        name: "LinkedIn",
        placeholderName: "linkedInUrl"
    }]

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
                    <ProfileImage />
                </div>
                <div className={classes.dataSheetItemWrapper}>
                    {dataSheetData.map((data) => {
                        return <EditItem name={`${user.userData[data.placeholderName as keyof typeof user.userData].get() || ""}`}
                                         editOnChange={(e: React.ChangeEvent<any>) => {
                                             instance.patch(`users/${cookies.get("userId")}`, {
                                                 "userData": {
                                                     [data.placeholderName]: "" + e.currentTarget.value
                                                 }
                                             }).then((r) => {
                                                 //@ts-ignore
                                                 user.userData[data.placeholderName].set(e.currentTarget.value)
                                             }).catch((e) => {
                                                 console.log("asd" + e)
                                             })
                                         }}
                                         value={data.placeholderName}
                                         title={data.name} />
                    })}
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
                <SettingsItem title={"Engedélyezett otthoni eszközök"} linkTitle={"Eszközök mutatása"} onClick={setSemmi}  />
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
