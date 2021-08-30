import { Box, Flex } from "@chakra-ui/react";
import { Slider } from "@material-ui/core";
import React from 'react';
import { CourseItemDTO } from "../../../../models/shared_models/CourseItemDTO";
import { CourseItemType } from "../../../../models/shared_models/types/sharedTypes";
import ListItem from "../../../universal/atomic/listItem/ListItem";
import classes from './videoList.module.scss';

export const CourseItemList = (params: {
    courseItems: CourseItemDTO[],
    currentCourseItemId: number,
    navigateToCourseItem: (courseItemId: number, courseItemType: CourseItemType) => void
}) => {

    const courseItems = params.courseItems;
    const currentCourseItemId = params.currentCourseItemId;
    const navigateToCourseItem = params.navigateToCourseItem;

    return (
        <Box className={classes.videoListWrapper} bg="#f6f6f6">
            <div className={classes.videoListInnerWrapper}>

                {/* learning type selector */}
                <div className={classes.learningTypeSelector}>
                    <Slider className={classes.slider}
                        defaultValue={0}
                        aria-labelledby="discrete-slider"
                        step={1}
                        marks={[
                            {
                                value: 0,
                                label: 'Alapértelmezett',
                            },
                            {
                                value: 1,
                                label: 'Áttekintés',
                            },
                            {
                                value: 2,
                                label: 'Ismétlés',
                            }
                        ]}
                        min={0}
                        max={2} />
                </div>

                {/* course items */}
                <div className={classes.videoWrapper}>
                    {courseItems
                        .map((courseItem, index) => {

                            const isActiveItem = courseItem.id == currentCourseItemId;

                            return <ListItem
                                active={isActiveItem}
                                key={index}
                                mainTitle={courseItem.title}
                                subTitle={courseItem.subTitle}
                                thumbnailUrl={courseItem.thumbnailUrl}
                                onClick={() => navigateToCourseItem(courseItem.id, courseItem.type)} />
                        })}
                </div>
            </div>
        </Box>
    )
}

// updateActivity("",
//                                             "selectVideo",
//                                             window.location.href,
//                                             "VideoList-ListItems-SelectsNewVideo",
//                                             item.title,
//                                             "collBasedPassive",
//                                             "A felhasználó kiválaszt egy videót",
//                                             true,
//                                             undefined,
//                                             undefined,
//                                             "videos",
//                                             "_id",
//                                             item.id,
//                                             index.toString(),
//                                             currentOrigin + "watch/" + user.userData.currentCourse._id.get() + "/" + item._id)

// updateActivity("", "selectExam",
//                                     window.location.href,
//                                     "VideoList-ListItems-SelectsNewExam",
//                                     item.name as string,
//                                     "collBasedPassive",
//                                     "A felhasználó kiválaszt egy vizsgát",
//                                     true,
//                                     undefined,
//                                     undefined,
//                                     "exams",
//                                     "_id",
//                                     item._id,
//                                     index.toString(),
//                                     currentOrigin + "/watch/" + user.userData.currentCourse._id.get() + "/" + item._id)