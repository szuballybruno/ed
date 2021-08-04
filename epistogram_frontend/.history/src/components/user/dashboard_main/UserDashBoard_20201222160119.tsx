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




const UserDashBoard = () => {
    console.warn("[UserDashBoard] Started...")


    return <LoadingFrame nullComponent={<NullComponent />}
                         loadingComponent={<LoadingComponent />}
                         failedComponent={<FailedComponent />}>
        <div className={classes.dashBoardMainContainer}>
            <Navbar showHighlightedButton={true} menuItems={menuItems["user"]} showLastButton={true}/>
            <div className={classes.dashboardContentWrapper}>
            <div className={classes.dashboardRightColumn}>
                    <ProfileStats />
                    <Playback />
                    <ProfileCourseStats />
                </div>
                <div className={classes.dashboardLeftColumn}>
                    <Articles />
                    <Votes />
                    <RecommendedCourses />
                </div>
                
            </div>        
        </div>
    </LoadingFrame>

};

export default UserDashBoard;
