import {Flex} from "@chakra-ui/react";
import {EpistoHeader} from "../EpistoHeader";
import {Typography} from "@mui/material";
import {Radar} from "react-chartjs-2";
import React from "react";
import {translatableTexts} from "../../translatableTexts";
import {mockCourseDetails} from "../../mockData";

export const CourseDetailsRequirementsSection = () => <Flex mt={10} w={"100%"} h={500} direction={"column"} alignItems={"flex-start"}>
    <EpistoHeader text={translatableTexts.courseDetails.requirementsSection.whenTheCourseGoodForYou} my={10} />
    <Typography>
        {mockCourseDetails.lorem}
    </Typography>

    <EpistoHeader text={translatableTexts.courseDetails.requirementsSection.howMuchDoesTheCourseFitsYou} my={10} mt={40} />
    <Flex w={"100%"} mb={100}>
        <Flex direction={"column"} minW={"50%"} >
            Dinamikus szöveg*
        </Flex>
        <Flex direction={"column"} minW={"50%"}>
            <Radar
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: false,
                            text: translatableTexts.courseDetails.requirementsSection.averageLearningStyle
                        },
                        legend: {
                            display: false
                        }
                    },
                }}
                data={{
                    labels: translatableTexts.courseDetails.requirementsSection.averageLearningStyleChartLabels,
                    datasets: [
                        {
                            data: [5, 4, 5, 5, 3, 5, 5, 5, 4, 5],
                            backgroundColor: ["rgba(125,232,178,0.46)", "rgba(125,232,178,0.46)", "#7dabe8", "#a47de8", "#d4e87d", "#dd7de8"]
                        }
                    ]
                }} />
        </Flex>
    </Flex>

    <EpistoHeader text={translatableTexts.courseDetails.requirementsSection.technicalRequirementsForCourse} my={10} mt={40} />
    <Flex w={"100%"}>
        <Flex direction={"column"} minW={"50%"}>
            <Flex w={"100%"} h={30} px={15} mt={10}>
                <Flex w={30} h={30} p={5} />
                <Flex direction={"row"} flex={1} ml={10} justifyContent={"flex-start"} alignItems={"center"}>
                    <Typography>{mockCourseDetails.shortLorem}</Typography>
                </Flex>
            </Flex>
            <Flex w={"100%"} h={30} px={15} mt={10}>
                <Flex w={30} h={30} p={5} />
                <Flex direction={"row"} flex={1} ml={10} justifyContent={"flex-start"} alignItems={"center"}>
                    <Typography>{mockCourseDetails.shortLorem}</Typography>
                </Flex>
            </Flex>
            <Flex w={"100%"} h={30} px={15} mt={10}>
                <Flex w={30} h={30} p={5} />
                <Flex direction={"row"} flex={1} ml={10} justifyContent={"flex-start"} alignItems={"center"}>
                    <Typography>{mockCourseDetails.shortLorem}</Typography>
                </Flex>
            </Flex>
            <Flex w={"100%"} h={30} px={15} mt={10}>
                <Flex w={30} h={30} p={5} />
                <Flex direction={"row"} flex={1} ml={10} justifyContent={"flex-start"} alignItems={"center"}>
                    <Typography>{mockCourseDetails.shortLorem}</Typography>
                </Flex>
            </Flex>
            <Flex w={"100%"} h={30} px={15} mt={10}>
                <Flex w={30} h={30} p={5} />
                <Flex direction={"row"} flex={1} ml={10} justifyContent={"flex-start"} alignItems={"center"}>
                    <Typography>{mockCourseDetails.shortLorem}</Typography>
                </Flex>
            </Flex>
        </Flex>
    </Flex>

</Flex>
