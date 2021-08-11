import React from 'react';
import classes from "./profileCourseStats.module.scss";
import {useState} from "@hookstate/core";
import userSideState from "../../../../store/user/userSideState";
import {globalConfig} from "../../../../configuration/config";

const ProfileCourseStats = (props: { style?: React.CSSProperties }) => {
    const user = useState(userSideState)

    const ProfileCourseStatsItem = (props: {dataCount: number, dataString: string, imageSrc: string}) => {
        return <div className={classes.firstRowStatsItem}>
            <div className={classes.firstRowStatsItemHeader}>
                <h2>{props.dataCount + props.dataString}</h2>
            </div>
            <div className={classes.firstRowStatsItemImage}>
                <img alt="statisztikavideo" src={props.imageSrc} />
            </div>
        </div>
    }

    //TODO: Kurzusok, tesztek, és vizsgák számának lekérdezhetősége
    //TODO: Opcióknak külön komponensek

    return (
        user.get() ? <div style={props.style} className={classes.firstRowStatsContainer}>
            <div className={classes.firstRowStatsInnerContainer}>
                <div className={classes.firstRowStatsHeaderWrapper}>
                    <h1>Statisztikám</h1>
                </div>

                <div className={classes.firstRowStatsWrapper}>
                    <ProfileCourseStatsItem dataCount={182} dataString={" videó"} imageSrc={`${globalConfig.assetStorageUrl}/application/statisztikavideo.png`} />
                    <ProfileCourseStatsItem dataCount={23} dataString={" kurzus"} imageSrc={`${globalConfig.assetStorageUrl}/application/courseding.svg`} />
                    <ProfileCourseStatsItem dataCount={92} dataString={" teszt"} imageSrc={`${globalConfig.assetStorageUrl}/application/completed-task.svg`} />
                    <ProfileCourseStatsItem dataCount={3} dataString={" vizsga"} imageSrc={`${globalConfig.assetStorageUrl}/application/online-learning.svg`} />
                </div>
            </div>
        </div> : <div>barack</div>
    );
};

export default ProfileCourseStats;
