import React from 'react';
import classes from "./playback.module.scss";
import {NavLink} from "react-router-dom";

const Playback = () => {
    return (
        <div className={classes.firstRowPlaybackContainer}>
            <div className={classes.firstRowPlaybackOne}>
                <h1>Folytatom</h1>
            </div>
            <div className={classes.firstRowPlaybackTwo}>
                <NavLink to={'/cybersecurity-kurzus'}>
                    <div className={classes.firstRowPlaybackThumbnail}>
                        <div className={classes.playbackButton}>

                        </div>
                    </div>
                </NavLink>
            </div>
        </div>
    );
};

export default Playback;
