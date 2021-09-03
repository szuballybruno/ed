import { Box } from "@chakra-ui/react";
import { Slider } from "@material-ui/core";
import React from 'react';
import { CourseItemDTO } from "../../../models/shared_models/CourseItemDTO";
import { CourseItemType } from "../../../models/shared_models/types/sharedTypes";
import ListItem from "../../universal/atomic/listItem/ListItem";
import classes from './videoList.module.scss';

export type NavigateToCourseItemActionType = (courseItemId: number, courseItemType: CourseItemType) => void;

export const CourseItemList = (params: {
    courseItems: CourseItemDTO[],
    navigateToCourseItem: NavigateToCourseItemActionType
}) => {

    const courseItems = params.courseItems;
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

                            return <Box
                                cursor="pointer"
                                key={index}>
                                <ListItem
                                    active={false}
                                    mainTitle={courseItem.title}
                                    subTitle={courseItem.subTitle}
                                    thumbnailUrl={courseItem.thumbnailUrl}
                                    onClick={() => navigateToCourseItem(courseItem.id, courseItem.type)} />
                            </Box>
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