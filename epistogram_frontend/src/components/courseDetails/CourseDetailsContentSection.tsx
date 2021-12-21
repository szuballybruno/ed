import { Flex } from "@chakra-ui/react";
import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import React from "react";
import { CourseDetailsDTO } from "../../models/shared_models/CourseDetailsDTO";
import { getAssetUrl, roundNumber } from "../../static/frontendHelpers";

export const CourseDetailsContentSection = (props: { courseDetails: CourseDetailsDTO }) => {

    const { courseDetails } = props;

    const formatSeconds = (seconds: number) => {

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = roundNumber(seconds - (minutes * 60));

        return `${minutes}m ${remainingSeconds}s`;
    }

    return <Flex direction={"column"} mt={10}>

        {courseDetails
            .modules
            .map((module, index) => {

                return <Accordion defaultExpanded={index === 0}>

                    <AccordionSummary
                        expandIcon={<ExpandMore />}>

                        <Typography>
                            {module.name}
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        {module
                            .videos
                            .map(video => <Flex align="center" justify="space-between">

                                <Flex align="center">
                                    {/* icon */}
                                    <img
                                        src={getAssetUrl("/course_page_icons/curriculum_video.svg")}
                                        alt={""}
                                        className="square50"
                                        style={{ marginRight: '10px' }} />

                                    {/* name */}
                                    <Typography
                                        fontSize={12}
                                        fontWeight={"bold"}>

                                        {video.title}
                                    </Typography>
                                </Flex>

                                <Typography>
                                    {formatSeconds(video.length)}
                                </Typography>
                            </Flex>)}
                    </AccordionDetails>
                </Accordion>
            })}
    </Flex >
}
