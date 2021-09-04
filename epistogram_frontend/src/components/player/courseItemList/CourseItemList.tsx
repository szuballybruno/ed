import { Box, Flex } from "@chakra-ui/react";
import { Divider, Slider } from "@material-ui/core";
import React from 'react';
import { CourseItemDTO } from "../../../models/shared_models/CourseItemDTO";
import { CourseItemType } from "../../../models/shared_models/types/sharedTypes";
import ListItem from "../../universal/atomic/listItem/ListItem";
import classes from './videoList.module.scss';
import VisibilityIcon from '@material-ui/icons/Visibility';
import LockIcon from '@material-ui/icons/Lock';

export type NavigateToCourseItemActionType = (courseItemId: number, courseItemType: CourseItemType) => void;

export const CourseItemList = (props: {
    courseItems: CourseItemDTO[],
    navigateToCourseItem: NavigateToCourseItemActionType
}) => {

    const courseItems = props.courseItems;
    const navigateToCourseItem = props.navigateToCourseItem;

    return (
        <Box className={classes.videoListWrapper} bg="white" minWidth="390px">
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
                <div id="courseItemListContainer" className={classes.courseItemListContainer}>
                    {courseItems
                        .map((courseItem, index) => {

                            return <Flex
                                id="courseItemRoot"
                                className="leftBorderOnHover"
                                cursor="pointer"
                                key={index}
                                align="center"
                                pr="20px"
                                borderBottom={courseItems.length - 1 != index ? "1px solid #eaeaea" : "none"}>

                                <ListItem
                                    mainTitle={courseItem.title}
                                    subTitle={courseItem.subTitle}
                                    thumbnailUrl={courseItem.thumbnailUrl}
                                    onClick={() => navigateToCourseItem(courseItem.id, courseItem.type)} />

                                {courseItem.state === "current" && <VisibilityIcon style={{ color: "var(--background-18)" }} />}
                                {courseItem.state !== "current" && <LockIcon style={{ color: "grey" }} />}

                            </Flex>
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