import { Box, Flex, FlexProps, Text } from "@chakra-ui/react";
import DoneIcon from '@mui/icons-material/Done';
import React, { ReactNode } from 'react';
import { CourseShortDTO } from "../../models/shared_models/CourseShortDTO";
import { useNavigation } from "../../services/navigatior";
import { FlexFloat } from "./FlexFloat";
import { FlexImage } from "./FlexImage";

const CourseTile = (props: {
    course: CourseShortDTO,
    className?: string,
    children?: ReactNode,
} & FlexProps) => {

    const { course, children, ...css } = props;
    const colorOne = course.colorOne;
    const colorTwo = course.colorTwo;
    const courseTitle = course.title;
    const courseTeacherName = course.teacherName;
    const thumbnailImageUrl = course.thumbnailImageURL;
    const { navigateToPlayer } = useNavigation();
    const isComplete = course.isComplete;

    return <FlexFloat
        className="whall"
        direction="column"
        borderRadius="10px"
        position="relative"
        overflow="hidden"
        bg="white"
        border="5px solid white"
        {...css}>

        {/* image  */}
        <Box flex="1" position="relative">

            <FlexImage
                url={thumbnailImageUrl}
                className="whall"
                fit="cover"
                minHeight="150px" />

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

                {children}
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