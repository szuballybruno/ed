import { Divider, Flex } from '@chakra-ui/layout';
import { FilterAlt, Search } from '@mui/icons-material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { RadioGroup } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useSetCourseMode } from '../../../services/api/courseApiService';
import { useTempomatMode } from '../../../services/api/tempomatApiService';
import { useRecommendedItemQuota } from '../../../services/api/userProgressApiService';
import { useShowErrorDialog } from '../../../services/core/notifications';
import { ModuleDTO } from '../../../shared/dtos/ModuleDTO';
import { CourseItemStateType, CourseModeType } from '../../../shared/types/sharedTypes';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFont } from '../../controls/EpistoFont';
import { EpistoPopper } from '../../controls/EpistoPopper';
import { RecommendedItemQuota } from '../../home/RecommendedItemQuota';
import { CourseItemList } from '../../courseItemList/CourseItemList';
import { EpistoDialog } from '../../universal/epistoDialog/EpistoDialog';
import { useEpistoDialogLogic } from '../../universal/epistoDialog/EpistoDialogLogic';
import { TempomatSettingsDialog } from '../tempomat/TempomatSettingsDialog';
import { TempomatTempoInfo } from '../tempomat/TempomatTempoInfo';

export const CourseItemSelector = (props: {
    mode: CourseModeType,
    modules: ModuleDTO[],
    courseId: number,
    refetchPlayerData: () => Promise<void>,
    currentItemCode: string,
    nextItemState: CourseItemStateType | null,
    isPlayerLoaded: boolean
}) => {

    const { currentItemCode, nextItemState: itemState, isPlayerLoaded, mode, refetchPlayerData, courseId, modules } = props;
    const showErrorDialog = useShowErrorDialog();
    const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);
    const ref = useRef<HTMLButtonElement>(null);
    const canChangeCourseMode = true;

    // http 
    const { recommendedItemQuota, refetchRecommendedItemQuota } = useRecommendedItemQuota(courseId, isPlayerLoaded);
    const { tempomatMode, refetchTempomatMode } = useTempomatMode(courseId, isPlayerLoaded);
    const { setCourseModeAsync } = useSetCourseMode();

    // dialog state 
    const dialogLogic = useEpistoDialogLogic('advModeChangWarnDialog');

    const tempomatDialogLogic = useEpistoDialogLogic('tempomat');

    // func 

    const changeToAdvancedModePermanently = () => {

        dialogLogic
            .openDialog({
                buttons: [
                    {
                        action: () => setCourseMode('advanced'),
                        title: 'Go ahead',
                    }
                ]
            });
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
        <TempomatSettingsDialog
            onTempomatModeChanged={refetchTempomatMode}
            tempomatMode={tempomatMode ?? 'auto'}
            courseId={courseId}
            tempomatDialogLogic={tempomatDialogLogic} />

        {/* warning dialog */}
        <EpistoDialog
            logic={dialogLogic}
            closeButtonType="top">

            Point of no return
        </EpistoDialog>

        {/* Tempomat */}
        <Flex
            align="center"
            padding="20px"
            position='sticky'
            zIndex='1'
            top='0'
            background='white'
            height="100px">

            {/* tempomat tempo  */}
            <Flex
                flex="1">

                <TempomatTempoInfo
                    tempomatMode={tempomatMode ?? 'auto'}
                    onClick={() => tempomatDialogLogic.openDialog()} />
            </Flex>

            <Divider
                flexBasis="1px"
                mx="10px"
                height="calc(100% - 20px)"
                orientation="vertical"
                background="grey" />

            {/* daily recommended video count */}
            <Flex flex="1">

                <RecommendedItemQuota
                    isDaily
                    completedCount={recommendedItemQuota?.completedToday ?? 0}
                    recommendedItemCount={recommendedItemQuota?.recommendedItemsPerDay ?? 0} />
            </Flex>

        </Flex >

        {/* option to enable advanced mode
        IF STARTED COURSE  IN BEGINNER MODE */}
        {
            (mode === 'beginner' && !canChangeCourseMode) && <>
                <EpistoButton
                    style={{
                        margin: '30px'
                    }}
                    variant="colored"
                    onClick={changeToAdvancedModePermanently}>

                    Change to advanced mode
                </EpistoButton>
            </>
        }

        {/* learning type selector FOR ADMINS ONLY */}
        {
            canChangeCourseMode && <RadioGroup
                value={mode}
                style={{
                    position: 'relative'
                }}>

                <Flex
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
                </Flex>

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
                    icon={<HelpOutlineIcon />}
                    onClick={() => setIsInfoDialogOpen(true)} />
            </RadioGroup>
        }

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

        <CourseItemList modules={modules}></CourseItemList>
    </>;
};
