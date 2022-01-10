import { Flex } from '@chakra-ui/layout';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Radio, RadioGroup, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { CourseItemDTO } from "../../models/shared_models/CourseItemDTO";
import { ModuleDTO } from '../../models/shared_models/ModuleDTO';
import { CourseModeType } from "../../models/shared_models/types/sharedTypes";
import { httpPostAsync } from "../../services/core/httpClient";
import { useShowErrorDialog } from "../../services/core/notifications";
import { CourseItemList } from "../universal/CourseItemList";
import { EpistoButton } from '../universal/EpistoButton';
import { EpistoPopper } from '../universal/EpistoPopper';

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

    const setCourseMode = async (mode: CourseModeType) => {

        try {
            await httpPostAsync(`/course/set-course-mode?courseId=${courseId}&mode=${mode}`);
            await refetchPlayerData();
        }
        catch (e: any) {

            showErrorDialog("Switching coures mode failed!");
        }
    }

    return <>

        {/* learning type selector */}
        <RadioGroup value={mode} style={{ position: "relative" }}>

            <Flex height="100px" padding="20px" justify="center">

                <EpistoButton
                    variant="outlined"
                    onClick={() => setCourseMode("beginner")}
                    style={{
                        margin: "5px",
                        padding: "0 0 0 10px",
                        border: mode === "beginner" ? "2px solid var(--epistoTeal)" : undefined
                    }}>

                    <Typography style={{ fontSize: "14px" }}>
                        Kezdő Mód
                    </Typography>

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

                    <Typography style={{ fontSize: "14px" }}>
                        Haladó Mód
                    </Typography>

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

        <EpistoPopper
            isOpen={isInfoDialogOpen}
            target={ref?.current}
            style={{
                width: 400
            }}
            placementX="left"
            handleClose={() => setIsInfoDialogOpen(false)}>
            <Typography>Kezdő módban a meghatározott sorrendben haladhatsz, és előre csak addig részig tekerhetsz, melyet már megtekintettél. Haladó módban korlátlanul váltogathatsz a videók között!</Typography>
        </EpistoPopper>

        <CourseItemList modules={modules}></CourseItemList>
    </>
}
