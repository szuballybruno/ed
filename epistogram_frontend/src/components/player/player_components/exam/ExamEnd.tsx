import React from 'react';
import classes from "./exam.module.scss";
import Lottie from "lottie-web-react";
import downArrow from "./download.png"
import {config} from "../../../../configuration/config";

const ExamEnd = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: `${config.assetStorageUrl}/application/11272-party-popper.json`,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className={classes.examInnerWrapper}>
            <div className={classes.examEndHeading}>
                <div className={classes.examEndImageWrapper}>
                    <Lottie className={classes.examEndImage}
                            options={defaultOptions}
                            playingState={"play"}
                    />
                </div>
                <p className={classes.examEndText}>Sikeresen teljesítetted a CyberSecurity Alapok kurzust! Okleveled letöltéséhez kattints az alábbi gombra!</p>
                <a href={"https://cdn.discordapp.com/attachments/746265082639417447/749556066294956032/Gratulalunk-Edina.pdf"} target="_new">
                    <img alt="" className={classes.examEndButton}
                         src={downArrow}/>
                </a>
            </div>
        </div>
    );
};

export default ExamEnd;
