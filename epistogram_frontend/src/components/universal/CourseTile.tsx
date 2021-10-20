import { Box, Flex, FlexProps, Text } from "@chakra-ui/react";
import DoneIcon from '@mui/icons-material/Done';
import React, { ReactNode } from 'react';
import { CourseShortDTO } from "../../models/shared_models/CourseShortDTO";
import { FlexFloat } from "./FlexFloat";
import {Rating} from "@mui/material";
import {getAssetUrl} from "../../frontendHelpers";

const CourseTile = (props: {
    course: CourseShortDTO,
    className?: string,
    children?: ReactNode,
} & FlexProps) => {

    const { course, children, ...css } = props;
    const courseTitle = course.title;
    const courseTeacherName = course.teacherName;
    const courseCategory = course.category;
    const thumbnailImageUrl = course.thumbnailImageURL;
    const isComplete = course.isComplete;

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
                    <Box position="absolute" top="0" height="100%" width="100%">
                        <img style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: 10
                        }} src={thumbnailImageUrl} alt="" />
                    </Box>
                </Box>

                {/* done overlay */}
                {isComplete && <Flex
                    position="absolute"
                    top={0}
                    left={0}
                    width="100%"
                    justify="flex-end">

                    <Flex padding="4px 10px 8px 14px" bg="white" borderRadius="0 0 0 10px">
                        <Text pr="10px">Teljesítve!</Text>
                        <DoneIcon
                            width="25px"
                            height="25px"
                            style={{
                                color: "white",
                                borderRadius: "50%",
                                background: "var(--mildGreen)"
                            }} />
                    </Flex>
                </Flex>}
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
                            <Text as={"text"} color={"grey"}>{"0h 00m"}</Text>
                        </Flex>
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
                        </Flex>
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
                        </Flex>
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
                        </Flex>
                    </Flex>
                    <Flex
                        direction={"row"}
                        alignItems={"center"}
                        mt={7}
                    >
                        <Rating name="read-only" style={{
                            color: "var(--epistoTeal)",
                        }} value={4} readOnly />
                        <Text as={"text"} color={"grey"} ml={5}>
                            4.1 (189 értékelés)
                        </Text>
                    </Flex>
                    <Flex
                        direction={"row"}
                        alignItems={"center"}
                        mt={7}
                    >
                        <img src={getAssetUrl("course_exam_tile_icons/tile_teacher.svg")} alt={""} style={{width: 20, height: 20, margin: "0 2px"}} />
                        <Text as="text" color="grey">{courseTeacherName}</Text>
                    </Flex>


                </Flex>

            </Box>
        </Flex>
        <Flex direction="column" minH="50px">
            {children}
        </Flex>
    </FlexFloat>
};

export default CourseTile;

{/* <Gradient className={classes.courseTitleBorder}
    gradients={[[colorOne || "grey", colorTwo || "grey"]]}
    property="background"
    duration={3000}
    angle="45deg" /> */}
