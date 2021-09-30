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

    const { title, subTitle, thumbnailUrl, state, descriptorCode, type } = props.courseItem;
    const isLocked = state == "locked";
    const { navigateToPlayer } = useNavigation();

    const navigate = () => navigateToPlayer(descriptorCode);

    const borderWidth = state === "current"
        ? 5
        : type === "video"
            ? 0
            : 3

    const borderColor = type === "exam"
        ? "var(--intenseOrange)"
        : "var(--epistoTeal)"

    return <FlexListItem
        isLocked={isLocked}
        onClick={navigate}
        borderLeft={`${borderWidth}px solid ${borderColor}`}
        midContent={<FlexListTitleSubtitle title={title} subTitle={subTitle} />}
        endContent={<Flex align="center" justify="center" flexBasis="50px">
            {state === "current" && <VisibilityIcon style={{ color: "var(--epistoTeal)" }} />}
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
        <FlexList id="courseItemListContainer" p="10px">
            {courseItems
                .map((courseItem, index) => <CourseItemView
                    key={index}
                    courseItem={courseItem} />)}
        </FlexList>
    );
}