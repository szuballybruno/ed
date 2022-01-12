import { Box, Flex, FlexProps, Text } from "@chakra-ui/react";
import { LinearProgress, Rating } from "@mui/material";
import React, { ReactNode } from 'react';
import { getAssetUrl } from "../../static/frontendHelpers";
import { CourseShortDTO } from "../../models/shared_models/CourseShortDTO";
import { FlexFloat } from "./FlexFloat";
import { Star, StarBorderOutlined, StarOutline } from "@mui/icons-material";

const SmallStat = (props: { iconUrl: string, text: string }) => {

    return <Flex
        align="center"
        mr={5}>

        {/* icon */}
        <img
            src={props.iconUrl}
            alt={""}
            style={{
                width: 15,
                height: 15,
                margin: "0 2px 0 2px"
            }} />

        {/* spent time stat */}
        <Text
            fontSize="13px"
            as={"text"}
            color={"grey"}>

            {props.text}
        </Text>
    </Flex>
}

const CourseTile = (props: {
    course: CourseShortDTO
} & FlexProps) => {

    const { course, children, ...css } = props;
    const courseTitle = course.title;
    const courseTeacherName = course.teacherName;
    const courseSubCategory = course.subCategoryName;
    const thumbnailImageUrl = course.thumbnailImageURL;
    const isComplete = course.isComplete;

    return <FlexFloat
        className="whall roundBorders"
        direction="column"
        borderRadius="10px"
        position="relative"
        overflow="hidden"
        shadow="0 0 10px 1px #CCC"
        background="var(--transparentWhite70)"
        justifyContent="space-between"
        p="5px"
        {...css}>

        {/* cover image box  */}
        <Box flex="1" position="relative" minH={150} maxH={150}>

            {/* cover image */}
            <img
                className="whall roundBorders"
                style={{
                    objectFit: "cover",
                }}
                src={thumbnailImageUrl}
                alt="" />

            {/* is complete overlay */}
            {isComplete && <Flex
                position="absolute"
                top={10}
                right={0}
                justify="flex-end">

                <Flex
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    padding="4px"
                    w={130}
                    bg="#97CC9B"
                    borderRadius="7px 0 0 7px">
                    <img
                        src={getAssetUrl("course_exam_tile_icons/tile_badge_completed.svg")}
                        alt={""}
                        style={{
                            width: 20,
                            height: 20
                        }}
                    />
                    <Text
                        textTransform={"uppercase"}
                        color="white">
                        Teljesítve!
                    </Text>
                </Flex>
            </Flex>}
        </Box>

        {/* content  */}
        <Flex p="10px" direction={"column"}>

            {/* category  */}
            <Text as="text" fontSize="13px" color="grey">
                {courseSubCategory}
            </Text>

            {/* title */}
            <Flex direction="column">
                <Text fontWeight={"600"} fontSize="15px">{courseTitle}</Text>
            </Flex>

            {/* small stats  */}
            <Flex mt={7}>

                <SmallStat
                    iconUrl={getAssetUrl("course_exam_tile_icons/tile_videos.svg")}
                    text={"119"} />

                <SmallStat
                    iconUrl={getAssetUrl("course_exam_tile_icons/tile_difficulty.svg")}
                    text={"6.9/10"} />
            </Flex>

            {/* rating */}
            <Flex
                alignItems={"center"}
                mt={7}>

                {/* teacher name */}
                <SmallStat
                    iconUrl={getAssetUrl("course_exam_tile_icons/tile_teacher.svg")}
                    text={courseTeacherName} />

                <StarBorderOutlined />

                <Text
                    as={"text"}
                    color={"grey"}
                    ml={5}>

                    4.1
                </Text>
            </Flex>

        </Flex>

        {/* buttons */}
        {props.children}
    </FlexFloat>
};

export default CourseTile;
