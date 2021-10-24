import React from 'react';
import { getAssetUrl } from '../../../../frontendHelpers';
import classes from "./profileCourseStats.module.scss";

const ProfileCourseStats = (props: { style?: React.CSSProperties }) => {

    const ProfileCourseStatsItem = (props: { dataCount: number, dataString: string, imageSrc: string }) => {
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
        <div style={props.style} className={classes.firstRowStatsContainer}>
            <div className={classes.firstRowStatsInnerContainer}>
                <div className={classes.firstRowStatsHeaderWrapper}>
                    <h1>Statisztikám</h1>
                </div>

                <div className={classes.firstRowStatsWrapper}>
                    <ProfileCourseStatsItem dataCount={182} dataString={"videó"} imageSrc={getAssetUrl("/application/statisztikavideo.png")} />
                    <ProfileCourseStatsItem dataCount={23} dataString={"kurzus"} imageSrc={getAssetUrl("/application/courseding.svg")} />
                    <ProfileCourseStatsItem dataCount={92} dataString={"teszt"} imageSrc={getAssetUrl("/application/completed-task.svg")} />
                    <ProfileCourseStatsItem dataCount={3} dataString={"vizsga"} imageSrc={getAssetUrl("/application/online-learning.svg")} />
                </div>
            </div>
        </div>
    );
};

export default ProfileCourseStats;
