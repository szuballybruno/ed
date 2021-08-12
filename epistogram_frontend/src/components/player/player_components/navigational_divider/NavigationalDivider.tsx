import React from "react";
import classes from './navigationDivider.module.scss';
import {useState} from "@hookstate/core";
import applicationRunningState from "../../../../store/application/applicationRunningState";
import userSideState from "../../../../store/user/userSideState";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import {Divider, Typography} from "@material-ui/core";

const NavigationalDivider = () => {
    const user = useState(userSideState)

    const app = useState(applicationRunningState)

    const activeButton = useState(0);

    const handleClick = (id: number) => {
        activeButton.set(id);
        app.currentDescriptionComponent.set(id as keyof typeof app.currentDescriptionComponent.keys);
    };

    const buttons = useState(
        [
            {
                id: 0,
                name: "Leírás",
                key: 0,
                className: [classes.button, classes.selectedButton].join(' ')
            },
            {
                id: 1,
                name: "Hozzászólások",
                key: 1,
                className: [classes.button]
            }
        ],
    );

    const infos = useState(
        [
            {
                id: 0,
                name: "Leírás",
                key: 0,
            }
        ],
    );



    const timer = () => {
        var hours = user.userData.currentItem.length.get() / 3600,
            minutes = (hours % 1) * 60,
            seconds = (minutes % 1) * 60;
        return Math.floor(minutes) + ":" + Math.round(seconds);
    };

    return (
        <div className={classes.navButtonsAndInfoWrapper}>
            <div className={classes.titleWrapper}>
                <Typography variant={"h4"}>{user.userData.currentItem.title.get()}</Typography>
                <ToggleButtonGroup className={classes.innerButtonsWrapper}>
                    {buttons.get().map((button) => {
                        return (
                            <ToggleButton key={button.id}
                                          className={button.id === activeButton.get() ? [classes.button, classes.selectedButton].join(' ') : [classes.button].join('')}
                                          onClick={() => {handleClick(button.id)}}>
                                <Typography>{button.name}</Typography>
                            </ToggleButton>
                        )
                    })}
                </ToggleButtonGroup>
            </div>
            <div className={classes.dividerWrapper}>
                <Divider style={{zIndex: 999, width:"100%"}} />
            </div>
            {/*<div className={classes.infoOuterWrapper}>
                <div className={classes.infoInnerWrapper}>
                    {infos.get().map(info => {
                        return (
                            <div key={info.key}
                                 className={classes.generatedInfoWrapper}>
                                <span>&#8226; {user.userData.currentItem.videoMainTitle.get()} &#8226; {user.userData.currentCourse.name.get()} &#8226; {timer()} &#8226; {Math.floor(user.userData.currentItem.videoLength.get() * 0.107)} pontot tudsz szerezni &#8226; </span>
                            </div>
                        )
                    })}
                </div>
            </div>*/}
        </div>
    )
};

export default NavigationalDivider
