import { Box, Flex } from "@chakra-ui/react";
import { Typography } from "@material-ui/core";
import LockIcon from '@material-ui/icons/Lock';
import VisibilityIcon from '@material-ui/icons/Visibility';
import React from 'react';
import { CourseItemDTO } from "../../models/shared_models/CourseItemDTO";
import { CourseItemType } from "../../models/shared_models/types/sharedTypes";
import { FlexImage } from "./FlexImage";

export type NavigateToCourseItemActionType = (courseItemId: number, courseItemType: CourseItemType) => void;

export const CourseItemView = (props: { courseItem: CourseItemDTO }) => {

    const { title, subTitle, thumbnailUrl, state } = props.courseItem;
    const to = "";

    return <Flex
        id="courseItemRoot"
        className="leftBorderOnHover"
        cursor="pointer"
        align="stretch"
        p="10px"
        borderBottom="1px solid #eaeaea">

        <FlexImage url={thumbnailUrl} flexBasis="50px"></FlexImage>

        <Flex direction="column" flex="1" pl="20px">
            <Flex>
                <Typography variant={"button"}>
                    {title}
                </Typography>
            </Flex>
            <Box>
                <Typography variant={"caption"}>
                    {subTitle}
                </Typography>
            </Box>
        </Flex>

        <Flex align="center" justify="center" flexBasis="50px">
            {state === "current" && <VisibilityIcon style={{ color: "var(--background-18)" }} />}
            {state !== "current" && <LockIcon style={{ color: "grey" }} />}
        </Flex>
    </Flex>
}

export const CourseItemList = (props: {
    courseItems: CourseItemDTO[]
}) => {

    const courseItems = props.courseItems;
    // const navigateToCourseItem = props.navigateToCourseItem;

    return (
        <Flex id="courseItemListContainer" direction="column">
            {courseItems
                .map((courseItem, index) => <CourseItemView
                    key={index}
                    courseItem={courseItem} />)}
        </Flex>
    );
}

// () => navigateToCourseItem(courseItem.id, courseItem.type)

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