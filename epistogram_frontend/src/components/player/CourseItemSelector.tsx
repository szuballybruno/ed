import { Slider } from "@material-ui/core";
import React from 'react';
import { CourseItemDTO } from "../../models/shared_models/CourseItemDTO";
import { CourseItemList } from "../universal/CourseItemList";
import classes from './videoList.module.scss';

export const CourseItemSelector = (props: { courseItems: CourseItemDTO[] }) => {

    return <>

        {/* learning type selector */}
        <div className={classes.learningTypeSelector}>
            <Slider
                className={classes.slider}
                defaultValue={0}
                aria-labelledby="discrete-slider"
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