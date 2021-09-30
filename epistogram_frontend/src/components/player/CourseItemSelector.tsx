import { Slider } from "@mui/material";
import React, { useState } from 'react';
import { CourseItemDTO } from "../../models/shared_models/CourseItemDTO";
import { CourseModeType } from "../../models/shared_models/types/sharedTypes";
import { httpPostAsync, usePostData } from "../../services/httpClient";
import { useDialog, useShowErrorDialog } from "../../services/notifications";
import { CourseItemList } from "../universal/CourseItemList";
import classes from './videoList.module.scss';

export const CourseItemSelector = (props: {
    mode: CourseModeType,
    courseItems: CourseItemDTO[],
    courseId: number,
    refetchPlayerData: () => Promise<void>,
}) => {

    const { mode, refetchPlayerData, courseId } = props;
    const courseModeIndex = mode === "beginner" ? 0 : 1;
    const showErrorDialog = useShowErrorDialog();

    const setCourseMode = async (newIndex: number) => {

        try {
            const newMode = newIndex === 0 ? "beginner" : "advanced" as CourseModeType;
            await httpPostAsync(`/course/set-course-mode?courseId=${courseId}&mode=${newMode}`);
            await refetchPlayerData();
        }
        catch (e: any) {

            showErrorDialog("Switching coures mode failed!");
        }
    }

    return <>

        {/* learning type selector */}
        <div className={classes.learningTypeSelector}>
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
        </div>

        <CourseItemList courseItems={props.courseItems}></CourseItemList>
    </>
}