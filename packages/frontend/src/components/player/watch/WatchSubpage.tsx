import { PlayerDataDTO, PlaylistModuleDTO } from '@episto/communication';
import { useEffect, useMemo, useState } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { Responsivity } from '../../../helpers/responsivity';
import { PlayerApiService } from '../../../services/api/PlayerApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { setPageTitle } from '../../../static/frontendHelpers';
import { useRouteParams2 } from '../../../static/locationHelpers';
import { Logger } from '../../../static/Logger';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoDiv } from '../../controls/EpistoDiv';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { usePlaylistFilterLogic } from '../../playlist/playlistFilterLogic';
import { useScrollIntoView } from '../../system/AutoScrollContext';
import { Copyright } from '../../universal/Copyright';
import { EpistoDialog } from '../../universal/epistoDialog/EpistoDialog';
import { useEpistoDialogLogic } from '../../universal/epistoDialog/EpistoDialogLogic';
import { CourseItemSelector } from './CourseItemSelector';
import { ExamPlayer } from './ExamPlayer';
import { ModuleView } from './ModuleView';
import { useVideoPlayerFullscreenContext } from './videoPlayer/VideoPlayerFullscreenFrame';
import { WatchView } from './WatchView';

export type WatchSubpageState = 'watch' | 'examStart' | 'examInProgress' | 'examResults'

export const WatchSubpage = () => {

    const warningDialogLogic = useEpistoDialogLogic<{ descriptorCode: string }>('warn3');
    const { navigate2, navigateToPlayer } = useNavigation();
    const urlPlaylistItemCode = useRouteParams2(applicationRoutes.playerRoute.watchRoute)
        .getValue(x => x.descriptorCode, 'string');
    const [watchSubpageState, setWatchSubpageState] = useState<WatchSubpageState>('watch');
    const [isScrolledFromTop, setIsScrolledFromTop] = useState(false);
    const { setParent, scroll, parentElement } = useScrollIntoView();
    const isShowSidebar = (watchSubpageState === 'watch' || watchSubpageState === 'examStart');

    const [isFullscreen] = useVideoPlayerFullscreenContext();

    const isContentScrollable = (watchSubpageState !== 'examInProgress' && !isFullscreen);

    // get player page data
    const {
        playerData,
        playerDataStatus,
        playerDataError,
        refetchPlayerData
    } = PlayerApiService
        .usePlayerData(urlPlaylistItemCode);

    const {
        examPlayerData,
        videoPlayerData,
        modulePlayerData,
        answerSessionId,
        courseMode,
        courseId,
        modules,
        canChangeMode,
        previousPlaylistItemCode,
        nextPlaylistItemCode,
        currentPlaylistItemCode,
        nextPlaylistItemState
    } = useMemo(() => (playerData ?? ({
        courseMode: 'beginner',
        currentPlaylistItemCode: '',
        nextPlaylistItemState: null,
        canChangeMode: false,
        modules: [] as PlaylistModuleDTO[]
    } as PlayerDataDTO)), [playerData]);

    const playlistFilterLogic = usePlaylistFilterLogic(modules);

    const title = videoPlayerData?.title || examPlayerData?.title || modulePlayerData?.name;
    const isDeleted = playerDataError?.code === 'deleted';
    const isVideoReady = useMemo(() => {

        if (urlPlaylistItemCode !== currentPlaylistItemCode)
            return false;

        return true;
    }, [urlPlaylistItemCode, currentPlaylistItemCode]);

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
            .openDialog({ descriptorCode });
    };

    const { isMobile } = Responsivity
        .useIsMobileView();

    const handleContinueCourse = () => {

        Logger.logScoped('PLAYBACK', 'Continue course, next item code: ' + nextPlaylistItemCode);

        if (nextPlaylistItemCode)
            navigateToPlayer(nextPlaylistItemCode);

        scroll();
    };

    const handlePlayPreviousItem = () => {

        Logger.logScoped('PLAYBACK', 'Playing previous item. Item code: ' + nextPlaylistItemCode);

        if (previousPlaylistItemCode)
            navigateToPlayer(previousPlaylistItemCode);

        scroll();
    };

    if (isDeleted)
        return (
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
        );

    return (
        <EpistoFlex2
            id={WatchSubpage.name}
            overflow="hidden"
            height={isFullscreen ? '100vh' : undefined}
            flex={isFullscreen ? undefined : 1}>

            <EpistoDialog
                logic={warningDialogLogic}
                title={translatableTexts.player.doYouReallyStopExam}
                description={translatableTexts.player.stopExamWarning}
                getButtonComponents={({ descriptorCode }) => [
                    {
                        title: translatableTexts.player.yes,
                        action: () => navigateToPlayer(descriptorCode!)
                    }
                ]} />

            {/* main column */}
            <EpistoDiv
                id="mainColumn"
                overflowY={isContentScrollable
                    ? 'scroll'
                    : 'unset'}
                className="whall" >

                {/* VIDEO  */}
                {videoPlayerData && <WatchView
                    isVideoReady={isVideoReady}
                    currentItemCode={currentPlaylistItemCode}
                    nextItemState={nextPlaylistItemState}
                    courseId={courseId!}
                    courseMode={courseMode}
                    refetchPlayerData={refetchPlayerData}
                    answerSessionId={answerSessionId!}
                    videoPlayerData={videoPlayerData}
                    playlistFilterLogic={playlistFilterLogic}
                    continueCourse={handleContinueCourse}
                    navigateToCourseItem={navigateToCourseItem} />}

                {/* EXAM */}
                {examPlayerData && <ExamPlayer
                    continueCourse={handleContinueCourse}
                    handleBackToPlayer={handlePlayPreviousItem}
                    answerSessionId={answerSessionId!}
                    setWatchSubpageState={setWatchSubpageState}
                    watchSubpageState={watchSubpageState}
                    courseId={courseId!}
                    exam={examPlayerData} />}

                {/* MODULE */}
                {modulePlayerData && <ModuleView module={modulePlayerData}
                    startModule={handleContinueCourse} />}

                {!isMobile && <Copyright />}
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
                        playlistFilterLogic={playlistFilterLogic}
                        isScrolledFromTop={isScrolledFromTop}
                        canChangeMode={canChangeMode}
                        isVideoReady={isVideoReady}
                        refetchPlayerData={refetchPlayerData} />
                </EpistoFlex2>}
            </EpistoFlex2>}
        </EpistoFlex2>
    );
};
