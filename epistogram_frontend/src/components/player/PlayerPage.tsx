import { Box, Flex } from "@chakra-ui/react";
import React from 'react';
import { useParams, withRouter } from "react-router";
import menuItems from "../../configuration/menuItems.json";
import { getQueryParam, useIsDesktopView } from "../../frontendHelpers";
import { LoadingFrame } from "../../HOC/loading_frame/LoadingFrame";
import { MainWrapper } from "../../HOC/mainPanels/MainPanels";
import { CourseItemType } from "../../models/shared_models/types/sharedTypes";
import { useNavigation } from "../../services/navigatior";
import { useAlert } from "../../services/notifications";
import { usePlayerData } from "../../services/playerService";
import { Copyright } from "../universal/footers/copyright/Copyright";
import Navbar from "../universal/navigation/navbar/AllNavbar";
import classes from './playerMain.module.scss';
import Descriptions from "./player_components/descriptions/Descriptions";
import GeneratedInfo from "./player_components/GeneratedInfo";
import NavigationalDivider from "./player_components/navigational_divider/NavigationalDivider";
import VideoPlayer from "./player_components/VideoPlayer";
import { CourseItemList } from "./player_components/video_list/CourseItemList";

const PlayerPage = () => {

    const alert = useAlert();
    const { navigate, navigateToPlayer } = useNavigation();
    const { id: courseItemString } = useParams<{ id: string }>();
    const courseItemType = getQueryParam("type") as CourseItemType;
    const courseItemId = parseInt(courseItemString);

    // get player page data
    const { playerData, playerDataStatus, playerDataError } = usePlayerData(courseItemId, courseItemType);
    const courseItems = playerData?.courseItems ?? [];
    const video = playerData?.video;

    const navigateToCourseItem = (courseItemId: number, courseItemType: CourseItemType) => {

        alert.set({
            alertTitle: "Biztosan megszakítod a vizsgát?",
            targetLocation: "",
            alertDescription: "Figyelem! Ha most kilépsz, a jelenlegi vizsgád elveszik és nem kezdhető újra.",
            showFirstButton: true,
            firstButtonTitle: "Mégse",
            showSecondButton: true,
            secondButtonTitle: "Igen",
            showAlert: true
        });

        navigateToPlayer(courseItemId, courseItemType);
    }

    const isDesktopView = useIsDesktopView();
    console.log("asd" + isDesktopView);

    const renderCourseItems = () => <CourseItemList
        courseItems={courseItems}
        currentCourseItemId={courseItemId}
        navigateToCourseItem={navigateToCourseItem} />

    return (
        <MainWrapper>

            <Navbar showHighlightedButton={true}
                menuItems={menuItems["user"]}
                showLastButton={false}
                showNavigation={true} />

            <LoadingFrame
                minHeight="100%"
                loadingState={[playerDataStatus]}
                error={[playerDataError]}>
                <div className={classes.playerAndVideoListWrapper}>

                    {/* main column */}
                    <Box id="mainColumn" className={classes.playerContentWrapper} >

                        {/* video player with controls */}
                        {video && <VideoPlayer videoItem={video!} />}

                        {/* under video info */}
                        <Box>
                            <GeneratedInfo />
                            {!isDesktopView && renderCourseItems()}
                            <NavigationalDivider />
                            <Descriptions />
                            <Copyright />
                        </Box>
                    </Box>

                    {/* right sidebar */}
                    <Box>
                        {isDesktopView && renderCourseItems()}
                    </Box>
                </div>
            </LoadingFrame>
        </MainWrapper>
    )
};

export default withRouter(PlayerPage);
