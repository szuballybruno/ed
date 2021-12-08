import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { useIsDesktopView } from "../../frontendHelpers";
import { useNavigation } from "../../services/core/navigatior";
import { usePlayerData } from "../../services/playerService";
import { EpistoDialog, useEpistoDialogLogic } from "../EpistoDialog";
import { LoadingFrame } from "../system/LoadingFrame";
import { ContentWrapper, MainWrapper } from "../system/MainPanels";
import Navbar from "../navbar/Navbar";
import { FlexFloat } from "../universal/FlexFloat";
import { CourseItemSelector } from "./CourseItemSelector";
import { ExamPlayer } from "./ExamPlayer";
import { ModuleView } from "./ModuleView";
import { WatchView } from "./WatchView";

export const PlayerPage = () => {

    const warningDialogLogic = useEpistoDialogLogic();
    const { navigateToPlayer } = useNavigation();
    const { descriptorCode } = useParams<{ descriptorCode: string }>();
    const [isSidebarHidden, setIsSidebarHidden] = useState(false);

    console.log("descriptorCode: " + descriptorCode)

    // get player page data
    const {
        playerData,
        playerDataStatus,
        playerDataError,
        refetchPlayerData
    } = usePlayerData(descriptorCode);

    const video = playerData?.video;
    const exam = playerData?.exam;
    const module = playerData?.module;
    const answerSessionId = playerData?.answerSessionId;
    const courseMode = playerData?.mode ?? "beginner";
    const courseId = playerData?.courseId;
    const courseModules = playerData?.modules ?? [];
    const nextItemCode = playerData?.nextItemCode;

    console.log("nextItemCode: " + nextItemCode)

    // redirect if current item should be locked 
    useEffect(() => {

        if (!playerData?.courseItemCode)
            return;

        if (playerData.courseItemCode === descriptorCode)
            return;

        console.log("Invalid course item code: " + descriptorCode);
        navigateToPlayer(playerData.courseItemCode);
    }, [playerData?.courseItemCode]);

    const navigateToCourseItem = (descriptorCode: string) => {

        warningDialogLogic
            .openDialog({
                title: "Biztosan megszakítod a vizsgát?",
                description: "Figyelem! Ha most kilépsz, a jelenlegi vizsgád elveszik és nem kezdhető újra.",
                buttons: [
                    {
                        title: "Igen",
                        action: () => navigateToPlayer(descriptorCode)
                    }
                ],
            });
    }

    const isDesktopView = useIsDesktopView();

    const handleContinueCourse = () => {

        console.log("Continue course, next item code: " + nextItemCode);

        if (nextItemCode)
            navigateToPlayer(nextItemCode);
    }

    return (
        <MainWrapper
            style={{
                "--playerWidth": "min(min(100vw, 180vh), 1700px)"
            } as any}>

            <Navbar />

            <EpistoDialog logic={warningDialogLogic} />

            <ContentWrapper width="var(--playerWidth)" margin="auto">

                <LoadingFrame
                    loadingState={[]}
                    className="whall"
                    error={[playerDataError]}>

                    {/* main column */}
                    <Box id="mainColumn" className="whall" overflowY="scroll" >

                        {video && <WatchView
                            courseId={courseId!}
                            courseMode={courseMode}
                            refetchPlayerData={refetchPlayerData}
                            answerSessionId={answerSessionId!}
                            video={video}
                            modules={courseModules}
                            continueCourse={handleContinueCourse}
                            navigateToCourseItem={navigateToCourseItem} />}

                        {exam && <ExamPlayer
                            continueCourse={handleContinueCourse}
                            answerSessionId={answerSessionId!}
                            setIsExamInProgress={isExamStarted => setIsSidebarHidden(isExamStarted)}
                            exam={exam} />}

                        <ModuleView module={module} startModule={handleContinueCourse} />
                    </Box>

                    {/* right sidebar */}
                    <FlexFloat
                        id="courseItemListSidebar"
                        justify="flex-start"
                        bg="white"
                        maxWidth={isSidebarHidden ? "0px" : "420px"}
                        opacity={isSidebarHidden ? 0 : 1}
                        boxShadow="none"
                        transition="0.5s">

                        {isDesktopView && <Flex
                            direction="column"
                            id="courseItemSelectorRoot"
                            width="420px"
                            minWidth="420px">
                            <CourseItemSelector
                                courseId={courseId!}
                                mode={courseMode}
                                modules={courseModules}
                                refetchPlayerData={refetchPlayerData} />
                        </Flex>}
                    </FlexFloat>
                </LoadingFrame>
            </ContentWrapper>
        </MainWrapper >
    )
};
