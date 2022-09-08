import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import React from 'react';
import { CourseDetailsDTO } from '../../shared/dtos/CourseDetailsDTO';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { EpistoHeader } from '../EpistoHeader';

export const CourseDetailsRequirementsSection = (props: { courseDetails: CourseDetailsDTO }) => {

    const { courseDetails } = props;

    return <EpistoFlex2
        mt={10}
        width="100%"
        height={500}
        direction="column"
        align="flex-start">

        {/* technical requirements title */}
        <EpistoHeader
            text={translatableTexts.courseDetails.requirementsSection.technicalRequirementsForCourse}
            type="strong"
            my={10}
            mt={40} />

        {/* technical requirements */}
        <EpistoFlex2 direction="column">
            {courseDetails
                .technicalRequirements
                .map((x, index) => (
                    <EpistoFlex2
                        key={index}
                        align="center">

                        <SettingsSuggestIcon
                            style={{ color: 'var(--deepBlue)', marginRight: '10px' }}
                            className="square35" />

                        <EpistoFont>
                            {x}
                        </EpistoFont>
                    </EpistoFlex2>
                ))}
        </EpistoFlex2>
    </EpistoFlex2>;
};
