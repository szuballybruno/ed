import React from 'react';
import classes from './playerDescription.module.scss'
import {useState} from "@hookstate/core";
import userSideState from "../../../../../store/user/userSideState";
import {Divider, Typography} from "@material-ui/core";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import applicationRunningState from "../../../../../store/application/applicationRunningState";

const PlayerDescription = () => {
    const user = useState(userSideState)



    const breakText = (inputText: string) => {
        try {
            const text = inputText.split("<br />");
            return text.map((textike: string, index: number) => {
                return <p key={index}>{text[index]}<br /></p>;
            });
        } catch {
            return "";
        }
    };

    return(
        <div className={classes.descriptionWrapper}>
            <div className={classes.innerDescriptionWrapper}>
                <div className={classes.descriptionTextWrapper}>
                    <Typography>{breakText(user.userData.currentItem.description.get() as string)}</Typography>
                </div>
            </div>
        </div>
    )
};

export default PlayerDescription
