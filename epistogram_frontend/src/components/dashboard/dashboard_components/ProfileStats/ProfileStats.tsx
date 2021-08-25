import { Button, Typography } from "@material-ui/core";
import React from 'react';
import { NavLink } from 'react-router-dom';
import { globalConfig } from "../../../../configuration/config";
import { UserDTO } from '../../../../models/shared_models/UserDTO';
import ProfileImage from "../../../universal/atomic/profileImage/ProfileImage";
import classes from './profileStats.module.scss';

const ProfileStats = (props: { user: UserDTO }) => {

    return <div className={classes.welcomeWrapper}>
        <div className={classes.avatarWrapper}>
            <ProfileImage />
        </div>
        <div className={classes.userDataWrapper}>
            <div className={classes.userNameWrapper}>
                <Typography variant={"h5"}>Helló újra, {`${props.user.firstName}`}</Typography>
            </div>
            <div className={classes.userRoleWrapper}>
                <Typography variant={"overline"}>{props.user.jobTitle || "Nincs megadva pozíció"}</Typography>
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
