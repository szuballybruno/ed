import { Box, FlexProps, Text } from '@chakra-ui/react';
import { LinearProgress } from '@mui/material';
import React from 'react';
import { CourseLearningDTO } from '../../shared/dtos/CourseLearningDTO';
import { Environment } from '../../static/Environemnt';
import { formatTimespan, roundNumber } from '../../static/frontendHelpers';
import { EpistoButton, EpistoButtonPropsType } from '../controls/EpistoButton';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { FlexFloat } from '../controls/FlexFloat';
import { SmallStat } from '../universal/SmallStat';

export const LearningCourseStatsTile = (props: {
    course: CourseLearningDTO,
    actionButtons: EpistoButtonPropsType[]
} & FlexProps) => {

    const { course, children, actionButtons, ...css } = props;
    const {
        title,
        subCategoryName,
        thumbnailImageURL,
        isComplete,
        totalVideoCount,
        completedVideoCount,
        totalVideoQuestionCount,
        answeredVideoQuestionCount,
        totalSpentSeconds,
        completedCourseItemCount,
        totalCourseItemCount,
    } = course;

    const formattedSpentTime = formatTimespan(totalSpentSeconds);
    const progressPercentage = roundNumber(completedCourseItemCount / totalCourseItemCount * 100);

    return <FlexFloat
        className="whall"
        direction="column"
        borderRadius="10px"
        position="relative"
        overflow="hidden"
        shadow={'0 0 10px 1px #CCC'}
        background="var(--transparentWhite70)"
        p="5"
        justifyContent="space-between"
        {...css}>

        {/* cover image box */}
        <Box
            flex="1"
            position="relative"
            minHeight={150}
            maxHeight={150}>

            {/* cover image */}
            <img
                className="whall"
                style={{
                    objectFit: 'cover',
                    borderRadius: 10,
                    position: 'absolute'
                }}
                src={thumbnailImageURL}
                alt="" />

            {/* is complete label */}
            {isComplete && <EpistoFlex2
                position="absolute"
                top={10}
                right={0}
                justify="flex-end">

                <EpistoFlex2
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    padding="4px"
                    width={130}
                    bg="#97CC9B"
                    borderRadius="7px 0 0 7px">

                    <img
                        src={Environment.getAssetUrl('course_exam_tile_icons/tile_badge_completed.svg')}
                        alt={''}
                        style={{
                            width: 20,
                            height: 20
                        }}
                    />

                    <Text
                        textTransform={'uppercase'}
                        color="white">

                        Teljesítve!
                    </Text>
                </EpistoFlex2>
            </EpistoFlex2>}
        </Box>

        {/* content */}
        <EpistoFlex2 p="10px"
            direction="column">

            {/* category  */}
            <EpistoFont
                style={{
                    color: 'grey'
                }}>

                {subCategoryName}
            </EpistoFont>

            {/* title */}
            <EpistoFont
                style={{
                    fontWeight: 'bold',
                    fontSize: 'large'
                }}>

                {title}
            </EpistoFont>

            {/* small stats */}
            <EpistoFlex2 mt={7}
                justify="space-evenly">

                {/* spent time  */}
                <SmallStat
                    iconUrl={Environment.getAssetUrl('images/time3D.png')}
                    text={formattedSpentTime} />

                {/* videos  */}
                <SmallStat
                    iconUrl={Environment.getAssetUrl('images/videos3D.png')}
                    text={`${totalVideoCount}/${completedVideoCount}`} />

                {/* video questions */}
                <SmallStat
                    iconUrl={Environment.getAssetUrl('images/rightanswerontile3D.png')}
                    text={`${totalVideoQuestionCount}/${answeredVideoQuestionCount}`} />
            </EpistoFlex2>

            {/* course progress bar chart */}
            <EpistoFlex2
                direction={'row'}
                alignItems={'center'}
                mt={7}
                width="100%"
                height="10px">

                <LinearProgress
                    variant="determinate"
                    style={{
                        width: '100%',
                    }}
                    value={progressPercentage} />

                <EpistoFlex2 m="0 5px 0 20px">

                    {`${progressPercentage}%`}
                </EpistoFlex2>

            </EpistoFlex2>
        </EpistoFlex2>

        {/* buttons */}
        <EpistoFlex2 mt="10px">

            {actionButtons.map((button, index) => {
                return <EpistoButton
                    key={index}
                    style={{ flex: '1' }}
                    {...button}>

                    {button.children}
                </EpistoButton>;
            })}

        </EpistoFlex2>
    </FlexFloat>;
};
