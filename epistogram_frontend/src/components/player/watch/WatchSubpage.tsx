import {Box, Flex} from '@chakra-ui/react';
import {useEffect, useMemo, useState} from 'react';
import {PlayerApiService} from '../../../services/api/PPlayerApiService';
import {useNavigation} from '../../../services/core/navigatior';
import {setPageTitle, useIsDesktopView} from '../../../static/frontendHelpers';
import {useStringParam} from '../../../static/locationHelpers';
import {translatableTexts} from '../../../static/translatableTexts';
import {EpistoFont} from '../../controls/EpistoFont';
import {EpistoDialog} from '../../universal/epistoDialog/EpistoDialog';
import {LoadingFrame} from '../../system/LoadingFrame';
import {Copyright} from '../../universal/Copyright';
import {CourseItemSelector} from './CourseItemSelector';
import {ExamPlayer} from './ExamPlayer';
import {ModuleView} from './ModuleView';
import {WatchView} from './WatchView';
import {useEpistoDialogLogic} from '../../universal/epistoDialog/EpistoDialogLogic';
import {PlayerDataDTO} from '../../../shared/dtos/PlayerDataDTO';
import {applicationRoutes} from '../../../configuration/applicationRoutes';
import {Logger} from '../../../static/Logger';
import {useScrollIntoView} from '../../system/AutoScrollContext';

export const WatchSubpage = () => {

    const warningDialogLogic = useEpistoDialogLogic('warn3');
    const { navigate2, navigateToPlayer } = useNavigation();
    const urlPlaylistItemCode = useStringParam('descriptorCode')!;
    const [isSidebarHidden, setIsSidebarHidden] = useState(false);
    const [isScrolledFromTop, setIsScrolledFromTop] = useState(false);
    const {setParent, scroll, parentElement} = useScrollIntoView();

    // get player page data
    const {
        playerData,
        playerDataStatus,
        playerDataError,
        refetchPlayerData
    } = PlayerApiService.usePlayerData(urlPlaylistItemCode);

    const playerDataWithDefaults = useMemo(() => (playerData ?? ({
        courseMode: 'beginner',
        currentPlaylistItemCode: '',
        nextPlaylistItemState: null,
        modules: [] as any,
        canChangeMode: false
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

    const handleIsScrolledFromTop = () => {

        if (!parentElement)
            return;

        const position = parentElement.scrollTop;

        Logger.log('Parentelement' + parentElement.getBoundingClientRect());

        setIsScrolledFromTop(position > 50);
    };

    useEffect(() => {

        if (!parentElement)
            return;

        parentElement.addEventListener('scroll', handleIsScrolledFromTop);
    }, [parentElement]);


    // logs playerDataStatus if change happens
    useEffect(() => {

        Logger.logScoped('PLAYBACK', 'PlayerDataStatus: ' + playerDataStatus);

        // TODO: Create a proper error message: 'Video doesn't exists' with
        //       options to navigate to available courses
        if (playerDataStatus === 'error')
            return navigate2(applicationRoutes.homeRoute);
    }, [playerDataStatus]);

    // redirect if current item should be locked
    useEffect(() => {

        Logger.logScoped('PLAYBACK', 'Redirect effect runs...');
        Logger.logScoped('PLAYBACK', 'CurrentPlaylistItemCode: ' + currentPlaylistItemCode);

        // Prevent navigating to empty url because of loading
        if (playerDataStatus !== 'success')
            return;

        // If playerData contains playlistItemCode return
        if (currentPlaylistItemCode)
            return;

        Logger.logScoped('PLAYBACK', 'Invalid course item code: ' + urlPlaylistItemCode);
        navigateToPlayer(urlPlaylistItemCode);
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

        Logger.logScoped('PLAYBACK', 'Continue course, next item code: ' + nextPlaylistItemCode);

        if (nextPlaylistItemCode)
            navigateToPlayer(nextPlaylistItemCode);

        scroll();
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
                        //px="20px"
                        height='calc(100% - 70px)'>

                        {/* main column */}
                        <Box
                            id="mainColumn"
                            overflowY={videoPlayerData ? 'scroll' : 'unset'}
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
                                isExamInProgress={isSidebarHidden}
                                exam={examPlayerData} />}

                            {/* MODULE */}
                            {modulePlayerData && <ModuleView module={modulePlayerData}
                                startModule={handleContinueCourse} />}

                            <Copyright />
                        </Box>

                        {/* right sidebar */}
                        <Flex
                            id="courseItemListSidebar"
                            justify="flex-start"
                            zIndex="4"
                            ml={isSidebarHidden ? '0' : '10px'}
                            bg="var(--transparentWhite70)"
                            maxWidth={isSidebarHidden ? '0px' : '420px'}
                            opacity={isSidebarHidden ? 0 : 1}
                            transition="0.5s">

                            {isDesktopView && <Flex
                                ref={setParent}
                                direction="column"
                                id="courseItemSelectorRoot"
                                overflowY='scroll'
                                pb='100px'
                                flex='1'>

                                <CourseItemSelector
                                    currentItemCode={currentPlaylistItemCode}
                                    nextItemState={nextPlaylistItemState}
                                    courseId={courseId!}
                                    mode={courseMode}
                                    modules={modules}
                                    isScrolledFromTop={isScrolledFromTop}
                                    canChangeMode={playerDataWithDefaults.canChangeMode}
                                    isPlayerLoaded={isPlayerLoaded}
                                    refetchPlayerData={refetchPlayerData}/>
                            </Flex>}
                        </Flex>
                    </Flex>
                </LoadingFrame>
            </>
    );
};
