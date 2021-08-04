import React, {useEffect} from 'react';

import classes from './playerMain.module.scss';

import Navbar from "../../universal/navbar/AllNavbar";

import Player from "./player_components/Player";
import VideoList from "./player_components/video_list/VideoList";

import NavigationalDivider from "./player_components/navigational_divider/NavigationalDivider";
import GeneratedInfo from "./player_components/GeneratedInfo";

import Descriptions from "./player_components/descriptions/Descriptions";

import Copyright from "../../universal/copyright/Copyright";

import menuItems from "../../../configuration/menuItems.json"
import {LoadingFrame} from "../../../HOCs/LoadingFrame";
import LoadingComponent from "../../universal/loadingComponents/LoadingComponent";
import FailedComponent from "../../universal/loadingComponents/FailedComponent";
import NullComponent from "../../universal/loadingComponents/NullComponent";
import {useParams} from "react-router";
import userSideState from "../../../globalStates/userSideState";
import applicationRunningState from "../../../globalStates/applicationRunningState";
import {useState} from "@hookstate/core";



const PlayerMain = () => {
    const params = useParams()
    const user = useState(userSideState);
    const app = useState(applicationRunningState)




    return <LoadingFrame loadingComponent={<LoadingComponent />}
                         failedComponent={<FailedComponent />}
                         nullComponent={<NullComponent />}>
        <div className={classes.playerMain}>
            <Navbar showHighlightedButton={true} menuItems={menuItems["user"]} showLastButton={true} />
            <div className={classes.playerAndVideoListWrapper}>
                <Player videoId={params.videoid} />
                <GeneratedInfo />
                <VideoList />
            </div>
            <NavigationalDivider />
            <Descriptions />
            <Copyright />
        </div>
    </LoadingFrame>
};

export default PlayerMain;