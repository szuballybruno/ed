import { Flex } from '@chakra-ui/layout';
import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React from 'react';
import { CourseItemDTO } from "../../models/shared_models/CourseItemDTO";
import { CourseModeType } from "../../models/shared_models/types/sharedTypes";
import { httpPostAsync } from "../../services/httpClient";
import { useShowErrorDialog } from "../../services/notifications";
import { CourseItemList } from "../universal/CourseItemList";
import { EpistoButton } from '../universal/EpistoButton';

export const CourseItemSelector = (props: {
    mode: CourseModeType,
    courseItems: CourseItemDTO[],
    courseId: number,
    refetchPlayerData: () => Promise<void>,
}) => {

    const { mode, refetchPlayerData, courseId } = props;
    const showErrorDialog = useShowErrorDialog();

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
        <RadioGroup value={mode}>
            <Flex height="120px" padding="20px">

                <EpistoButton
                    variant="outlined"
                    onClick={() => setCourseMode("beginner")}
                    style={{ flex: 1, margin: "5px", padding: "0" }}>
                    <Typography style={{ fontSize: "14px" }}>
                        Kezdő Mód
                    </Typography>
                    <Radio size="small" value="beginner" />
                </EpistoButton>

                <EpistoButton
                    variant="outlined"
                    onClick={() => setCourseMode("advanced")}
                    style={{ flex: 1, margin: "5px", padding: "0" }}>
                    <Typography style={{ fontSize: "14px" }}>
                        Haladó Mód
                    </Typography>
                    <Radio size="small" value="advanced" />
                </EpistoButton>
            </Flex>
        </RadioGroup>

        {/* <div className={classes.learningTypeSelector}>

            <Slider
                className={classes.slider}
                defaultValue={courseModeIndex}
                value={courseModeIndex}
                aria-labelledby="discrete-slider"
                onChangeCommitted={(x) => setCourseMode(courseModeIndex === 0 ? 1 : 0)}
                step={1}
                marks={[
                    {
                        value: 0,
                        label: 'Újonc',
                    },
                    {
                        value: 1,
                        label: 'Haladó',
                    }
                ]}
                min={0}
                max={1} /> 
        </div> */}

        <CourseItemList courseItems={props.courseItems}></CourseItemList>
    </>
}