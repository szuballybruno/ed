import { CourseItemStateType, CourseModeType, Id } from '@episto/commontypes';
import { useEffect } from 'react';
import { CourseApiService } from '../../../services/api/courseApiService';
import { useTempomatMode } from '../../../services/api/tempomatApiService';
import { useRecommendedItemQuota } from '../../../services/api/userProgressApiService';
import { useShowErrorDialog } from '../../../services/core/notifications';
import { coalesce } from '../../../static/frontendHelpers';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoDivider } from '../../controls/EpistoDivider';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoSearch } from '../../controls/EpistoSearch';
import { RecommendedItemQuota } from '../../home/RecommendedItemQuota';
import { Playlist } from '../../playlist/Playlist';
import { PlaylistFilterLogicType } from '../../playlist/playlistFilterLogic';
import { useScrollIntoView } from '../../system/AutoScrollContext';
import { EpistoDialog } from '../../universal/epistoDialog/EpistoDialog';
import { useEpistoDialogLogic } from '../../universal/epistoDialog/EpistoDialogLogic';
import { TempomatSettingsDialog } from '../tempomat/TempomatSettingsDialog';
import { TempomatTempoInfo } from '../tempomat/TempomatTempoInfo';

export const CourseItemSelector = ({
    currentItemCode,
    nextItemState: itemState,
    isVideoReady,
    mode,
    refetchPlayerData,
    courseId,
    playlistFilterLogic,
    canChangeMode,
    isScrolledFromTop,
    isMobile
}: {
    mode: CourseModeType,
    playlistFilterLogic: PlaylistFilterLogicType,
    courseId: Id<'Course'>,
    refetchPlayerData: () => Promise<void>,
    currentItemCode: string,
    nextItemState: CourseItemStateType | null,
    isScrolledFromTop?: boolean,
    isVideoReady: boolean,
    canChangeMode?: boolean,
    isMobile?: boolean
}) => {

    const showErrorDialog = useShowErrorDialog();

    // http
    const { recommendedItemQuota, refetchRecommendedItemQuota } = useRecommendedItemQuota(courseId);
    const { tempomatMode, refetchTempomatMode } = useTempomatMode(courseId, isVideoReady);
    const { setCourseModeAsync } = CourseApiService.useSetCourseMode();
    const { scroll, disableAutoScroll, enableAutoScroll } = useScrollIntoView();

    const {
        completedToday,
        isDeadlineSet,
        recommendedItemsPerDay
    } = coalesce(recommendedItemQuota, {
        isDeadlineSet: false,
        completedToday: 0,
        recommendedItemsPerDay: 0
    });

    // dialog state
    const dialogLogic = useEpistoDialogLogic('advModeChangWarnDialog');

    const tempomatDialogLogic = useEpistoDialogLogic('tempomat');

    // func

    const changeToAdvancedModePermanently = () => {

        dialogLogic
            .openDialog();
    };

    const onTempomatModeChanged = async () => {
        await refetchTempomatMode();
        await refetchRecommendedItemQuota();
    };

    const setCourseMode = async (mode: CourseModeType) => {

        try {

            const payload = { courseId, mode };
            await setCourseModeAsync(payload);
            await refetchPlayerData();
        }
        catch (e: any) {

            showErrorDialog(translatableTexts.player.courseItemSelector.switchingCourseModeFailed);
        }
    };

    // effect

    useEffect(() => {

        refetchRecommendedItemQuota();
    }, [currentItemCode, itemState]);

    return <EpistoFlex2
        direction='column'>

        {/* Tempomat info dialog */}
        {!isMobile && <TempomatSettingsDialog
            onTempomatModeChanged={onTempomatModeChanged}
            tempomatMode={tempomatMode ?? 'strict'}
            courseId={courseId}
            tempomatDialogLogic={tempomatDialogLogic} />}

        {/* warning dialog */}
        {!isMobile && <EpistoDialog
            logic={dialogLogic}
            getButtonComponents={() => [
                {
                    action: () => setCourseMode('advanced'),
                    title: 'Váltás haladó módra',
                }
            ]}
            closeButtonType="top">

            <EpistoFlex2
                width='450px'
                height='120px'
                align='center'
                justify='center'
                padding='20px'>

                Biztosan váltasz haladó módra? Ez a művelet nem vonható vissza!
            </EpistoFlex2>
        </EpistoDialog>}

        {/* Tempomat */}
        {!isMobile && <EpistoFlex2
            align="center"
            padding="20px"
            position='sticky'
            zIndex='5'
            top='0'
            background='white'
            height="100px">

            {/* tempomat tempo  */}
            {!isDeadlineSet && (
                <>
                    <EpistoFlex2
                        flex="1">

                        <TempomatTempoInfo
                            tempomatMode={tempomatMode ?? 'strict'}
                            onClick={() => tempomatDialogLogic.openDialog()} />
                    </EpistoFlex2>

                    <EpistoDivider
                        flexBasis="1px"
                        mx="10px"
                        height="calc(100% - 20px)"
                        orientation="vertical"
                        background="grey" />
                </>
            )}

            {/* daily recommended video count */}
            <EpistoFlex2 flex="1">

                <RecommendedItemQuota
                    isDaily
                    isDeadlineSet={isDeadlineSet}
                    completedCount={completedToday}
                    recommendedItemCount={recommendedItemsPerDay} />
            </EpistoFlex2>

        </EpistoFlex2>}

        {/* option to enable advanced mode
        IF STARTED COURSE  IN BEGINNER MODE */}
        {(canChangeMode && mode === 'beginner') && <>
            <EpistoButton
                style={{
                    margin: '30px',
                    padding: '20px 0'
                }}
                variant="colored"
                onClick={changeToAdvancedModePermanently}>

                Váltás haladó módra
            </EpistoButton>
        </>}

        {/* search bar */}
        {!isMobile && <EpistoFlex2
            background='white'
            width='100%'
            zIndex={20}
            position='sticky'
            left='0'
            pb='5px'
            top='100px'>

            <EpistoSearch
                boxShadow='none'
                mx='5px'
                value={playlistFilterLogic.playlistFilters.keyword}
                onKeywordChanged={x => {

                    if (typeof x === 'string' && x.length > 0) {

                        disableAutoScroll();
                    }

                    if (typeof x === 'string' && x.length === 0) {

                        enableAutoScroll();
                    }

                    scroll();

                    return playlistFilterLogic.setFilterKeyword(x);
                }} />
        </EpistoFlex2>}

        {/* playlist */}
        <Playlist
            isMinWidth
            isMobile={isMobile}
            modules={playlistFilterLogic.playlistFiltered} />
    </EpistoFlex2>;
};
