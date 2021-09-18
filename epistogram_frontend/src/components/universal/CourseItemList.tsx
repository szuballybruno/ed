import { Box, Flex } from "@chakra-ui/react";
import { Typography } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React from 'react';
import { CourseItemDTO } from "../../models/shared_models/CourseItemDTO";
import { CourseItemType } from "../../models/shared_models/types/sharedTypes";
import { FlexImage } from "./FlexImage";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DoneIcon from '@mui/icons-material/Done';
import { useNavigation } from "../../services/navigatior";
import { AddBoxOutlined } from "@mui/icons-material";
import { FlexList } from "./FlexList";
import { FlexListItem } from "./FlexListItem";
import { FlexListTitleSubtitle } from "./FlexListTitleSubtitle";

export type NavigateToCourseItemActionType = (descriptorCode: string) => void;

export const CourseItemView = (props: { courseItem: CourseItemDTO }) => {

    const { title, subTitle, thumbnailUrl, state, descriptorCode } = props.courseItem;
    const isLocked = state == "locked";
    const { navigateToPlayer } = useNavigation();

    const navigate = () => navigateToPlayer(descriptorCode);

    return <FlexListItem
        isLocked={isLocked}
        onClick={navigate}
        thumbnailUrl={thumbnailUrl}
        midContent={<FlexListTitleSubtitle title={title} subTitle={subTitle} />}
        endContent={<Flex align="center" justify="center" flexBasis="50px">
            {state === "current" && <VisibilityIcon style={{ color: "var(--background-18)" }} />}
            {state === "locked" && <LockIcon style={{ color: "grey" }} />}
            {state === "available" && <LockOpenIcon style={{ color: "var(--mildGreen)" }} />}
            {state === "completed" && <DoneIcon style={{ color: "var(--mildGreen)" }} />}
        </Flex>}>
    </FlexListItem>
}

export const CourseItemList = (props: {
    courseItems: CourseItemDTO[]
}) => {

    const courseItems = props.courseItems;
    // const navigateToCourseItem = props.navigateToCourseItem;

    return (
        <FlexList id="courseItemListContainer">
            {courseItems
                .map((courseItem, index) => <CourseItemView
                    key={index}
                    courseItem={courseItem} />)}
        </FlexList>
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