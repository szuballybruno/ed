import React from 'react';
import { CourseItemShortDTO } from '../../../../models/shared_models/CourseItemShortDTO';
import ListItem from "../../../universal/atomic/listItem/ListItem";
import classes from './currentCourseStats.module.scss';

const CourseItemList = (props: { courseItems: CourseItemShortDTO[] }) => {

    return (
        <div className={classes.coursesContainer}>
            {props
                .courseItems
                .map((courseItem, index) => {
                    return courseItem.type === "video"

                        ? <ListItem thumbnailUrl={courseItem.thumbnailUrl}
                            mainTitle={courseItem.title}
                            subTitle={courseItem.subTitle} />

                        : <ListItem mainTitle={"Vizsga"}
                            subTitle={"Teszteld a tudásod"}
                            onClick={() => {

                            }} />
                })}
        </div>
    );
};

export default CourseItemList;
