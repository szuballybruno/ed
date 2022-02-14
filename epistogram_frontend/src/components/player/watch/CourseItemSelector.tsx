import { Flex } from '@chakra-ui/layout';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Radio, RadioGroup, Typography } from '@mui/material';
import React, { useContext, useRef, useState } from 'react';
import { ModuleDTO } from '../../../models/shared_models/ModuleDTO';
import { CourseModeType } from "../../../models/shared_models/types/sharedTypes";
import { httpPostAsync } from "../../../services/core/httpClient";
import { useShowErrorDialog } from "../../../services/core/notifications";
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFont } from '../../controls/EpistoFont';
import { EpistoPopper } from '../../controls/EpistoPopper';
import { CurrentUserContext } from '../../system/AuthenticationFrame';
import { CourseItemList } from "../../universal/CourseItemList";

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

    const setCourseMode = async (mode: CourseModeType) => {

        try {
            await httpPostAsync(`/course/set-course-mode?courseId=${courseId}&mode=${mode}`);
            await refetchPlayerData();
        }
        catch (e: any) {

            showErrorDialog(translatableTexts.player.courseItemSelector.switchingCourseModeFailed);
        }
    }

    return <>

        {/* learning type selector */}
        {user.userActivity.canChangeCourseMode && <RadioGroup
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
        </RadioGroup>}

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
