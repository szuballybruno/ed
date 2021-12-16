import { Box, Flex, FlexProps, Text } from "@chakra-ui/react";
import { LinearProgress } from "@mui/material";
import React from 'react';
import { CourseLearningDTO } from "../../models/shared_models/CourseLearningDTO";
import { getAssetUrl, roundNumber } from "../../static/frontendHelpers";
import { EpistoButton } from "../universal/EpistoButton";
import { FlexFloat } from "../universal/FlexFloat";

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

export const LearningCourseStatsTile = (props: {
    course: CourseLearningDTO
} & FlexProps) => {

    const { course, children, ...css } = props;
    const {
        title,
        teacherName,
        subCategoryName,
        thumbnailImageURL,
        isComplete,
        totalVideoCount,
        completedVideoCount,
        totalVideoQuestionCount,
        answeredVideoQuestionCount,
        totalSpentTime,
        completedCourseItemCount,
        totalCourseItemCount
    } = course;

    const spentHours = roundNumber(totalSpentTime / 60 / 60);
    const spentMinutes = roundNumber((totalSpentTime - (spentHours * 60 * 60)) / 60);
    const formattedSpentTime = `${spentHours}h ${spentMinutes}m`;

    const progressPercentage = roundNumber(completedCourseItemCount / totalCourseItemCount * 100);

    return <FlexFloat
        className="whall"
        direction="column"
        borderRadius="10px"
        position="relative"
        overflow="hidden"
        shadow={"0 0 10px 1px #CCC"}
        bg="white"
        justifyContent="space-between"
        border="5px solid white"
        {...css}>

        {/* cover image box */}
        <Box
            flex="1"
            position="relative"
            minHeight={200}
            maxHeight={200}>

            {/* cover image */}
            <img
                className="whall"
                style={{
                    objectFit: "cover",
                    borderRadius: 10,
                    position: "absolute"
                }}
                src={thumbnailImageURL}
                alt="" />

            {/* is complete label */}
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

        {/* content */}
        <Flex p="10px" direction="column">
            {/* category  */}
            <Text
                as="text"
                color="grey">

                {subCategoryName}
            </Text>

            {/* title */}
            <Text
                as="h6"
                fontWeight={"bold"}
                fontSize="large">

                {title}
            </Text>

            {/* small stats */}
            <Flex mt={7} justify="space-evenly">

                {/* spent time  */}
                <SmallStat
                    iconUrl={getAssetUrl("course_exam_tile_icons/tile_lenght_left.svg")}
                    text={formattedSpentTime} />

                {/* videos  */}
                <SmallStat
                    iconUrl={getAssetUrl("course_exam_tile_icons/tile_videos.svg")}
                    text={`${totalVideoCount}/${completedVideoCount}`} />

                {/* video questions */}
                <SmallStat
                    iconUrl={getAssetUrl("course_exam_tile_icons/tile_questions.svg")}
                    text={`${totalVideoQuestionCount}/${answeredVideoQuestionCount}`} />

                {/* final exam  */}
                {/* <SmallStat
                    iconUrl={getAssetUrl("course_exam_tile_icons/tile_test.svg")}
                    text={"105/119"} /> */}
            </Flex>

            {/* course progress bar chart */}
            <Flex
                direction={"row"}
                alignItems={"center"}
                mt={7}
                w="100%"
                h="10px">
                <LinearProgress
                    variant="determinate"
                    style={{
                        width: "100%",
                    }}
                    value={progressPercentage} />
            </Flex>

            {/* more stats */}
            <Flex
                align={"center"}
                mt={7}
                justify="space-evenly">

                <SmallStat
                    iconUrl={getAssetUrl("course_exam_tile_icons/tile_progress.svg")}
                    text={`${progressPercentage}%-os haladás`} />

                <SmallStat
                    iconUrl={getAssetUrl("course_exam_tile_icons/tile_achivement.svg")}
                    text={"65%-ban helyes válaszok"} />
            </Flex>
        </Flex>

        {/* buttons */}
        <Flex mt="10px">

            {/* details */}
            <EpistoButton
                style={{ flex: "1" }}>

                Statisztika
            </EpistoButton>

            {/* start course */}
            <EpistoButton
                variant="colored"
                style={{ flex: "1" }}>

                Folytatom
            </EpistoButton>
        </Flex>
    </FlexFloat>
};
