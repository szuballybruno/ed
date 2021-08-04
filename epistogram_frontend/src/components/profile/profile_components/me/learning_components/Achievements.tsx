import React from 'react';
import classes from './achievements.module.scss'
import Cookies from "universal-cookie";
import {config} from "../../../../../configuration/config";
import {Typography} from "@material-ui/core";

const Achievements = () => {
    const cookies = new Cookies();
    const AchievementItem = (props: {itemUrl: string, itemTitle: string}) => {
        return <div className={classes.achievementItem}>
            <div className={classes.achievementItemInnerContainer}>
                <img alt={""} src={props.itemUrl} />
            </div>
            <Typography className={classes.achievementItemTitle}>{props.itemTitle}</Typography>
        </div>
    }
    return (
        <div className={classes.achievementsContainer}>
            <div className={classes.achievementsInnerContainer}>
                <AchievementItem itemUrl={config.assetStorageUrl + "/users/" + cookies.get("userId") + "/badges/achievement-52-124188.svg"} itemTitle={"Született marketinges"}/>
                <AchievementItem itemUrl={config.assetStorageUrl + "/users/" + cookies.get("userId") + "/badges/achievement-53-124196.svg"} itemTitle={"A csoport bajnoka"}/>
            </div>
        </div>
    );
};

export default Achievements;
