import { Divider, Flex } from '@chakra-ui/layout';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Radio, RadioGroup } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSetCourseMode } from '../../../services/api/courseApiService';
import { useRecommendedItemQuota } from '../../../services/api/userProgressApiService';
import { useShowErrorDialog } from "../../../services/core/notifications";
import { ModuleDTO } from '../../../shared/dtos/ModuleDTO';
import { CourseItemStateType, CourseModeType } from "../../../shared/types/sharedTypes";
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFont } from '../../controls/EpistoFont';
import { EpistoPopper } from '../../controls/EpistoPopper';
import { EpistoDialog, useEpistoDialogLogic } from '../../EpistoDialog';
import { RecommendedItemQuota } from '../../home/RecommendedItemQuota';
import { CurrentUserContext } from '../../system/AuthenticationFrame';
import { CourseItemList } from "../../universal/CourseItemList";
import { TempomatSettingsDialog } from '../tempomat/TempomatSettingsDialog';
import { TempomatTempoInfo } from '../tempomat/TempomatTempoInfo';

export const CourseItemSelector = (props: {
    mode: CourseModeType,
    modules: ModuleDTO[],
    courseId: number,
    refetchPlayerData: () => Promise<void>,
    currentItemCode: string,
    nextItemState: CourseItemStateType | null
}) => {

    const { currentItemCode, nextItemState: itemState, mode, refetchPlayerData, courseId, modules } = props;
    const showErrorDialog = useShowErrorDialog();
    const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);
    const ref = useRef<HTMLButtonElement>(null);
    const user = useContext(CurrentUserContext)!;
    const canChangeCourseMode = user.userActivity.canChangeCourseMode;

    // http 
    const { recommendedItemQuota, refetchRecommendedItemQuota } = useRecommendedItemQuota(courseId, true);
    const { setCourseModeAsync } = useSetCourseMode();

    // dialog state 
    const dialogLogic = useEpistoDialogLogic({
        defaultCloseButtonType: "top"
    });

    const tempomatDialogLogic = useEpistoDialogLogic({
        title: "A tanfolyam tempójának beállítása",
        defaultCloseButtonType: "top"
    });

    // func 

    const changeToAdvancedModePermanently = () => {

        dialogLogic
            .openDialog({
                buttons: [
                    {
                        action: () => setCourseMode("advanced"),
                        title: "Go ahead",
                    }
                ]
            });
    }

    const setCourseMode = async (mode: CourseModeType) => {

        try {

            const payload = { courseId, mode };
            await setCourseModeAsync(payload);
            await refetchPlayerData();
        }
        catch (e: any) {

            showErrorDialog(translatableTexts.player.courseItemSelector.switchingCourseModeFailed);
        }
    }

    // effect

    useEffect(() => {

        refetchRecommendedItemQuota();
    }, [currentItemCode, itemState]);

    return <>

        {/* Tempomat info dialog */}
        <TempomatSettingsDialog tempomatDialogLogic={tempomatDialogLogic} />

        {/* warning dialog */}
        <EpistoDialog logic={dialogLogic}>
            Point of no return
        </EpistoDialog>

        {/* Tempomat */}
        <Flex
            align="center"
            padding="20px"
            height="100px">

            {/* tempomat tempo  */}
            <Flex
                flex="1">

                <TempomatTempoInfo onClick={() => tempomatDialogLogic.openDialog()} />
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
            (mode === "beginner" && !canChangeCourseMode) && <>
                <EpistoButton
                    style={{
                        margin: "30px"
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
                    position: "relative"
                }}>

                <Flex height="100px" padding="20px" justify="center">

                    <EpistoButton
                        variant="outlined"
                        onClick={() => setCourseMode("beginner")}
                        style={{
                            margin: "5px",
                            padding: "0 0 0 10px",
                            border: mode === "beginner" ? "2px solid var(--epistoTeal)" : undefined
                        }}>

                        <EpistoFont
                            isUppercase
                            fontSize="fontSmallPlus">

                            {translatableTexts.player.courseItemSelector.beginner}
                        </EpistoFont>

                        <Radio size="small" value="beginner" />
                    </EpistoButton>

                    <EpistoButton
                        variant="outlined"
                        onClick={() => setCourseMode("advanced")}
                        style={{
                            margin: "5px",
                            padding: "0 0 0 10px",
                            border: mode === "advanced" ?
                                "2px solid var(--epistoTeal)" :
                                undefined
                        }}>

                        <EpistoFont
                            isUppercase
                            fontSize="fontSmallPlus">

                            {translatableTexts.player.courseItemSelector.advanced}
                        </EpistoFont>

                        <Radio size="small" value="advanced" />
                    </EpistoButton>
                </Flex>

                <EpistoButton
                    ref={ref}
                    style={{
                        padding: "0",
                        alignSelf: "flex-start",
                        color: "var(--epistoTeal)",
                        position: "absolute",
                        right: 10,
                        top: 10
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
    </>
}
