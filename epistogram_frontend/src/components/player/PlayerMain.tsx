import { useState } from "@hookstate/core";
import React, { useEffect } from 'react';
import { Cookies } from "react-cookie";
import { useParams, withRouter } from "react-router";
import { useHistory } from "react-router-dom";
import menuItems from "../../configuration/menuItems.json";
import { DialogFrame } from "../../HOC/dialog_frame/DialogFrame";
import { LoadingFrame } from "../../HOC/loading_frame/LoadingFrame";
import { MainWrapper } from "../../HOC/mainPanels/MainPanels";
import instance from "../../services/axiosInstance";
import applicationRunningState from "../../store/application/applicationRunningState";
import userDetailsState from "../../store/user/userSideState";
import { Copyright } from "../universal/footers/copyright/Copyright";
import Navbar from "../universal/navigation/navbar/AllNavbar";
import classes from './playerMain.module.scss';
import Descriptions from "./player_components/descriptions/Descriptions";
import GeneratedInfo from "./player_components/GeneratedInfo";
import NavigationalDivider from "./player_components/navigational_divider/NavigationalDivider";
import Player from "./player_components/Player";
import VideoList from "./player_components/video_list/VideoList";

const PlayerMain = (props: { history: any }) => {
    console.log("[PlayerMain] Started...")
    const user = useState(userDetailsState)
    const app = useState(applicationRunningState)
    const cookies = new Cookies();

    const history = useHistory()

    const { courseId, id } = useParams<{ courseId: string, id: string }>();

    const currentWidth = useState(0)

    useEffect(() => {
        if ((id !== user.userData.currentItem._id.get() && user.userData.currentItem._id.get()) ||
            (user.userData.currentCourse._id.get() && user.userData.currentCourse._id.get() !== courseId)) {


            instance.patch(`/users/${cookies.get("userId")}/course/${courseId}/item/${id}`).then((res) => {
                if (res.status === 201) {
                    app.activeVideoListItem.set(res.data.currentItem._id)
                    user.userData.currentCourse.set(res.data.currentCourse)
                    user.userData.currentItem.set(res.data.currentItem)
                }
            }).catch((e) => {
                app.alert.set({
                    alertTitle: "Figyelem! Hibás linket adtál meg!",
                    targetLocation: "",
                    alertDescription: "Az általad megadott linkhez nem tartozik egy videó sem. Kérlek ellenőrizd, hogy nem írtad-e el. A jelenlegi videó folytatásához kattints a folytatás gombra, új kurzus kiválasztásához pedig a kurzus kiválasztása gombra",
                    showFirstButton: true,
                    firstButtonTitle: "Jelenlegi videó folytatása",
                    showSecondButton: true,
                    secondButtonTitle: "Kurzus kiválasztása",
                    showAlert: true
                })
            })
        } else {

        }
        // eslint-disable-next-line
    }, [app.loadingIndicator.get(), user.userData.currentItem._id.get(), user.userData.currentCourse._id.get(), id, courseId])

    useEffect(() => {
        currentWidth.set(window.innerWidth)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Figyeli a jelenlegi ablak szélességet
    useEffect(() => {
        window.addEventListener("resize", updateWidth)
        return () => window.removeEventListener("resize", updateWidth)
    })

    // Frissíti a jelenlegi ablak szélességet
    const updateWidth = () => {
        currentWidth.set(window.innerWidth)
    }

    const redirectToCourseSearch = () => {
        return history.push('/kurzusok');
    }

    const setCurrentVideo = () => {
        app.alert.showAlert.set(false)
        app.activeVideoListItem.set(user.userData.currentItem._id.get())
        history.push(`/watch/${user.userData.currentCourse._id.get()}/${user.userData.currentItem._id.get()}`);
    }

    const loadingState = useState(applicationRunningState).loadingIndicator.get();

    return <LoadingFrame loadingState={loadingState}>
        <DialogFrame firstButtonOnClick={setCurrentVideo} secondButtonOnClick={redirectToCourseSearch}>
            <MainWrapper>
                <Navbar showHighlightedButton={true}
                    menuItems={menuItems["user"]}
                    showLastButton={false}
                    showNavigation={true} />
                <div className={classes.playerAndVideoListWrapper}>
                    <div className={classes.playerContentWrapper} >
                        <Player id={id} />
                        <GeneratedInfo />
                        {currentWidth.get() <= 993 ? <VideoList /> : null}
                        <NavigationalDivider />
                        <Descriptions />
                        <Copyright />
                    </div>
                    {currentWidth.get() >= 993 ? <VideoList /> : null}
                </div>
            </MainWrapper>
        </DialogFrame>
    </LoadingFrame>
};

export default withRouter(PlayerMain);
