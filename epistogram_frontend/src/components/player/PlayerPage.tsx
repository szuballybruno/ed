import { Box } from "@chakra-ui/react";
import React from 'react';
import { useParams, withRouter } from "react-router";
import menuItems from "../../configuration/menuItems.json";
import { getQueryParam, useIsDesktopView } from "../../frontendHelpers";
import { LoadingFrame } from "../../HOC/LoadingFrame";
import { MainWrapper } from "../../HOC/MainPanels";
import { CourseItemType } from "../../models/shared_models/types/sharedTypes";
import { useNavigation } from "../../services/navigatior";
import { useDialog } from "../../services/notifications";
import { usePlayerData } from "../../services/playerService";
import Navbar from "../universal/navigation/navbar/AllNavbar";
import { CourseItemList } from "./courseItemList/CourseItemList";
import classes from './playerMain.module.scss';
import { WatchView } from "./WatchView";

const PlayerPage = () => {

    const { showDialog } = useDialog();
    const { navigate, navigateToPlayer } = useNavigation();
    const { id: courseItemString } = useParams<{ id: string }>();
    const courseItemType = getQueryParam("type") as CourseItemType;
    const courseItemId = parseInt(courseItemString);
    const exam = courseItemType == "exam" ? {} : null;

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

                        {video && <WatchView
                            video={video}
                            courseItems={courseItems}
                            navigateToCourseItem={navigateToCourseItem} />}

                        {exam && <Box>Exam</Box>}
                    </Box>

                    {/* right sidebar */}
                    <Box>
                        {isDesktopView && <CourseItemList
                            courseItems={courseItems}
                            navigateToCourseItem={navigateToCourseItem} />}
                    </Box>
                </div>
            </LoadingFrame>
        </MainWrapper >
    )
};

export default withRouter(PlayerPage);
