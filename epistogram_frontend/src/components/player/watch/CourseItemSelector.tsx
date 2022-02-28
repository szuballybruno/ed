import { Divider, Flex } from '@chakra-ui/layout';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { LinearProgress, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useContext, useRef, useState } from 'react';
import { ModuleDTO } from '../../../shared/dtos/ModuleDTO';
import { CourseModeType } from "../../../shared/types/sharedTypes";
import { useSetCourseMode } from '../../../services/api/courseApiService';
import { httpPostAsync } from "../../../services/core/httpClient";
import { useShowErrorDialog } from "../../../services/core/notifications";
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFont } from '../../controls/EpistoFont';
import { EpistoPopper } from '../../controls/EpistoPopper';
import { EpistoDialog, useEpistoDialogLogic } from '../../EpistoDialog';
import { CurrentUserContext } from '../../system/AuthenticationFrame';
import { CourseItemList } from "../../universal/CourseItemList";
import { Info, InfoOutlined, Settings } from '@mui/icons-material';
import { getAssetUrl } from '../../../static/frontendHelpers';
import { Image } from '@chakra-ui/react';
import { RecommendedItemQuota } from '../../home/RecommendedItemQuota';
import { TempomatModeTile } from '../tempomat/TempomatModeTile';
import { useRecommendedItemQuota } from '../../../services/api/userProgressApiService';
import { TempomatSettingsDialog } from '../tempomat/TempomatSettingsDialog';
import { TempomatTempoInfo } from '../tempomat/TempomatTempoInfo';

export const CourseItemSelector = (props: {
    mode: CourseModeType,
    modules: ModuleDTO[],
    courseId: number,
    refetchPlayerData: () => Promise<void>,
}) => {

    const { mode, refetchPlayerData, courseId, modules } = props;
    const showErrorDialog = useShowErrorDialog();
    const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);
    const ref = useRef<HTMLButtonElement>(null);
    const user = useContext(CurrentUserContext)!;
    const canChangeCourseMode = user.userActivity.canChangeCourseMode;

    // http 
    const { recommendedItemQuota } = useRecommendedItemQuota(courseId, true);
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
                    maxItemCount={recommendedItemQuota?.allItemsCount ?? 0}
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
