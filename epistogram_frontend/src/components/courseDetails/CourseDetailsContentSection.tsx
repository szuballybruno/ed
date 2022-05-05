import { Flex } from '@chakra-ui/react';
import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import React from 'react';
import { CourseDetailsDTO } from '../../shared/dtos/CourseDetailsDTO';
import { Environment } from '../../static/Environemnt';
import { roundNumber } from '../../static/frontendHelpers';
import { EpistoFont } from '../controls/EpistoFont';

export const CourseDetailsContentSection = (props: { courseDetails: CourseDetailsDTO }) => {

    const { courseDetails } = props;

    const formatSeconds = (seconds: number) => {

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = roundNumber(seconds - (minutes * 60));

        return `${minutes}m ${remainingSeconds}s`;
    };

    return <Flex direction={'column'}
        mt={10}>

        {courseDetails
            .modules
            .map((module, index) => {

                return <Accordion
                    key={index}
                    defaultExpanded={index === 0}>

                    <AccordionSummary
                        expandIcon={<ExpandMore />}>

                        <EpistoFont>
                            {module.name}
                        </EpistoFont>
                    </AccordionSummary>

                    <AccordionDetails>
                        {module
                            .videos
                            .map((video, index) => <Flex
                                key={index}
                                align="center"
                                justify="space-between">

                                <Flex align="center">
                                    {/* icon */}
                                    <img
                                        src={Environment.getAssetUrl('images/videosdatasheetd3D.png')}
                                        alt={''}
                                        className="square50"
                                        style={{ margin: '10px', objectFit: 'contain' }} />

                                    {/* name */}
                                    <EpistoFont
                                        fontSize={'fontExtraSmall'}
                                        style={{
                                            fontWeight: 'bold'
                                        }}>

                                        {video.title}
                                    </EpistoFont>
                                </Flex>

                                <EpistoFont>
                                    {formatSeconds(video.length)}
                                </EpistoFont>
                            </Flex>)}
                    </AccordionDetails>
                </Accordion>;
            })}
    </Flex >;
};
