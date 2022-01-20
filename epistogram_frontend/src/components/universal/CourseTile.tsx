import { Box, Flex, FlexProps, Text } from "@chakra-ui/react";
import { LinearProgress, Rating } from "@mui/material";
import React, { ReactNode } from 'react';
import { formatTimespan, getAssetUrl } from "../../static/frontendHelpers";
import { CourseShortDTO } from "../../models/shared_models/CourseShortDTO";
import { FlexFloat } from "../controls/FlexFloat";
import { Star, StarBorderOutlined, StarOutline } from "@mui/icons-material";
import { useCourseDetails } from "../../services/api/courseApiService";
import { translatableTexts } from "../../static/translatableTexts";

const SmallStat = (props: { iconUrl: string, text: string }) => {

    return <Flex
        title="Kurzus adatok"
        align="center"
        mr={5}>

        {/* icon */}
        <img
            src={props.iconUrl}
            alt={""}
            style={{
                width: 22,
                height: 22,
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

    const { courseDetails } = useCourseDetails(course.courseId);

    return <FlexFloat
        className="whall roundBorders"
        direction="column"
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
                    width={130}
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

                        {translatableTexts.availableCourses.courseDone}
                    </Text>
                </Flex>
            </Flex>}
        </Box>

        {/* content  */}
        <Flex p="10px" direction={"column"} flex="1">

            <Flex direction="column" flex="5">

                {/* category  */}
                <Text as="text" fontSize="13px" color="grey">
                    {courseSubCategory}
                </Text>

                {/* title */}
                <Flex direction="column">
                    <Text fontWeight={"600"} fontSize="15px">{courseTitle}</Text>
                </Flex>
            </Flex>

            {/* small stats  */}
            <Flex mt={7} mb="3px" justify="space-between">

                {/* length */}
                <SmallStat
                    iconUrl={getAssetUrl("images/time3D.png")}
                    text={formatTimespan(courseDetails?.totalVideoSumLengthSeconds || 0)} />

                {/* videos count */}
                <SmallStat
                    iconUrl={getAssetUrl("images/videos3D.png")}
                    text={courseDetails?.totalVideoCount + "" || "0"} />

                {/* difficulty */}
                <SmallStat
                    iconUrl={getAssetUrl("images/difficulty3D.png")}
                    text={courseDetails?.difficulty + ""} />

                {/* rating */}
                <SmallStat
                    iconUrl={getAssetUrl("images/star3D.png")}
                    text={courseDetails?.benchmark + ""} />
            </Flex>

            {/* rating */}
            <Flex
                alignItems={"center"}
                mt={7}>

                {/* teacher name */}
                <SmallStat
                    iconUrl={getAssetUrl("images/flag3D.png")}
                    text={courseTeacherName} />

            </Flex>

        </Flex>

        {/* buttons */}
        {props.children}
    </FlexFloat>
};

export default CourseTile;
