import {Grid} from '@chakra-ui/react';
import DoneIcon from '@mui/icons-material/Done';
import React from 'react';
import {CourseDetailsDTO} from '../../shared/dtos/CourseDetailsDTO';
import {defaultCharts} from '../../static/defaultChartOptions';
import {translatableTexts} from '../../static/translatableTexts';
import {EpistoFlex2} from '../controls/EpistoFlex';
import {EpistoFont} from '../controls/EpistoFont';
import {EpistoHeader} from '../EpistoHeader';
import {EpistoRadarChart} from '../universal/charts/base_charts/EpistoRadarChart';

export const CourseDetailsSummarySection = (props: {
    courseDetails: CourseDetailsDTO
}) => {

    const { courseDetails } = props;

    return <EpistoFlex2
        mt='10px'
        width="100%"
        direction={'column'}
        alignItems={'flex-start'}>

        {/* description title */}
        <EpistoHeader
            type="strong"
            text={translatableTexts.courseDetails.summarySection.courseShortDescription}
            my='10px' />

        {/* description */}
        <EpistoFont>
            {courseDetails.description}
        </EpistoFont>

        {/* expand more description
        <EpistoButton
            style={{
                marginTop: 20
            }}>
            {translatableTexts.courseDetails.summarySection.moreButton}
        </EpistoButton>*/}

        {/* skill benefits title */}
        <EpistoHeader
            type="strong"
            text={translatableTexts.courseDetails.summarySection.whatCanYouLearnFromCourse}
            my='10px'
            mt='40px' />

        {/* skill benefits */}
        <Grid templateColumns="50% 50%"
            gap="10px"
            width="100%">

            {courseDetails
                .skillBenefits
                .map((skillBenefit, index) => <EpistoFlex2
                    key={index}
                    align="center">

                    {/* icon */}
                    <DoneIcon
                        className="square30"
                        style={{
                            marginRight: '10px',
                            color: 'var(--deepBlue)'
                        }} />

                    {/* text */}
                    <EpistoFont>
                        {skillBenefit}
                    </EpistoFont>
                </EpistoFlex2>)}
        </Grid>

        {/* humam skill benefits title */}
        <EpistoHeader
            type="strong"
            text={translatableTexts.courseDetails.summarySection.whatSkillsTheCourseImproving}
            my='10px'
            mt='40px' />

        {/* humam skill benefits */}
        <EpistoFlex2 width="100%"
            mb='100px'>

            {/* human skill benefits description */}
            <EpistoFlex2 direction={'column'}
                minWidth={'50%'} >
                {courseDetails.humanSkillBenefitsDescription}
            </EpistoFlex2>

            {/* human skill benefits chart  */}
            <EpistoFlex2 direction={'column'}
                minWidth={'50%'}>
                <EpistoRadarChart
                    title=""
                    areas={[{
                        name: 'Készségek',
                        value: courseDetails?.humanSkillBenefits.map(x => x.value) ?? []
                    }]}
                    radarIndicators={courseDetails.humanSkillBenefits.map(x => ({
                        name: x.text,
                        color: 'black',
                        max: 10
                    }))}
                    options={defaultCharts.radar}
                    style={{
                        width: '400px',
                        height: '300px'
                    }} />
            </EpistoFlex2>
        </EpistoFlex2>
    </EpistoFlex2>;
};
