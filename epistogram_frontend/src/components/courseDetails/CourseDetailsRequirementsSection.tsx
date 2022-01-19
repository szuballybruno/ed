import { Flex } from "@chakra-ui/react";
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { Typography } from "@mui/material";
import React from "react";
import { CourseDetailsDTO } from "../../models/shared_models/CourseDetailsDTO";
import { mockCourseDetails } from "../../static/mockData";
import { translatableTexts } from "../../static/translatableTexts";
import { EpistoFont } from "../controls/EpistoFont";
import { EpistoHeader } from "../EpistoHeader";

export const CourseDetailsRequirementsSection = (props: { courseDetails: CourseDetailsDTO }) => {

    const { courseDetails } = props;

    return <Flex
        mt={10}
        width="100%"
        height={500}
        direction="column"
        align="flex-start">

        {/* course requirements description title 
        <EpistoHeader
            type="strong"
            text={translatableTexts.courseDetails.requirementsSection.whenTheCourseGoodForYou}
            my={10} />

         course requirements description 
        <EpistoFont>
            {mockCourseDetails.lorem}
        </EpistoFont>*/}

        {/* technical requirements title */}
        <EpistoHeader
            text={translatableTexts.courseDetails.requirementsSection.technicalRequirementsForCourse}
            type="strong"
            my={10}
            mt={40} />

        {/* technical requirements */}
        <Flex direction="column">
            {courseDetails
                .technicalRequirements
                .map(x => (
                    <Flex align="center">
                        <SettingsSuggestIcon style={{ color: "var(--deepBlue)", marginRight: "10px" }} className="square35" />
                        <EpistoFont>
                            {x}
                        </EpistoFont>
                    </Flex>
                ))}
        </Flex>
    </Flex>
}
