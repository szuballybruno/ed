import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { useIsDesktopView } from "../../frontendHelpers";
import { useNavigation } from "../../services/navigatior";
import { useDialog } from "../../services/notifications";
import { usePlayerData } from "../../services/playerService";
import { LoadingFrame } from "../HOC/LoadingFrame";
import { ContentWrapper, MainWrapper } from "../HOC/MainPanels";
import { FlexFloat } from "../universal/FlexFloat";
import Navbar from "../universal/navigation/navbar/Navbar";
import { CourseItemSelector } from "./CourseItemSelector";
import { ExamPlayer } from "./ExamPlayer";
import { WatchView } from "./WatchView";

export const PlayerPage = () => {

    const { showDialog } = useDialog();
    const { navigate, navigateToPlayer } = useNavigation();
    const { descriptorCode } = useParams<{ descriptorCode: string }>();
    const [isSidebarHidden, setIsSidebarHidden] = useState(false);

    // get player page data
    const {
        playerData,
        playerDataStatus,
        playerDataError,
        refetchPlayerData
    } = usePlayerData(descriptorCode);
    const video = playerData?.video;
    const exam = playerData?.exam;
    const answerSessionId = playerData?.answerSessionId;
    const courseMode = playerData?.mode ?? "beginner";
    const courseId = playerData?.courseId;
    const courseItems = playerData?.courseItems ?? [];

    // redirect if current item should be locked 
    useEffect(() => {

        if (!playerData?.courseItemCode)
            return;

        if (playerData.courseItemCode === descriptorCode)
            return;

        navigateToPlayer(playerData.courseItemCode);

    }, [playerData?.courseItemCode]);

    const navigateToCourseItem = (descriptorCode: string) => {

        showDialog({
            title: "Biztosan megszakítod a vizsgát?",
            description: "Figyelem! Ha most kilépsz, a jelenlegi vizsgád elveszik és nem kezdhető újra.",
            firstButtonTitle: "Mégse",
            secondButtonTitle: "Igen",
        });

        navigateToPlayer(descriptorCode);
    }

    const isDesktopView = useIsDesktopView();

    return (
        <MainWrapper>

            <Navbar />

            <ContentWrapper>

                <LoadingFrame
                    loadingState={[playerDataStatus]}
                    error={[playerDataError]}>

                    {/* main column */}
                    <Box id="mainColumn" overflowY="scroll" height="100%" width="100%">

                        {video && <WatchView
                            courseId={courseId!}
                            courseMode={courseMode}
                            refetchPlayerData={refetchPlayerData}
                            answerSessionId={answerSessionId!}
                            video={video}
                            courseItems={courseItems}
                            refetchCourseItemList={refetchPlayerData}
                            navigateToCourseItem={navigateToCourseItem} />}

                        {exam && <ExamPlayer
                            answerSessionId={answerSessionId!}
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

                        {isDesktopView && <Box
                            id="courseItemSelectorRoot"
                            width="350px"
                            minWidth="350px">
                            <CourseItemSelector
                                courseId={courseId!}
                                mode={courseMode}
                                courseItems={courseItems}
                                refetchPlayerData={refetchPlayerData} />
                        </Box>}
                    </FlexFloat>
                </LoadingFrame>
            </ContentWrapper>
        </MainWrapper >
    )
};
