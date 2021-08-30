import React from "react";
import classes from "../playerMain.module.scss";

const GeneratedInfo = (props: { videoLength: number, videoTitle: string }) => {

    const { videoLength, videoTitle } = props;

    const timer = () => {
        let hours = videoLength / 3600,
            minutes = (hours % 1) * 60,
            seconds = (minutes % 1) * 60;
        return Math.floor(minutes) + ":" + Math.round(seconds);
    };

    return <div className={classes.generatedInfoWrapperOnlyMobile}>
        <span>
            &#8226; {videoTitle} &#8226; {timer()} &#8226; {Math.floor(videoLength * 0.107)} pontot tudsz szerezmo &#8226;
        </span>
    </div>
};

export default GeneratedInfo
