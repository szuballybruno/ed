import { Image } from "@chakra-ui/image";
import { Typography } from "@mui/material";
import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserDTO } from '../../../../models/shared_models/UserDTO';
import { EpistoConinInfo } from "../../../EpistoCoinInfo";
import { EpistoButton } from "../../../controls/EpistoButton";
import classes from './profileStats.module.scss';

//TODO: Remove, not used anywhere
const ProfileStats = (props: { user: UserDTO }) => {

    return <div className={classes.welcomeWrapper}>
        <div className={classes.avatarWrapper}>
            <Image src={props.user.avatarUrl!} />
        </div>
        <div className={classes.userDataWrapper}>
            <div className={classes.userNameWrapper}>
                <Typography variant={"h5"}>Helló újra, {`${props.user.firstName}`}</Typography>
            </div>
            <div className={classes.userRoleWrapper}>
                <Typography variant={"overline"}>{props.user.jobTitle || "Nincs megadva pozíció"}</Typography>
            </div>
            <NavLink to={"/profilom"} className={classes.selectProfileWrapper}>
                <EpistoButton variant="outlined">Profilom</EpistoButton>

                {/* episto coin */}
                <EpistoConinInfo></EpistoConinInfo>
            </NavLink>

        </div>
    </div>
}

export default ProfileStats;
