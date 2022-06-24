import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { usePlayerData } from '../../../services/api/playerApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { setPageTitle, useIsDesktopView } from '../../../static/frontendHelpers';
import { useStringParam } from '../../../static/locationHelpers';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoFont } from '../../controls/EpistoFont';
import { FlexFloat } from '../../controls/FlexFloat';
import { EpistoDialog } from '../../universal/epistoDialog/EpistoDialog';
import { LoadingFrame } from '../../system/LoadingFrame';
import { Copyright } from '../../universal/Copyright';
import { CourseItemSelector } from './CourseItemSelector';
import { ExamPlayer } from './ExamPlayer';
import { ModuleView } from './ModuleView';
import { WatchView } from './WatchView';
import { useEpistoDialogLogic } from '../../universal/epistoDialog/EpistoDialogLogic';
import { PlayerDataDTO } from '../../../shared/dtos/PlayerDataDTO';

export const WatchSubpage = () => {

    const warningDialogLogic = useEpistoDialogLogic('warn3');
    const { navigateToPlayer } = useNavigation();
    const urlPlaylistItemCode = useStringParam('descriptorCode')!;
    const [isSidebarHidden, setIsSidebarHidden] = useState(false);

    // get player page data
    const {
        playerData,
        playerDataStatus,
        playerDataError,
        refetchPlayerData
    } = usePlayerData(urlPlaylistItemCode);

    const playerDataWithDefaults = useMemo(() => (playerData ?? ({
        courseMode: 'beginner',
        currentPlaylistItemCode: '',
        nextPlaylistItemState: null,
        modules: [] as any
    } as PlayerDataDTO)), [playerData]);

    const {
        examPlayerData,
        videoPlayerData,
        modulePlayerData,
        answerSessionId,
        courseMode,
        courseId,
        modules,
        nextPlaylistItemCode,
        currentPlaylistItemCode,
        nextPlaylistItemState
    } = playerDataWithDefaults;

    const title = videoPlayerData?.title || examPlayerData?.title || modulePlayerData?.name;
    const isPlayerLoaded = playerDataStatus === 'success';
    const isDeleted = playerDataError?.code === 'deleted';

    // redirect if current item should be locked 
    useEffect(() => {

        if (currentPlaylistItemCode)
            return;

        if (currentPlaylistItemCode === urlPlaylistItemCode)
            return;

        console.log('Invalid course item code: ' + urlPlaylistItemCode);
        navigateToPlayer(currentPlaylistItemCode);
    }, [currentPlaylistItemCode]);

    useEffect(() => {

        if (title)
            setPageTitle(title);
    }, [title]);

    const navigateToCourseItem = (descriptorCode: string) => {

        warningDialogLogic
            .openDialog({
                title: translatableTexts.player.doYouReallyStopExam,
                description: translatableTexts.player.stopExamWarning,
                buttons: [
                    {
                        title: translatableTexts.player.yes,
                        action: () => navigateToPlayer(descriptorCode)
                    }
                ],
            });
    };

    const isDesktopView = useIsDesktopView();

    const handleContinueCourse = () => {

        console.log('Continue course, next item code: ' + nextPlaylistItemCode);

        if (nextPlaylistItemCode)
            navigateToPlayer(nextPlaylistItemCode);
    };

    return (
        isDeleted
            ? <>
                <Flex
                    className='whall'
                    align='center'
                    justify='center'>

                    <Flex
                        background='white'
                        padding='100px'
                        borderRadius='15px'>

                        <EpistoFont>
                            Course has been deleted!
                        </EpistoFont>
                    </Flex>
                </Flex>
            </>
            : <>
                <EpistoDialog logic={warningDialogLogic} />

                <LoadingFrame
                    loadingState={[]}
                    height='100vh'
                    direction="column"
                    error={[playerDataError]}>

                    <Flex
                        px="20px"
                        height='100vh'
                        mb="50px">

                        {/* main column */}
                        <Box
                            id="mainColumn"
                            overflowY='scroll'
                            className="whall" >

                            {/* VIDEO  */}
                            {videoPlayerData && <WatchView
                                isPlayerLoaded={isPlayerLoaded}
                                currentItemCode={currentPlaylistItemCode}
                                nextItemState={nextPlaylistItemState}
                                courseId={courseId!}
                                courseMode={courseMode}
                                refetchPlayerData={refetchPlayerData}
                                answerSessionId={answerSessionId!}
                                videoPlayerData={videoPlayerData}
                                modules={modules}
                                continueCourse={handleContinueCourse}
                                navigateToCourseItem={navigateToCourseItem} />}

                            {/* EXAM */}
                            {examPlayerData && <ExamPlayer
                                continueCourse={handleContinueCourse}
                                answerSessionId={answerSessionId!}
                                setIsExamInProgress={isExamStarted => setIsSidebarHidden(isExamStarted)}
                                courseId={courseId!}
                                exam={examPlayerData} />}

                            {/* MODULE */}
                            {modulePlayerData && <ModuleView module={modulePlayerData}
                                startModule={handleContinueCourse} />}
                        </Box>

                        {/* right sidebar */}
                        <FlexFloat
                            id="courseItemListSidebar"
                            justify="flex-start"
                            zIndex="10"
                            ml="10px"
                            bg="var(--transparentWhite70)"
                            maxWidth={isSidebarHidden ? '0px' : '420px'}
                            opacity={isSidebarHidden ? 0 : 1}
                            transition="0.5s">

                            {isDesktopView && <Flex
                                direction="column"
                                id="courseItemSelectorRoot"
                                overflowY='scroll'
                                pb="200px"
                                width="420px"
                                minWidth="420px">

                                <CourseItemSelector
                                    currentItemCode={currentPlaylistItemCode}
                                    nextItemState={nextPlaylistItemState}
                                    courseId={courseId!}
                                    mode={courseMode}
                                    modules={modules}
                                    isPlayerLoaded={isPlayerLoaded}
                                    refetchPlayerData={refetchPlayerData} />
                            </Flex>}
                        </FlexFloat>
                    </Flex>

                    <Copyright />

                </LoadingFrame>
            </>
    );
};