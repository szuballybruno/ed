import { Box, Flex, FlexProps, Text } from "@chakra-ui/react";
import { LinearProgress, Rating } from "@mui/material";
import React, { ReactNode } from 'react';
import { getAssetUrl } from "../../static/frontendHelpers";
import { CourseShortDTO } from "../../models/shared_models/CourseShortDTO";
import { FlexFloat } from "./FlexFloat";

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
        <Box flex="1" position="relative" minH={200} maxH={200}>

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
            <Text as="text" color="grey">
                {courseSubCategory}
            </Text>

            {/* title */}
            <Flex direction="column">
                <Text as="h6" fontWeight={"bold"} fontSize="large">{courseTitle}</Text>
            </Flex>

            {/* small stats  */}
            <Flex mt={7}>

                <SmallStat
                    iconUrl={getAssetUrl("course_exam_tile_icons/tile_videos.svg")}
                    text={"119"} />

                <SmallStat
                    iconUrl={getAssetUrl("course_exam_tile_icons/tile_language.svg")}
                    text={"magyar"} />

                <SmallStat
                    iconUrl={getAssetUrl("course_exam_tile_icons/tile_difficulty.svg")}
                    text={"6.9/10"} />
            </Flex>

            {/* rating */}
            <Flex
                alignItems={"center"}
                mt={7}>

                <Rating
                    name="read-only"
                    style={{
                        color: "var(--epistoTeal)",
                    }}
                    value={4}
                    readOnly />

                <Text
                    as={"text"}
                    color={"grey"}
                    ml={5}>

                    4.1 (189 értékelés)
                </Text>
            </Flex>

            {/* teacher name */}
            <SmallStat
                iconUrl={getAssetUrl("course_exam_tile_icons/tile_teacher.svg")}
                text={courseTeacherName} />
        </Flex>

        {/* buttons */}
        {props.children}
    </FlexFloat>
};

export default CourseTile;
