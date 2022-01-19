import { Flex, Grid } from "@chakra-ui/react";
import DoneIcon from '@mui/icons-material/Done';
import { Typography } from "@mui/material";
import React from "react";
import { CourseDetailsDTO } from "../../models/shared_models/CourseDetailsDTO";
import { translatableTexts } from "../../static/translatableTexts";
import { EpistoButton } from "../controls/EpistoButton";
import { EpistoFont } from "../controls/EpistoFont";
import { EpistoHeader } from "../EpistoHeader";
import { CourseImprovementStatsRadar } from "../universal/CourseImprovementStatsRadar";

export const CourseDetailsSummarySection = (props: {
    courseDetails: CourseDetailsDTO
}) => {

    const { courseDetails } = props;

    return <Flex
        mt={10}
        width="100%"
        height={500}
        direction={"column"}
        alignItems={"flex-start"}>

        {/* description title */}
        <EpistoHeader
            type="strong"
            text={translatableTexts.courseDetails.summarySection.courseShortDescription}
            my={10} />

        {/* description */}
        <EpistoFont>
            {courseDetails.description}
        </EpistoFont>

        {/* expand more description */}
        <EpistoButton
            style={{
                marginTop: 20
            }}>
            {translatableTexts.courseDetails.summarySection.moreButton}
        </EpistoButton>

        {/* skill benefits title */}
        <EpistoHeader
            type="strong"
            text={translatableTexts.courseDetails.summarySection.whatCanYouLearnFromCourse}
            my={10}
            mt={40} />

        {/* skill benefits */}
        <Grid templateColumns="50% 50%" gap="10px" width="100%">
            {courseDetails
                .skillBenefits
                .map((skillBenefit) => <Flex align="center">

                    {/* icon */}
                    <DoneIcon
                        className="square30"
                        style={{
                            marginRight: "10px",
                            color: "var(--deepBlue)"
                        }} />

                    {/* text */}
                    <EpistoFont>
                        {skillBenefit}
                    </EpistoFont>
                </Flex>)}
        </Grid>

        {/* humam skill benefits title */}
        <EpistoHeader
            type="strong"
            text={translatableTexts.courseDetails.summarySection.whatSkillsTheCourseImproving}
            my={10}
            mt={40} />

        {/* humam skill benefits */}
        <Flex width="100%" mb={100}>

            {/* human skill benefits description */}
            <Flex direction={"column"} minWidth={"50%"} >
                {courseDetails.humanSkillBenefitsDescription}
            </Flex>

            {/* human skill benefits chart  */}
            <Flex direction={"column"} minWidth={"50%"}>
                <CourseImprovementStatsRadar stats={courseDetails?.humanSkillBenefits ?? []} />
            </Flex>
        </Flex>
    </Flex>
}
