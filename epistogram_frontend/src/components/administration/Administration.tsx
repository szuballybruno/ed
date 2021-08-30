import React from 'react';
import classes from './users/userList/administration.module.scss'
import userDetailsState from "../../store/user/userSideState";
import { useState } from "@hookstate/core";
import { withRouter } from "react-router-dom";
import { globalConfig } from "../../configuration/config";
import AdminDashboardMenuItem from "./universal/adminDashboardMenuItem/AdminDashboardMenuItem";
import ProfileImage from "../universal/atomic/profileImage/ProfileImage";
import {
    Chip,
    Divider,
    Typography
} from "@material-ui/core";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from "../../HOC/mainPanels/MainPanels";
import menuItems from "../../configuration/menuItems.json";
import Navbar from "../universal/navigation/navbar/AllNavbar";
import { AdminAddHeader } from "./universal/adminAddHeader/AdminAddHeader";
import {SaveBar} from "./universal/saveBar/SaveBar";
import {AdministrationRouting} from "./routing/AdministrationRouting";

const Administration = (props: { match: { url: string; } }) => {

    const user = useState(userDetailsState)

    return <MainWrapper>
        <Navbar showHighlightedButton={true}
                menuItems={menuItems["user"]}
                showLastButton={true}
                showNavigation={true} />
        <ContentWrapper>
            <LeftPanel>
                <div className={classes.adminDashboardLeftItemProfile}>
                    <div className={classes.leftItemProfileTopWrapper} />
                    <div className={classes.leftItemProfileBottomWrapper}>
                        <div className={classes.profileImageWrapper}>
                            <ProfileImage />
                        </div>
                        <div className={classes.profileNameWrapper}>
                            <Typography variant={"h5"}>{user.userData.lastName.get() + " " + user.userData.firstName.get()}</Typography>
                        </div>
                        <div className={classes.profileRoleWrapper}>
                            <Chip label={user.userData.role.get()} />
                        </div>
                        <Divider style={{ zIndex: 999, marginTop: 20 }} />
                    </div>

                </div>
                <div className={classes.adminDashboardLeftItemMenuItems}>
                    {globalConfig.adminMenuItems.map((item, index) => {
                        return <AdminDashboardMenuItem title={item.title}
                            index={index}
                            key={index}
                            url={props.match.url + item.path} />
                    })}
                </div>
            </LeftPanel>
            <RightPanel>
                <AdminAddHeader />
                <AdministrationRouting />
                <SaveBar open={true} />
            </RightPanel>
        </ContentWrapper>
    </MainWrapper>
};

export default withRouter(Administration);
