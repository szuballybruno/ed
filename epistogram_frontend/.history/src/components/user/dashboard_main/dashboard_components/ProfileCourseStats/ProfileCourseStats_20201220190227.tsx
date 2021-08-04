import React from 'react';
import classes from "./profileCourseStats.module.scss";
import Lottie from "lottie-web-react";
import video from "./statisztikavideo.png";
import course from "./courseding.svg"
import test from "./completed-task.svg"
import exam from "./online-learning.svg"
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
                    <ProfileCourseStatsItem dataCount={182} dataString={" videó"} imageSrc={video} />
                    <ProfileCourseStatsItem dataCount={23} dataString={" kurzus"} imageSrc={course} />
                    <ProfileCourseStatsItem dataCount={92} dataString={" teszt"} imageSrc={test} />
                    <ProfileCourseStatsItem dataCount={3} dataString={" vizsga"} imageSrc={exam} />
                </div>
            </div>
        </div> : <div>barack</div>
    );
};

export default ProfileCourseStats;
