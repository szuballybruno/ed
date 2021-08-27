
import React, { useEffect } from 'react';
import classes from './editUser.module.scss'
import EditItem from "../../../../universal/atomic/editItem/EditItem";
import SettingsItem from "../../../../profile/profile_components/settings/settings_components/SettingsItem";
import instance from "../../../../../services/axiosInstance";
import { useState } from "@hookstate/core";
import adminSideState from '../../../../../store/admin/adminSideState';
import applicationRunningState from "../../../../../store/application/applicationRunningState";
import { user } from '../../../../../store/types/user';
import { AdminPageUserDTO } from '../../../../../models/shared_models/AdminPageUserDTO';

const EditUser = (props: {
    user: AdminPageUserDTO
    index: number
}) => {
    const admin = useState(adminSideState)
    const app = useState(applicationRunningState)
    const active = useState(true)

    useEffect(() => {

        active.set(props.user.isActive)
    }, [])

    const dataSheetData = [{
        name: "Vezetéknév",
        placeholderName: "lastName"
    }, {
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
        name: "Jogosultsági szint",
        placeholderName: "role"
    }]

    return (
        <div className={classes.editUserContainer}>
            <div className={classes.editItemContainer}>
                {dataSheetData.map((data) => {
                    return <EditItem value={`${props.user[data.placeholderName as keyof typeof props.user] || ""}`}
                        onChange={(e: React.ChangeEvent<any>) => {
                            instance.patch(`users/${props.user.userId}`, {
                                "userData": {
                                    [data.placeholderName]: "" + e.currentTarget.value
                                }
                            }).then((r) => {
                                // @ts-ignore
                                admin.users[props.index][data.placeholderName as keyof user].set(value)
                                app.snack.showSnack.set(true)
                                app.snack.snackTitle.set(`Az új ${data.name}: ${e.currentTarget.value}`)
                            }).catch((e) => {
                                console.log("asd" + e)
                            })
                        }}
                        name={data.placeholderName}
                        title={data.name}
                        className={classes.editItem}
                    />
                })}
            </div>
            <div className={classes.switchSettingsContainer}>
                <SettingsItem title={"Fiók aktív"}
                    switchState={active.get()}
                    switchOnChange={() => {
                        instance.patch(`users/${props.user.userId}`, {
                            "userData": {
                                "active": !active.get()
                            }
                        }).then((r) => {
                            active.set(p => !p)
                            admin.users[props.index].active.set(active.get());
                            app.snack.showSnack.set(true)
                            app.snack.snackTitle.set(active.get() ? "A fiók mostantól aktív" : "A fiók mostantól innaktív")
                        }).catch((e) => {
                            console.log("asd" + e)
                        })
                    }}
                    switchProperty={"twoFactorAuth"}
                    className={classes.settingsSwitch} />
                <SettingsItem title={"Jelszó visszaállítása"}
                    linkTitle={"Visszaállító email küldése"}
                    onClick={() => {
                        instance.get(`users/${props.user.userId}/reset`).then((r) => {
                            app.snack.showSnack.set(true)
                            app.snack.snackTitle.set("Jelszó visszaállító e-mail kiküldve a felhasználónak")
                        }).catch((e) => {
                            console.log("asd" + e)
                        })
                    }}
                    className={classes.settingsSwitch} />
                <SettingsItem title={"Felhasználó fiókjának törlése"} linkTitle={"Végleges törlés"} onClick={() => { }} className={classes.settingsSwitch} />
            </div>
        </div>
    );
};

export default EditUser;
