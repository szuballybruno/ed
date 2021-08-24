import { Box, Flex } from "@chakra-ui/react";
import { useState } from "@hookstate/core";
import React, { useEffect } from 'react';
import { useParams, withRouter } from "react-router";
import menuItems from "../../configuration/menuItems.json";
import { DialogFrame } from "../../HOC/dialog_frame/DialogFrame";
import { LoadingFrame } from "../../HOC/loading_frame/LoadingFrame";
import { MainWrapper } from "../../HOC/mainPanels/MainPanels";
import { useNavigation } from "../../services/navigatior";
import { useAlert } from "../../services/notifications";
import { useCurrentVideoDTO, useSetCurrentVideo } from "../../services/playerService";
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

const PlayerPage = (props: { history: any }) => {

    const user = useState(userDetailsState)
    const app = useState(applicationRunningState)
    const alert = useAlert();
    const { navigate } = useNavigation();
    const { courseId, id: videoId } = useParams<{ courseId: string, id: string }>();
    const [currentWidth, setCurrentWidth] = React.useState(0);

    // set current video id 
    const { error: setCurrentVideoError, status: setCurrentVideoStatus } = useSetCurrentVideo(courseId, videoId);

    // get current video 
    const { video, error: getCurrentVideoError, status: getCurrentVideoStatus } = useCurrentVideoDTO(courseId, videoId);

    // set initial window width
    useEffect(() => {

        updateWidth();
    }, [])

    // react to window resize
    useEffect(() => {

        window.addEventListener("resize", updateWidth)
        return () => window.removeEventListener("resize", updateWidth)
    })

    const updateWidth = () => {
        setCurrentWidth(window.innerWidth)
    }

    const redirectToCourseSearch = () => {
        navigate('/kurzusok');
    }

    const setCurrentVideo = () => {

        alert.showAlert.set(false)
        app.activeVideoListItem.set(videoId)

        navigate(`/watch/${user.userData.currentCourse._id.get()}/${videoId}`);
    }

    return (
        <Flex width="100%" minHeight="100vh" align="stretch" justify="stretch">
            <DialogFrame firstButtonOnClick={setCurrentVideo} secondButtonOnClick={redirectToCourseSearch}>
                <MainWrapper>

                    <Navbar showHighlightedButton={true}
                        menuItems={menuItems["user"]}
                        showLastButton={false}
                        showNavigation={true} />

                    <LoadingFrame
                        minHeight="100%"
                        loadingState={[getCurrentVideoStatus, setCurrentVideoStatus]}
                        error={[getCurrentVideoError, setCurrentVideoError]}>
                        <div className={classes.playerAndVideoListWrapper}>
                            <div className={classes.playerContentWrapper} >

                                <Player videoItem={video!} />

                                <Box>
                                    <GeneratedInfo />
                                    {currentWidth <= 993 ? <VideoList /> : null}
                                    <NavigationalDivider />
                                    <Descriptions />
                                    <Copyright />
                                </Box>
                            </div>
                            {currentWidth >= 993 ? <VideoList /> : null}
                        </div>
                    </LoadingFrame>
                </MainWrapper>
            </DialogFrame>
        </Flex>
    )
};

export default withRouter(PlayerPage);
