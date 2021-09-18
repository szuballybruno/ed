import { Box, Flex, Text } from "@chakra-ui/react";
import { Button } from "@mui/material";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import React from 'react';
import { Gradient } from 'react-gradient';
import { NavLink } from "react-router-dom";
import { animated, useSpring } from "react-spring";
import { CourseShortDTO } from "../../../../models/shared_models/CourseShortDTO";
import { httpPostAsync, usePostData } from "../../../../services/httpClient";
import { useNavigation } from "../../../../services/navigatior";
import classes from "./courseTile.module.scss";
import DoneIcon from '@mui/icons-material/Done';
import { FlexImage } from "../../FlexImage";
import { FlexFloat } from "../../FlexFloat";
import { EpistoButton } from "../../EpistoButton";

const CourseTile = (props: {
    course: CourseShortDTO,
    itemIndex: number,
    className?: string
}) => {

    const course = props.course;
    const colorOne = course.colorOne;
    const colorTwo = course.colorTwo;
    const courseTitle = course.title;
    const courseTeacherName = course.teacherName;
    const thumbnailImageUrl = course.thumbnailImageURL;
    const { navigateToPlayer } = useNavigation();
    const isComplete = course.isComplete;

    const playCourse = async () => {

        await httpPostAsync(`/course/start-course?courseId=${course.courseId}`);
        navigateToPlayer(course.firstItemCode);
    }

    return <FlexFloat
        className="whall"
        direction="column"
        borderRadius="10px"
        position="relative"
        overflow="hidden"
        bg="white"
        border="5px solid white">

        {/* image  */}
        <Box flex="1" position="relative">

            <FlexImage url={thumbnailImageUrl} className="whall" fit="cover" />

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
        <Box flexBasis="80px" borderTop="1px solid var(--mildGrey)" zIndex={1}>

            <Flex direction="column" p="10px" >

                <Flex direction="column" >
                    <Text as="h6" fontSize="large">{courseTitle}</Text>
                    <Text as="text" color="grey">{courseTeacherName}</Text>
                </Flex>

                <Flex mt="10px">

                    {/* details */}
                    <EpistoButton
                        onClick={() => window.location.href = "https://epistogram.com/excel/"}
                        style={{ flex: "1" }}>
                        Adatlap
                    </EpistoButton>

                    {/* start course */}
                    <EpistoButton
                        onClick={playCourse}
                        variant="colored"
                        style={{ flex: "1" }}>
                        Indítás
                    </EpistoButton>
                </Flex>
            </Flex>
        </Box>
    </FlexFloat>
};

export default CourseTile;

{/* <Gradient className={classes.courseTitleBorder}
    gradients={[[colorOne || "grey", colorTwo || "grey"]]}
    property="background"
    duration={3000}
    angle="45deg" /> */}