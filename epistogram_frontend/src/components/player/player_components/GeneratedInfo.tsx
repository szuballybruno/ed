import React from "react";
import classes from "../playerMain.module.scss";
import {useState} from "@hookstate/core";
import userSideState from "../../../store/user/userSideState"

const GeneratedInfo = () => {
    const user= useState(userSideState);
    const timer = () => {
        let hours = user.userData.currentItem.length.get() / 3600,
            minutes = (hours % 1) * 60,
            seconds = (minutes % 1) * 60;
        return Math.floor(minutes) + ":" + Math.round(seconds);
    };

    return user.userData.currentItem.get() ? <div className={classes.generatedInfoWrapperOnlyMobile}>
        <span>&#8226; {user.userData.currentItem.title.get()} &#8226; {timer()} &#8226; {Math.floor(user.userData.currentItem.length.get() * 0.107)} pontot tudsz szerezmo &#8226; </span>
    </div> : null
};

export default GeneratedInfo
