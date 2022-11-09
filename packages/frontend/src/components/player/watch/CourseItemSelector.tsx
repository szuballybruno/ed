import { Divider } from '@chakra-ui/layout';
import { FilterAlt, HelpOutline, KeyboardArrowUp, Search } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import { CourseApiService } from '../../../services/api/courseApiService';
import { useTempomatMode } from '../../../services/api/tempomatApiService';
import { useRecommendedItemQuota } from '../../../services/api/userProgressApiService';
import { useShowErrorDialog } from '../../../services/core/notifications';
import { PlaylistModuleDTO } from '@episto/communication';
import { CourseItemStateType, CourseModeType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { EpistoPopper } from '../../controls/EpistoPopper';
import { Playlist } from '../../courseItemList/Playlist';
import { RecommendedItemQuota } from '../../home/RecommendedItemQuota';
import { useScrollIntoView } from '../../system/AutoScrollContext';
import { EpistoDialog } from '../../universal/epistoDialog/EpistoDialog';
import { useEpistoDialogLogic } from '../../universal/epistoDialog/EpistoDialogLogic';
import { TempomatSettingsDialog } from '../tempomat/TempomatSettingsDialog';
import { TempomatTempoInfo } from '../tempomat/TempomatTempoInfo';
import { RadioGroup } from '@mui/material';

export const CourseItemSelector = (props: {
    mode: CourseModeType,
    modules: PlaylistModuleDTO[],
    courseId: Id<'Course'>,
    refetchPlayerData: () => Promise<void>,
    currentItemCode: string,
    nextItemState: CourseItemStateType | null,
    isScrolledFromTop?: boolean,
    isPlayerLoaded: boolean,
    canChangeMode?: boolean,
    isMobile?: boolean
}) => {

    const {
        currentItemCode,
        nextItemState: itemState,
        isPlayerLoaded,
        mode,
        refetchPlayerData,
        courseId,
        modules,
        canChangeMode,
        isScrolledFromTop,
        isMobile
    } = props;

    const showErrorDialog = useShowErrorDialog();
    const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);
    const ref = useRef<HTMLButtonElement>(null);

    // http
    const { recommendedItemQuota, refetchRecommendedItemQuota } = useRecommendedItemQuota(courseId);
    const { tempomatMode, refetchTempomatMode } = useTempomatMode(courseId, isPlayerLoaded);
    const { setCourseModeAsync } = CourseApiService.useSetCourseMode();
    const { scrollToTop } = useScrollIntoView();

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

    return <>

        {/* Tempomat info dialog */}
        {!isMobile && <TempomatSettingsDialog
            onTempomatModeChanged={onTempomatModeChanged}
            tempomatMode={tempomatMode ?? 'auto'}
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
                w='450px'
                h='120px'
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
            {!recommendedItemQuota?.isDeadlineSet && <EpistoFlex2
                flex="1">

                <TempomatTempoInfo
                    tempomatMode={tempomatMode ?? 'auto'}
                    onClick={() => tempomatDialogLogic.openDialog()} />
            </EpistoFlex2>}

            {!recommendedItemQuota?.isDeadlineSet && <Divider
                flexBasis="1px"
                mx="10px"
                height="calc(100% - 20px)"
                orientation="vertical"
                background="grey" />}

            {/* daily recommended video count */}
            <EpistoFlex2 flex="1">

                <RecommendedItemQuota
                    isDaily
                    isDeadlineSet={recommendedItemQuota?.isDeadlineSet ?? false}
                    completedCount={recommendedItemQuota?.completedToday ?? 0}
                    recommendedItemCount={recommendedItemQuota?.recommendedItemsPerDay ?? 0} />
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

        {/* learning type selector FOR ADMINS ONLY */}
        <RadioGroup
            value={mode}
            style={{
                position: 'relative'
            }}>

            <EpistoFlex2
                height="50px"
                padding="0 20px"
                justify="center">

                <EpistoButton
                    variant="outlined"
                    onClick={() => setCourseMode(mode === 'beginner' ? 'advanced' : 'beginner')}
                    style={{
                        margin: '5px',
                        padding: '0 10px 0 10px',
                        flex: '1',
                        border: mode === 'beginner' ? '2px solid var(--epistoTeal)' : undefined
                    }}>

                    <EpistoFont
                        isUppercase
                        fontSize="fontNormal14">

                        {mode === 'advanced'
                            ? translatableTexts.player.courseItemSelector.beginner
                            : translatableTexts.player.courseItemSelector.advanced}
                    </EpistoFont>
                </EpistoButton>
                <EpistoButton
                    variant="colored"
                    style={{
                        margin: '5px',
                        padding: '0 10px 0 10px',
                        width: '40px',
                        border: '2px solid var(--epistoTeal)'
                    }}>

                    <Search />
                </EpistoButton>
                <EpistoButton
                    variant="colored"
                    style={{
                        margin: '5px',
                        padding: '0 10px 0 10px',
                        width: '40px',
                        border: '2px solid var(--epistoTeal)'
                    }}>

                    <FilterAlt />
                </EpistoButton>
            </EpistoFlex2>

            <EpistoButton
                ref={ref}
                style={{
                    padding: '0',
                    alignSelf: 'flex-start',
                    color: 'var(--epistoTeal)',
                    position: 'absolute',
                    zIndex: 3,
                    right: 10,
                    top: -20
                }}
                icon={<HelpOutline />}
                onClick={() => setIsInfoDialogOpen(true)} />
        </RadioGroup>

        <EpistoPopper
            isOpen={isInfoDialogOpen}
            target={ref?.current}
            style={{
                width: 400
            }}
            placementX="left"
            handleClose={() => setIsInfoDialogOpen(false)}>

            <EpistoFont>
                {translatableTexts.player.courseItemSelector.courseModeSwitchDescription}
            </EpistoFont>
        </EpistoPopper>


        {isScrolledFromTop && <EpistoButton
            onClick={() => scrollToTop()}
            style={{
                padding: '5px 10px',
                minHeight: '30px',
                width: '160px',
                alignSelf: 'center',
                background: 'var(--epistoTeal)',
                color: 'white',
                display: 'flex',
                zIndex: 100000,
                alignItems: 'center',
                position: 'absolute',
                top: 110,
                border: '1px solid var(--mildGrey)',
                borderRadius: '20px'
            }}>

            <KeyboardArrowUp />

            <EpistoFont
                fontSize='fontExtraSmall'
                isUppercase>

                Görgetés felülre
            </EpistoFont>
        </EpistoButton>}

        <Playlist
            isMobile={isMobile}
            modules={modules}></Playlist>
    </>;
};
