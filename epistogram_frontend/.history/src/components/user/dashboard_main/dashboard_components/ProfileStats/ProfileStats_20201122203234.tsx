import React from 'react';
import classes from './profileStats.module.scss';
import avatar from "../../../player_main/img/avatar-placeholder.png";
import {useState} from "@hookstate/core";
import userSideState from "../../../../../globalStates/userSideState";

const ProfileStats = () => {
    const user = useState(userSideState)

    return <div className={classes.firstRowGreetingContainer}>
            <div className={classes.firstRowGreetingOne}>
                <h1>Helló újra</h1>
            </div>
            <div className={classes.firstRowGreetingTwo}>
                <img alt={"A felhasználó profilképe"}
                     onError={(e)=> {
                         if (e.currentTarget.src !== avatar) {
                             e.currentTarget.src = avatar
                         }
                     }}
                     src={`https://itsfourothree.hu/uploads/users/${localStorage.getItem("userId")}/avatar.${"jpg" || "png"}`} />
            </div>
            <div className={classes.firstRowGreetingThreeFour}>
                <div className={classes.firstRowGreetingThree}>
                    <h2>{`${user.user.userData.lastName.value} ${user.user.userData.firstName.get()}`}</h2>
                </div>
                <div className={classes.firstRowGreetingFour}>
                    <h3>{user.user.userData.innerRole.get() || "Nincs megadva pozíció"}</h3>
                </div>
            </div>
        </div>
}

export default ProfileStats;
