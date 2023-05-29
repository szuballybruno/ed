import { Grid } from '@chakra-ui/react';
import { CourseDetailsDTO } from '@episto/communication';
import { Done, SettingsSuggest } from '@mui/icons-material';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { EpistoHeader } from '../EpistoHeader';

export const MobileCourseDetailsSummarySection = (props: {
    courseDetails: CourseDetailsDTO
}) => {

    const { courseDetails } = props;

    return <>
        <EpistoFlex2
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
            <Grid
                templateColumns="100%"
                gap="10px"
                width="100%">

                {courseDetails
                    .skillBenefits
                    .map((skillBenefit, index) => <EpistoFlex2
                        key={index}
                        align="center">

                        {/* icon */}
                        <Done
                            className="square30"
                            style={{
                                marginRight: '10px',
                                color: 'var(--eduptiveDeepDarkGreen)'
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
            <EpistoFlex2
                direction='column'
                width="100%"
                mb='100px'>

                {/* human skill benefits description */}
                <EpistoFlex2 direction={'column'}
                    minWidth={'50%'} >
                    {courseDetails.humanSkillBenefitsDescription}
                </EpistoFlex2>
            </EpistoFlex2>

            {/* technical requirements title */}
            {courseDetails.technicalRequirements[0] && <EpistoHeader
                text={translatableTexts.courseDetails.requirementsSection.technicalRequirementsForCourse}
                type="strong"
                my='10px' />}

            {/* technical requirements */}
            {courseDetails.technicalRequirements[0] && <EpistoFlex2 direction="column">
                {courseDetails
                    .technicalRequirements
                    .map((x, index) => (
                        <EpistoFlex2
                            key={index}
                            align="center">

                            <SettingsSuggest
                                style={{ color: 'var(--eduptiveDeepDarkGreen)', marginRight: '10px' }}
                                className="square35" />

                            <EpistoFont>
                                {x}
                            </EpistoFont>
                        </EpistoFlex2>
                    ))}
            </EpistoFlex2>}
        </EpistoFlex2>
    </>;
};