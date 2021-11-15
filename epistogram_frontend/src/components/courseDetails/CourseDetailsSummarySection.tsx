import {Flex} from "@chakra-ui/react";
import {getAssetUrl} from "../../frontendHelpers";
import {Typography} from "@mui/material";
import {EpistoHeader} from "../EpistoHeader";
import {EpistoButton} from "../universal/EpistoButton";
import {Radar} from "react-chartjs-2";
import React from "react";
import {translatableTexts} from "../../translatableTexts";

export const CourseDetailsSummarySection = (props: {
    overviewSectionShortDescription: string
    whatCanYouLearnFromCourseList: string[]
    whatSkillsTheCourseImprovingDescription: string
}) => {

    const WhatCanYouLearnInCourseListItem = (props: { title: string }) => <Flex w={"100%"} h={30} px={15} mt={10}>
        <Flex w={30} h={30} p={5} >
            <img src={getAssetUrl("/course_page_icons/description_checkmark.svg")} style={{
                borderRadius: 5,
                objectFit: "cover"
            }} alt={""} />

        </Flex>
        <Flex direction={"row"} flex={1} ml={10} justifyContent={"flex-start"} alignItems={"center"}>
            <Typography>{props.title}</Typography>
        </Flex>
    </Flex>

    return <Flex mt={10} w={"100%"} h={500} direction={"column"} alignItems={"flex-start"}>

        <EpistoHeader text={translatableTexts.courseDetails.summarySection.courseShortDescription} my={10} />

        <Typography>
            {props.overviewSectionShortDescription}
        </Typography>

        <EpistoButton style={{
            marginTop: 20
        }}>
            {translatableTexts.courseDetails.summarySection.moreButton}
        </EpistoButton>

        <EpistoHeader text={translatableTexts.courseDetails.summarySection.whatCanYouLearnFromCourse} my={10} mt={40} />

        <Flex w={"100%"}>
            <Flex direction={"column"} minW={"50%"}>
                {props.whatCanYouLearnFromCourseList.map((title, index) => {
                    return index % 2 !== 0 && <WhatCanYouLearnInCourseListItem title={title} />
                })}
            </Flex>
            <Flex direction={"column"} minW={"50%"}>
                {props.whatCanYouLearnFromCourseList.map((title, index) => {
                    return index % 2 === 0 && <WhatCanYouLearnInCourseListItem title={title} />
                })}
            </Flex>
        </Flex>

        <EpistoHeader text={translatableTexts.courseDetails.summarySection.whatSkillsTheCourseImproving} my={10} mt={40} />

        <Flex w={"100%"} mb={100}>
            <Flex direction={"column"} minW={"50%"} >
                {props.whatSkillsTheCourseImprovingDescription}
            </Flex>
            <Flex direction={"column"} minW={"50%"}>
                <Radar
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            title: {
                                display: false,
                                text: translatableTexts.courseDetails.summarySection.averageLearningStyle
                            },
                            legend: {
                                display: false
                            }
                        },
                    }}
                    data={{
                        labels: translatableTexts.courseDetails.summarySection.averageLearningStyleChartLabels,
                        datasets: [
                            {
                                data: [5, 4, 5, 5, 3, 5, 5, 5, 4, 5],
                                backgroundColor: ["rgba(125,232,178,0.46)", "rgba(125,232,178,0.46)", "#7dabe8", "#a47de8", "#d4e87d", "#dd7de8"]
                            }
                        ]
                    }} />
            </Flex>
        </Flex>
    </Flex>
}
