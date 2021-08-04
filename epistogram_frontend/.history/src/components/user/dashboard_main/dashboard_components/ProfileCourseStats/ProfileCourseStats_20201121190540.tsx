import React from 'react';
import classes from "./profileCourseStats.module.scss";
import Lottie from "lottie-web-react";
import statisztikavideo from "./statisztikavideo.png";
import {useState} from "@hookstate/core";
import animationData from "./lf30_editor_blw9nb.json";
import userSideState from "../../../../../globalStates/userSideState";

const ProfileCourseStats = (props: { style?: React.CSSProperties }) => {
    const user = useState(userSideState)

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

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
                    <Lottie className={classes.firstRowStatsAnimation}
                            options={defaultOptions}
                            playingState={"play"}
                    />
                </div>

                <div className={classes.firstRowStatsWrapper}>
                    <ProfileCourseStatsItem dataCount={182} dataString={" videó"} imageSrc={statisztikavideo} />
                    <ProfileCourseStatsItem dataCount={23} dataString={" kurzus"} imageSrc={'https://itsfourothree.hu/uploads/themes/normaltheme/dashboardmain/dashboardfirstrow/elearning.png'} />
                    <ProfileCourseStatsItem dataCount={92} dataString={" teszt"} imageSrc={'https://itsfourothree.hu/uploads/themes/normaltheme/dashboardmain/dashboardfirstrow/task.png'} />
                    <ProfileCourseStatsItem dataCount={3} dataString={" vizsga"} imageSrc={'https://itsfourothree.hu/uploads/themes/normaltheme/dashboardmain/dashboardfirstrow/certificate.png'} />
                </div>
            </div>
        </div> : <div>barack</div>
    );
};

export default ProfileCourseStats;
