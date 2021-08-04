//BASIC
import React from 'react';

//STYLE
import classes from "./userDashBoard.module.scss";

//CONFIG
import menuItems from "../../../configuration/menuItems.json";

//COMPONENTS
import Navbar from "../../universal/navbar/AllNavbar";
import ProfileStats from "./dashboard_components/ProfileStats/ProfileStats";
import Playback from "./dashboard_components/Playback/Playback";
import ProfileCourseStats from "./dashboard_components/ProfileCourseStats/ProfileCourseStats";
import Articles from "./dashboard_components/Articles/Articles";
import Votes from "./dashboard_components/Votes/Votes";
import RecommendedCourses from "./dashboard_components/RecommendedCourses/RecommendedCourses";


//STATE MANAGEMENT
import {LoadingFrame} from "../../../HOCs/LoadingFrame";
import LoadingComponent from "../../universal/loadingComponents/LoadingComponent";
import NullComponent from "../../universal/loadingComponents/NullComponent";
import FailedComponent from "../../universal/loadingComponents/FailedComponent";

import { GridStack, GridStackItem } from 'react-gridstack'


const UserDashBoard = () => {
    console.warn("[UserDashBoard] Started...")


    return <LoadingFrame nullComponent={<NullComponent />}
                         loadingComponent={<LoadingComponent />}
                         failedComponent={<FailedComponent />}>
        <div className={classes.dashBoardMainContainer}>
            <Navbar showHighlightedButton={true} menuItems={menuItems["user"]} showLastButton={true}/>
            <div className={classes.dashboardContentWrapper}>
                <div className={classes.dashboardLeftColumn}>
                <GridStack cellHeight={50} verticalMargin={10}>
                    <GridStackItem id="item_1" x={0} y={0} minHeight={2} minWidth={2}>
                        First Item
                    </GridStackItem>
                    <GridStackItem id="item_2" x={0} y={2}>
                        Second Item
                    </GridStackItem>
                </GridStack>
                    {/*<Articles />
                    <Votes />
                    <RecommendedCourses />*/}
                </div>
                <div className={classes.dashboardRightColumn}>
                    <ProfileStats />
                    <Playback />
                    <ProfileCourseStats />
                </div>
            </div>        
        </div>
    </LoadingFrame>

};

export default UserDashBoard;
