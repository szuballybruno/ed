import React from 'react';
import {State, useState} from "@hookstate/core";
import userDetailsState from "../../../../store/user/userSideState";
import ListItem from "../../../universal/atomic/listItem/ListItem";
import classes from "./playback.module.scss";
import {item} from "../../../../store/types/item";

const Playback = (props: {

}) => {
    const user = useState(userDetailsState)

    const stateOrNull: State<item> | null = user.userData.currentItem.ornull

    return (
        stateOrNull ? <div className={classes.playbackContainer}>
            <ListItem  mainTitle={user.userData.currentItem.title.get()}
                       subTitle={user.userData.currentItem.subTitle.get()}
                       thumbnailUrl={user.userData.currentItem.thumbnailUrl.get()}
                       to={"/watch/"+user.userData.currentCourse._id.get()+"/"+user.userData.currentItem._id.get()}/>
        </div> : <div>Válassz ki videót</div>
    );
};

export default Playback;
