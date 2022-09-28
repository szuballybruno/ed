import { useEffect, useMemo, useState } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { PlayerApiService } from '../../../services/api/PlayerApiService';
import browser from '../../../services/core/browserSniffingService';
import { useNavigation } from '../../../services/core/navigatior';
import { PlayerDataDTO } from '../../../shared/dtos/PlayerDataDTO';
import { setPageTitle, useIsMobileView } from '../../../static/frontendHelpers';
import { useStringParam } from '../../../static/locationHelpers';
import { Logger } from '../../../static/Logger';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoDiv } from '../../controls/EpistoDiv';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { useScrollIntoView } from '../../system/AutoScrollContext';
import { LoadingFrame } from '../../system/LoadingFrame';
import { Copyright } from '../../universal/Copyright';
import { EpistoDialog } from '../../universal/epistoDialog/EpistoDialog';
import { useEpistoDialogLogic } from '../../universal/epistoDialog/EpistoDialogLogic';
import { CourseItemSelector } from './CourseItemSelector';
import { ExamPlayer } from './ExamPlayer';
import { ModuleView } from './ModuleView';
import { useVideoPlayerFullscreenContext } from './videoPlayer/videoPlayerState';
import { WatchView } from './WatchView';

export type WatchSubpageState = 'watch' | 'examStart' | 'examInProgress' | 'examResults'

export const WatchSubpage = () => {

    const warningDialogLogic = useEpistoDialogLogic('warn3');
    const { navigate2, navigateToPlayer } = useNavigation();
    const urlPlaylistItemCode = useStringParam('descriptorCode')!;
    const [watchSubpageState, setWatchSubpageState] = useState<WatchSubpageState>('watch');
    const [isScrolledFromTop, setIsScrolledFromTop] = useState(false);
    const { setParent, scroll, parentElement } = useScrollIntoView();
    const isShowSidebar = (watchSubpageState === 'watch' || watchSubpageState === 'examStart');
    const isContentScrollable = (watchSubpageState !== 'examInProgress');


    const isIPhone = browser.isIPhone;
    const { isFullscreen } = useVideoPlayerFullscreenContext();
    const isIphoneFullscreenMode = (isFullscreen && isIPhone);

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

    const isMobile = useIsMobileView();

    const handleContinueCourse = () => {

        Logger.logScoped('PLAYBACK', 'Continue course, next item code: ' + nextPlaylistItemCode);

        if (nextPlaylistItemCode)
            navigateToPlayer(nextPlaylistItemCode);

        scroll();
    };

    return (
        isDeleted
            ? <>
                <EpistoFlex2
                    className='whall'
                    align='center'
                    justify='center'>

                    <EpistoFlex2
                        background='white'
                        padding='100px'
                        borderRadius='15px'>

                        <EpistoFont>
                            Course has been deleted!
                        </EpistoFont>
                    </EpistoFlex2>
                </EpistoFlex2>
            </>
            : <>
                <EpistoDialog logic={warningDialogLogic} />

                <LoadingFrame
                    loadingState={[]}
                    height='100vh'
                    direction="column"
                    error={[playerDataError]}>

                    <EpistoFlex2
                        //px="20px"
                        height={isIphoneFullscreenMode ? '100vh' : 'calc(100% - 70px)'}>

                        {/* main column */}
                        <EpistoDiv
                            id="mainColumn"
                            overflowY={isContentScrollable
                                ? 'scroll'
                                : 'unset'}
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
                                setWatchSubpageState={setWatchSubpageState}
                                watchSubpageState={watchSubpageState}
                                courseId={courseId!}
                                exam={examPlayerData} />}

                            {/* MODULE */}
                            {modulePlayerData && <ModuleView module={modulePlayerData}
                                startModule={handleContinueCourse} />}

                            <Copyright />
                        </EpistoDiv>

                        {/* right sidebar */}
                        {!isMobile && <EpistoFlex2
                            id="courseItemListSidebar"
                            justify="flex-start"
                            ml={!isShowSidebar || isMobile ? '0' : '10px'}
                            bg="var(--transparentWhite70)"
                            maxWidth={!isShowSidebar ? '0px' : '420px'}
                            opacity={!isShowSidebar ? 0 : 1}
                            transition="0.5s">

                            {!isMobile && <EpistoFlex2
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
                                    refetchPlayerData={refetchPlayerData} />
                            </EpistoFlex2>}
                        </EpistoFlex2>}
                    </EpistoFlex2>
                </LoadingFrame>
            </>
    );
};
