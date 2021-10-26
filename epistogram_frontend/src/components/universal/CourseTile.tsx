import { Box, Flex, FlexProps, Text } from "@chakra-ui/react";
import { LinearProgress, Rating } from "@mui/material";
import React, { ReactNode } from 'react';
import { getAssetUrl } from "../../frontendHelpers";
import { CourseShortDTO } from "../../models/shared_models/CourseShortDTO";
import { FlexFloat } from "./FlexFloat";

const CourseTile = (props: {
    course: CourseShortDTO,
    className?: string,
    children?: ReactNode,
    tempIsStartedSwitch?: boolean,
} & FlexProps) => {

    const { course, children, ...css } = props;
    const courseTitle = course.title;
    const courseTeacherName = course.teacherName;
    const courseCategory = course.category;
    const thumbnailImageUrl = course.thumbnailImageURL;
    const isComplete = course.isComplete;

    const CourseTileHowManyApplicantsLabel = () => <Flex
        position="absolute"
        bottom={10}
        left={0}
        justify="flex-end">

        <Flex
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            padding="4px"
            w={140}
            bg="var(--epistoTeal)"
            borderRadius="0 7px 7px 0">
            <Text
                fontSize="0.85em"
                textTransform={"uppercase"}
                color="white">
                4798 jelentkező
            </Text>
        </Flex>
    </Flex>

    const CourseTileNewCourseLabel = () => <Flex
        position="absolute"
        bottom={10}
        right={0}
        justify="flex-end">

        <Flex
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            padding="4px"
            w={110}
            bg="#98A4CC"
            borderRadius="7px 0 0 7px">
            <Text
                fontSize="0.85em"
                textTransform={"uppercase"}
                color="white">
                Új kurzus
            </Text>
        </Flex>
    </Flex>

    const CourseTileCompletedLabel = () => <Flex
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
    </Flex>

    return <FlexFloat
        className="whall"
        direction="column"
        borderRadius="10px"
        position="relative"
        overflow="hidden"
        bg="white"
        justifyContent="space-between"
        border="5px solid white"
        {...css}>

        {/* image  */}
        <Flex direction={"column"}>
            <Box flex="1" position="relative" minH={200} maxH={200}>
                <Box position="relative"
                    className="whall"
                    minHeight="150px">
                    <Box
                        position="absolute"
                        top="0"
                        height="100%"
                        width="100%"
                        p="4px">

                        <img style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: 10
                        }} src={thumbnailImageUrl} alt="" />

                        <Flex
                            h="calc(100% - 8px)"
                            width="calc(100% - 8px)"
                            top="4"
                            left="4"
                            position="absolute">
                            {isComplete && <CourseTileCompletedLabel />}
                            {props.tempIsStartedSwitch && <CourseTileHowManyApplicantsLabel />}
                            {props.tempIsStartedSwitch && <CourseTileNewCourseLabel />}

                        </Flex>
                    </Box>
                </Box>

                {/* done overlay */}

            </Box>

            {/* title */}
            <Box flexBasis="80px" zIndex={1}>

                <Flex direction="column" p="10px" >
                    <Text as="text" color="grey">{courseCategory}</Text>
                    <Flex direction="column">
                        <Text as="h6" fontWeight={"bold"} fontSize="large">{courseTitle}</Text>
                    </Flex>
                    <Flex mt={7}>
                        <Flex direction={"row"} alignItems={"center"} mr={5}>
                            <img
                                src={getAssetUrl("course_exam_tile_icons/tile_lenght_left.svg")}
                                alt={""}
                                style={{
                                    width: 15,
                                    height: 15,
                                    margin: "0 2px 0 2px"
                                }}
                            />
                            <Text as={"text"} color={"grey"}>{"14h 10m"}</Text>
                        </Flex>

                        {props.tempIsStartedSwitch ?
                            <Flex direction={"row"} alignItems={"center"} mr={5}>
                                <img
                                    src={getAssetUrl("course_exam_tile_icons/tile_videos.svg")}
                                    alt={""}
                                    style={{
                                        width: 15,
                                        height: 15,
                                        margin: "0 2px 0 4px"
                                    }}
                                />
                                <Text as={"text"} color={"grey"}>{"105/119"}</Text>
                            </Flex> :
                            <Flex direction={"row"} alignItems={"center"} mr={5}>
                                <img
                                    src={getAssetUrl("course_exam_tile_icons/tile_videos.svg")}
                                    alt={""}
                                    style={{
                                        width: 15,
                                        height: 15,
                                        margin: "0 2px 0 4px"
                                    }}
                                />
                                <Text as={"text"} color={"grey"}>{"119"}</Text>
                            </Flex>}

                        {props.tempIsStartedSwitch ?
                            <Flex direction={"row"} alignItems={"center"} mr={5}>
                                <img
                                    src={getAssetUrl("course_exam_tile_icons/tile_questions.svg")}
                                    alt={""}
                                    style={{
                                        width: 15,
                                        height: 15,
                                        margin: "0 2px 0 4px"
                                    }}
                                />
                                <Text as={"text"} color={"grey"}>{"112/119"}</Text>
                            </Flex> :
                            <Flex direction={"row"} alignItems={"center"} mr={5}>
                                <img
                                    src={getAssetUrl("course_exam_tile_icons/tile_language.svg")}
                                    alt={""}
                                    style={{
                                        width: 15,
                                        height: 15,
                                        margin: "0 2px 0 4px"
                                    }}
                                />
                                <Text as={"text"} color={"grey"}>{"magyar"}</Text>
                            </Flex>}


                        {props.tempIsStartedSwitch ?
                            <Flex direction={"row"} alignItems={"center"}>
                                <img
                                    src={getAssetUrl("course_exam_tile_icons/tile_test.svg")}
                                    alt={""}
                                    style={{
                                        width: 15,
                                        height: 15,
                                        margin: "0 2px 0 4px"
                                    }} />
                                <Text as={"text"} color={"grey"}>{"nincs kitöltve"}</Text>
                            </Flex> :
                            <Flex direction={"row"} alignItems={"center"}>
                                <img
                                    src={getAssetUrl("course_exam_tile_icons/tile_difficulty.svg")}
                                    alt={""}
                                    style={{
                                        width: 15,
                                        height: 15,
                                        margin: "0 2px 0 4px"
                                    }} />
                                <Text as={"text"} color={"grey"}>{"6.9/10"}</Text>
                            </Flex>}


                    </Flex>
                    {
                        props.tempIsStartedSwitch ?
                            <Flex
                                direction={"row"}
                                alignItems={"center"}
                                mt={7}
                                w="100%"
                                h="10px"
                            >
                                <LinearProgress variant="determinate" style={{
                                    width: "100%",
                                }} value={60} />
                            </Flex> :
                            <Flex
                                direction={"row"}
                                alignItems={"center"}
                                mt={7}>
                                <Rating name="read-only" style={{
                                    color: "var(--epistoTeal)",
                                }} value={4} readOnly />
                                <Text as={"text"} color={"grey"} ml={5}>
                                    4.1 (189 értékelés)
                                </Text>
                            </Flex>
                    }
                    {
                        props.tempIsStartedSwitch ?
                            <Flex
                                direction={"row"}
                                alignItems={"center"}
                                mt={7}>
                                <Flex ml="5">
                                    <img
                                        src={getAssetUrl("course_exam_tile_icons/tile_progress.svg")}
                                        alt={""}
                                        style={{ width: 20, height: 20, margin: "0 2px" }} />
                                    <Text
                                        as="text"
                                        fontSize="0.85em"
                                        color="grey">{"79%-os haladás"}</Text>
                                </Flex>

                                <Flex ml="5">
                                    <img
                                        src={getAssetUrl("course_exam_tile_icons/tile_achivement.svg")}
                                        alt={""}
                                        style={{ width: 20, height: 20, margin: "0 2px" }} />
                                    <Text
                                        as="text"
                                        fontSize="0.85em"
                                        color="grey">{"65%-ban helyes válaszok"}</Text>
                                </Flex>
                            </Flex> :
                            <Flex
                                direction={"row"}
                                alignItems={"center"}
                                mt={7}>
                                <img
                                    src={getAssetUrl("course_exam_tile_icons/tile_teacher.svg")}
                                    alt={""}
                                    style={{ width: 20, height: 20, margin: "0 2px" }} />
                                <Text
                                    as="text"
                                    color="grey">{courseTeacherName}</Text>
                            </Flex>
                    }


                </Flex>

            </Box>
        </Flex>
        <Flex direction="column" minH="50px">
            {children}
        </Flex>
    </FlexFloat>
};

export default CourseTile;
