import { Box, Flex } from "@chakra-ui/react";
import { Divider, Typography } from "@material-ui/core";
import React from 'react';
import { useParams, withRouter } from "react-router";
import menuItems from "../../configuration/menuItems.json";
import { getQueryParam, useIsDesktopView, usePaging } from "../../frontendHelpers";
import { LoadingFrame } from "../../HOC/LoadingFrame";
import { MainWrapper } from "../../HOC/MainPanels";
import { CourseItemType } from "../../models/shared_models/types/sharedTypes";
import { useNavigation } from "../../services/navigatior";
import { useDialog } from "../../services/notifications";
import { usePlayerData } from "../../services/playerService";
import { Copyright } from "../universal/footers/copyright/Copyright";
import Navbar from "../universal/navigation/navbar/AllNavbar";
import { SegmentedButton } from "../universal/SegmentedButton";
import { SlidesDisplay } from "../universal/SlidesDisplay";
import classes from './playerMain.module.scss';
import PlayerDescription from "./player_components/descriptions/description_components/PlayerDescription";
import VideoPlayer from "./player_components/VideoPlayer";
import { CourseItemList } from "./player_components/video_list/CourseItemList";

const PlayerPage = () => {

    const { showDialog } = useDialog();
    const { navigate, navigateToPlayer } = useNavigation();
    const { id: courseItemString } = useParams<{ id: string }>();
    const courseItemType = getQueryParam("type") as CourseItemType;
    const courseItemId = parseInt(courseItemString);

    // get player page data
    const { playerData, playerDataStatus, playerDataError } = usePlayerData(courseItemId, courseItemType);
    const courseItems = playerData?.courseItems ?? [];
    const video = playerData?.video;

    const navigateToCourseItem = (courseItemId: number, courseItemType: CourseItemType) => {

        showDialog({
            title: "Biztosan megszakítod a vizsgát?",
            description: "Figyelem! Ha most kilépsz, a jelenlegi vizsgád elveszik és nem kezdhető újra.",
            firstButtonTitle: "Mégse",
            secondButtonTitle: "Igen",
        });

        navigateToPlayer(courseItemId, courseItemType);
    }

    const isDesktopView = useIsDesktopView();
    const descCommentPaging = usePaging<string>(["Leírás", "Hozzászólások"]);
    const VideoDescription = () => <PlayerDescription description={video!.description} />;
    const VideoComments = () => <Box bg="red" />;

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

                        {video &&
                            <>
                                {/* video player with controls */}
                                {video && <VideoPlayer videoItem={video} />}

                                {/* under video info */}
                                <Box>
                                    {/* <GeneratedInfo videoLength={video!.length!} videoTitle={video!.title!} /> */}
                                    {!isDesktopView && <CourseItemList
                                        courseItems={courseItems}
                                        currentCourseItemId={courseItemId}
                                        navigateToCourseItem={navigateToCourseItem} />}

                                    <Flex justify="space-between" padding="20px">
                                        <Typography variant={"h4"}>{video!.title}</Typography>
                                        <SegmentedButton paging={descCommentPaging}></SegmentedButton>
                                    </Flex>
                                    <Divider style={{ width: "100%" }} />
                                    <SlidesDisplay
                                        index={descCommentPaging.currentIndex}
                                        slides={[
                                            VideoDescription,
                                            VideoComments
                                        ]}></SlidesDisplay>
                                    <Copyright />
                                </Box>
                            </>}
                    </Box>

                    {/* right sidebar */}
                    <Box>
                        {isDesktopView && <CourseItemList
                            courseItems={courseItems}
                            currentCourseItemId={courseItemId}
                            navigateToCourseItem={navigateToCourseItem} />}
                    </Box>
                </div>
            </LoadingFrame>
        </MainWrapper >
    )
};

export default withRouter(PlayerPage);
