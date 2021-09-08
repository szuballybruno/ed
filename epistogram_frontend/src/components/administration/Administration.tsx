import { Chip, Divider, Typography } from "@material-ui/core";
import React, {useContext} from 'react';
import { withRouter } from "react-router-dom";
import { globalConfig } from "../../configuration/config";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from "../../HOC/MainPanels";
import { AdministrationRouting } from "../../routing/AdministrationRouting";
import ProfileImage from "../universal/atomic/profileImage/ProfileImage";
import Navbar from "../universal/navigation/navbar/Navbar";
import { AdminAddHeader } from "./universal/adminAddHeader/AdminAddHeader";
import AdminDashboardMenuItem from "./universal/adminDashboardMenuItem/AdminDashboardMenuItem";
import classes from './users/userList/administration.module.scss';
import {CurrentUserContext} from "../../HOC/AuthenticationFrame";

const Administration = (props: { match: { url: string; } }) => {

    // const user = useState(userDetailsState)

    const user = useContext(CurrentUserContext);

    return <MainWrapper>
        <Navbar />
        <ContentWrapper>
            <LeftPanel>
                <div className={classes.adminDashboardLeftItemProfile}>
                    <div className={classes.leftItemProfileTopWrapper} />
                    <div className={classes.leftItemProfileBottomWrapper}>
                        <div className={classes.profileImageWrapper}>
                            <ProfileImage imageUrl={user?.avatarUrl ? user?.avatarUrl : ""} />
                        </div>
                        <div className={classes.profileNameWrapper}>
                            <Typography variant={"h5"}>{user?.name}</Typography>
                        </div>
                        <div className={classes.profileRoleWrapper}>
                            <Chip label={user?.role} />
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
            </RightPanel>
        </ContentWrapper>
    </MainWrapper>
};

export default withRouter(Administration);
