import { Flex, Grid } from "@chakra-ui/react";
import { getAssetUrl } from "../../static/frontendHelpers";
import { Typography } from "@mui/material";
import { EpistoHeader } from "../EpistoHeader";
import { EpistoButton } from "../universal/EpistoButton";
import { Radar } from "react-chartjs-2";
import React from "react";
import { translatableTexts } from "../../static/translatableTexts";
import { CourseDetailsDTO } from "../../models/shared_models/CourseDetailsDTO";
import { CourseImprovementStatsRadar } from "../universal/CourseImprovementStatsRadar";
import DoneIcon from '@mui/icons-material/Done';

export const CourseDetailsSummarySection = (props: {
    courseDetails: CourseDetailsDTO
}) => {

    const { courseDetails } = props;

    return <Flex
        mt={10}
        w={"100%"}
        h={500}
        direction={"column"}
        alignItems={"flex-start"}>

        {/* description title */}
        <EpistoHeader
            type="strong"
            text={translatableTexts.courseDetails.summarySection.courseShortDescription}
            my={10} />

        {/* description */}
        <Typography>
            {courseDetails.description}
        </Typography>

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
                    <Typography>
                        {skillBenefit}
                    </Typography>
                </Flex>)}
        </Grid>

        {/* humam skill benefits title */}
        <EpistoHeader
            type="strong"
            text={translatableTexts.courseDetails.summarySection.whatSkillsTheCourseImproving}
            my={10}
            mt={40} />

        {/* humam skill benefits */}
        <Flex w={"100%"} mb={100}>

            {/* human skill benefits description */}
            <Flex direction={"column"} minW={"50%"} >
                {courseDetails.humanSkillBenefitsDescription}
            </Flex>

            {/* human skill benefits chart  */}
            <Flex direction={"column"} minW={"50%"}>
                <CourseImprovementStatsRadar stats={courseDetails?.humanSkillBenefits ?? []} />
            </Flex>
        </Flex>
    </Flex>
}
