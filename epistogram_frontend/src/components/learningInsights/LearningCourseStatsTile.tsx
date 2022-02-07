import { Box, Flex, FlexProps, Text } from "@chakra-ui/react";
import { LinearProgress } from "@mui/material";
import React from 'react';
import { CourseLearningDTO } from "../../models/shared_models/CourseLearningDTO";
import { useNavigation } from "../../services/core/navigatior";
import { formatTimespan, getAssetUrl, roundNumber } from "../../static/frontendHelpers";
import { EpistoButton } from "../controls/EpistoButton";
import { FlexFloat } from "../controls/FlexFloat";

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
        totalCourseItemCount,
        examSuccessRateAverage,
        questionSuccessRate,
        finalExamSuccessRate,
        currentItemCode,
        firstItemCode
    } = course;

    const { navigateToPlayer } = useNavigation();

    const formattedSpentTime = formatTimespan(totalSpentTime);
    const progressPercentage = roundNumber(completedCourseItemCount / totalCourseItemCount * 100);

    const handleStartCourse = () => {

        if (isComplete) {

            navigateToPlayer(firstItemCode);
        }
        else {

            navigateToPlayer(currentItemCode);
        }
    }

    return <FlexFloat
        className="whall"
        direction="column"
        borderRadius="10px"
        position="relative"
        overflow="hidden"
        shadow={"0 0 10px 1px #CCC"}
        background="var(--transparentWhite70)"
        p="5"
        justifyContent="space-between"
        {...css}>

        {/* cover image box */}
        <Box
            flex="1"
            position="relative"
            minHeight={150}
            maxHeight={150}>

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
                    iconUrl={getAssetUrl("images/time3D.png")}
                    text={formattedSpentTime} />

                {/* videos  */}
                <SmallStat
                    iconUrl={getAssetUrl("images/videos3D.png")}
                    text={`${totalVideoCount}/${completedVideoCount}`} />

                {/* video questions */}
                <SmallStat
                    iconUrl={getAssetUrl("images/rightanswerontile3D.png")}
                    text={`${totalVideoQuestionCount}/${answeredVideoQuestionCount}`} />
            </Flex>

            {/* course progress bar chart */}
            <Flex
                direction={"row"}
                alignItems={"center"}
                mt={7}
                width="100%"
                height="10px">

                <LinearProgress
                    variant="determinate"
                    style={{
                        width: "100%",
                    }}
                    value={progressPercentage} />

                <Flex m="0 5px 0 20px">
                    {`${progressPercentage}%`}
                </Flex>

            </Flex>
        </Flex>

        {/* buttons */}
        <Flex mt="10px">

            {/* details 
            <EpistoButton
                style={{ flex: "1" }}>

                Statisztika
            </EpistoButton>*/}

            {/* start course */}
            <EpistoButton
                variant="colored"
                onClick={handleStartCourse}
                style={{ flex: "1" }}>

                {isComplete ? "Újrakezdem" : "Folytatom"}
            </EpistoButton>
        </Flex>
    </FlexFloat>
};
