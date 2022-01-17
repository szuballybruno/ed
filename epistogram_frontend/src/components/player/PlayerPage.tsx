import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { usePlayerData } from "../../services/api/playerApiService";
import { useNavigation } from "../../services/core/navigatior";
import { useIsDesktopView } from "../../static/frontendHelpers";
import { EpistoDialog, useEpistoDialogLogic } from "../EpistoDialog";
import Navbar from "../navbar/Navbar";
import { LoadingFrame } from "../system/LoadingFrame";
import { PageRootContainer, ContentPane } from "../system/MainPanels";
import { Copyright } from "../universal/Copyright";
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
        <PageRootContainer
            style={{
                "--playerWidth": "min(min(100vw, 180vh), 1700px)",
                background: "var(--gradientBlueBackground)"
            } as any}>

            <EpistoDialog logic={warningDialogLogic} />

            <ContentPane
                width="var(--playerWidth)"
                margin="auto"
                showLogo>

                <LoadingFrame
                    loadingState={[]}
                    className="whall"
                    direction="column"
                    error={[playerDataError]}>

                    <Flex px="20px" mb="50px">

                        {/* main column */}
                        <Box id="mainColumn" className="whall" >

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
                            zIndex="10"
                            ml="10px"
                            bg="var(--transparentWhite70)"
                            maxWidth={isSidebarHidden ? "0px" : "420px"}
                            opacity={isSidebarHidden ? 0 : 1}
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
                    </Flex>

                    <Copyright />

                </LoadingFrame>
            </ContentPane>
        </PageRootContainer >
    )
};
