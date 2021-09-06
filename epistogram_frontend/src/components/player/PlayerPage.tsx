import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from 'react';
import { useParams } from "react-router";
import menuItems from "../../configuration/menuItems.json";
import { getQueryParam, useIsDesktopView } from "../../frontendHelpers";
import { LoadingFrame } from "../../HOC/LoadingFrame";
import { ContentWrapper, MainWrapper } from "../../HOC/MainPanels";
import { CourseItemType } from "../../models/shared_models/types/sharedTypes";
import { useNavigation } from "../../services/navigatior";
import { useDialog } from "../../services/notifications";
import { usePlayerData } from "../../services/playerService";
import { FlexFloat } from "../universal/FlexFloat";
import Navbar from "../universal/navigation/navbar/AllNavbar";
import { CourseItemSelector } from "./CourseItemSelector";
import { ExamPlayer } from "./ExamPlayer";
import classes from './playerMain.module.scss';
import { WatchView } from "./WatchView";

export const PlayerPage = () => {

    const { showDialog } = useDialog();
    const { navigate, navigateToPlayer } = useNavigation();
    const { id: courseItemString } = useParams<{ id: string }>();
    const courseItemType = getQueryParam("type") as CourseItemType;
    const courseItemId = parseInt(courseItemString);
    const [isSidebarHidden, setIsSidebarHidden] = useState(false);

    // get player page data
    const {
        playerData,
        playerDataStatus,
        playerDataError,
        refetchPlayerData
    } = usePlayerData(courseItemId, courseItemType);
    const courseItems = playerData?.courseItems ?? [];
    const video = playerData?.video;
    const exam = playerData?.exam;

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

            <ContentWrapper>

                <LoadingFrame
                    loadingState={[playerDataStatus]}
                    error={[playerDataError]}>

                    {/* main column */}
                    <Box id="mainColumn" height="100%" width="100%">

                        {video && <WatchView
                            video={video}
                            courseItems={courseItems}
                            navigateToCourseItem={navigateToCourseItem} />}

                        {exam && <ExamPlayer
                            setIsExamInProgress={isExamStarted => setIsSidebarHidden(isExamStarted)}
                            exam={exam} />}
                    </Box>

                    {/* right sidebar */}
                    <FlexFloat
                        id="courseItemListSidebar"
                        justify="flex-start"
                        height="100%"
                        bg="white"
                        maxWidth={isSidebarHidden ? "0px" : "350px"}
                        opacity={isSidebarHidden ? 0 : 1}
                        transition="0.5s">

                        {isDesktopView && <CourseItemSelector
                            courseItems={courseItems} />}
                    </FlexFloat>
                </LoadingFrame>
            </ContentWrapper>
        </MainWrapper >
    )
};
