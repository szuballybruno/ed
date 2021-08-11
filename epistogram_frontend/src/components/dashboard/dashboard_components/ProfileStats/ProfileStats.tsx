import React from 'react';
import classes from './profileStats.module.scss';
import {useState} from "@hookstate/core";
import userSideState from "../../../../store/user/userSideState";
import {NavLink} from 'react-router-dom';
import ProfileImage from "../../../universal/atomic/profileImage/ProfileImage";
import {globalConfig} from "../../../../configuration/config";
import {Button, Typography} from "@material-ui/core";

const ProfileStats: React.FunctionComponent<any> = () => {
    const user = useState(userSideState)

    return <div className={classes.welcomeWrapper}>
            <div className={classes.avatarWrapper}>
               <ProfileImage />
            </div>
            <div className={classes.userDataWrapper}>
                <div className={classes.userNameWrapper}>
                    <Typography variant={"h5"}>Helló újra, {`${user.userData.firstName.get()}`}</Typography>
                </div>
                <div className={classes.userRoleWrapper}>
                    <Typography variant={"overline"}>{user.userData.innerRole.get() || "Nincs megadva pozíció"}</Typography>
                </div>
                <NavLink to={"/profilom"} className={classes.selectProfileWrapper}>
                    <Button variant={"outlined"}>Profilom</Button>
                    <div className={classes.epistoCoinWrapper}>
                        <Typography variant={"button"}>23.459</Typography>
                        <img alt={""} src={`${globalConfig.assetStorageUrl}/application/episto.png`} />
                    </div>
                </NavLink>

            </div>
        </div>
}

export default ProfileStats;
