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

import ResponsiveGridLayout from 'react-grid-layout';

import "../../../../node_modules/react-grid-layout/css/styles.css"
import "../../../../node_modules/react-resizable/css/styles.css"


const UserDashBoard = () => {
    console.warn("[UserDashBoard] Started...")

    const layout = [
        {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
        {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
        {i: 'c', x: 4, y: 0, w: 1, h: 2}
      ];


    return <LoadingFrame nullComponent={<NullComponent />}
                         loadingComponent={<LoadingComponent />}
                         failedComponent={<FailedComponent />}>
        <div className={classes.dashBoardMainContainer}>
            <Navbar showHighlightedButton={true} menuItems={menuItems["user"]} showLastButton={true}/>
            <div className={classes.dashboardContentWrapper}>
                <div className={classes.dashboardLeftColumn}>
                <ResponsiveGridLayout className="layout" layouts={layouts}
        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
        cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
        <div key="1">1</div>
        <div key="2">2</div>
        <div key="3">3</div>
      </ResponsiveGridLayout>
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
