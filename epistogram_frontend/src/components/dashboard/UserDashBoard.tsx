//BASIC
import React from 'react';
import classes from './userDashBoard.module.scss'

//CONFIG
import menuItems from "../../configuration/menuItems.json";

//COMPONENTS
import Navbar from "../universal/navigation/navbar/AllNavbar";
import ProfileStats from "./dashboard_components/ProfileStats/ProfileStats";
import Votes from "./dashboard_components/Votes/Votes";
import RecommendedCourses from "./dashboard_components/RecommendedCourses/RecommendedCourses";
import { LoadingFrame } from "../../HOC/loading_frame/LoadingFrame";
import { FailedComponent, LoadingComponent, NullComponent } from "../../HOC/loading_frame/loadingComponents/LoadingComponent";
import { DashBoardLeftBorder, DashBoardLeftSpacer, DashBoardRightSpacer } from "./dashboard_components/DashBoardSpacers";
import CurrentCourseStats from "./dashboard_components/CurrentCourseStats/CurrentCourse";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from "../../HOC/mainPanels/MainPanels";
import { State, useState } from "@hookstate/core";
import userSideState from "../../store/user/userSideState";
import { item } from "../../store/types/item";
import ListItem from "../universal/atomic/listItem/ListItem";
import { Divider, Grid } from "@material-ui/core";
import { Assistant } from "./dashboard_components/Assistant/Assistant";
import AdminDashboardHeader from "../administration/universal/adminDashboardHeader/AdminDashboardHeader";
import applicationRunningState from '../../store/application/applicationRunningState';


const UserDashBoard = () => {
    const user = useState(userSideState)
    const isThereCurrentCourse: State<item[]> | null = user.userData.currentCourse.items.ornull
    const loadingState = useState(applicationRunningState).loadingIndicator.get();

    return <LoadingFrame loadingState={loadingState}>
        <MainWrapper>
            <Navbar showHighlightedButton={true}
                menuItems={menuItems["user"]}
                showLastButton={true}
                showNavigation={true} />
            <ContentWrapper>
                <LeftPanel>
                    <Grid>
                        <ProfileStats />
                        <DashBoardLeftBorder />
                        {user.userData.currentItem._id.get() ? <DashBoardLeftSpacer title={"Folytatom"} /> : <DashBoardLeftSpacer title={"Új tanfolyam kiválasztása"} />}
                        {user.userData.currentItem._id.get() ? <ListItem mainTitle={user.userData.currentItem.title.get()}
                            subTitle={user.userData.currentItem.subTitle.get()}
                            thumbnailUrl={user.userData.currentItem.thumbnailUrl.get()}
                            to={"/watch/" + user.userData.currentCourse._id.get() + "/" + user.userData.currentItem._id.get()} /> : <ListItem mainTitle={"Tanfolyamkereső"}
                                subTitle={"Válaszd ki a legszimpatikusabb tanfolyamot"}
                                thumbnailUrl={user.userData.currentItem.thumbnailUrl.get()}
                                to={"/kurzusok"} />}

                        {isThereCurrentCourse ? <DashBoardLeftSpacer title={"Jelenlegi kurzus"} /> : null}
                        {isThereCurrentCourse ? <CurrentCourseStats /> : null}
                    </Grid>

                </LeftPanel>
                <RightPanel>
                    <AdminDashboardHeader titleText={"Személyes tanulási asszisztens"} />
                    <Divider className={classes.divider} />
                    <Assistant />
                    <AdminDashboardHeader titleText={"Szavazás"} />
                    <Divider className={classes.divider} style={{ marginBottom: 40 }} />
                    <Votes />
                    {user.userData.recommendedCourses.get() === [] ? <DashBoardRightSpacer title={"Kurzusajánló"} /> : null}
                    {user.userData.recommendedCourses.get() === [] ? <RecommendedCourses /> : null}
                    <DashBoardRightSpacer title={""} />
                </RightPanel>
            </ContentWrapper>
        </MainWrapper>
    </LoadingFrame>
};

export default UserDashBoard;
