import { Flex, Text } from '@chakra-ui/react';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { LinearProgress, Typography } from '@mui/material';
import React, { ReactNode } from 'react';
import { isString } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFont } from '../controls/EpistoFont';

export const ExamLayout = (props: {
    children: ReactNode,
    handleNext: () => void,
    handleBack?: () => void,
    nextButtonTitle: string,
    showNextButton?: boolean,
    exitExamAction?: () => void,
    headerCenterText?: string,
    headerLeftItem?: string | ReactNode,
    progressValue?: number,
    footerButtons?: ({ text: string, action: () => void })[]
}) => {

    const { exitExamAction, footerButtons, headerCenterText, showNextButton, headerLeftItem, children, progressValue, handleNext, handleBack, nextButtonTitle } = props;

    const footerButton = (title: string, action: () => void, icon?: any, iconFront?: any) => <EpistoButton
        variant={'colored'}
        onClick={action}
        style={{
            height: '40px',
            marginLeft: '10px'
        }}>
        {iconFront}
        {title}
        {icon}
    </EpistoButton>;

    return <Flex
        className="whall"
        direction="column"
        alignItems="center"
        px={40}>

        {/* header */}
        <Flex
            direction={'row'}
            alignItems={'center'}
            className="roundBorders mildShadow"
            background="var(--transparentWhite70)"
            width="100%"
            height={60}
            pl={20}>

            <Flex minWidth="200">
                {(headerLeftItem && isString(headerLeftItem)) && <Text as="text">
                    {headerLeftItem}
                </Text>}
                {(headerLeftItem && !isString(headerLeftItem)) && headerLeftItem}
            </Flex>


            <Flex
                flex="1"
                align="center"
                justify="center">
                <Text
                    as="text"
                    fontSize={'1.1rem'}>
                    {headerCenterText}
                </Text>
            </Flex>

            <Flex minWidth="200"
justify="flex-end">
                {exitExamAction && <EpistoButton
                    onClick={exitExamAction}
                    style={{
                        minWidth: 170
                    }}
                    variant={'outlined'}>

                    {translatableTexts.exam.exitExam}
                </EpistoButton>}
            </Flex>

        </Flex>

        {/* content */}
        <Flex
            flex="1"
            my="20px"
            minH="300px"
            width="100%"
            align="center"
            justify="center"
            direction="column">

            {children}
        </Flex>

        {/* footer */}
        <Flex
            width="100%"
            className="roundBorders mildShadow"
            background="var(--transparentWhite70)"
            height="80px"
            p={20}>

            {/* back button */}
            {handleBack && footerButton('Vissza', handleBack, undefined, <ArrowBack />)}

            {/* progress line */}
            <Flex
                flex={1}
                px={10}
                alignItems={'center'}>

                {progressValue !== undefined && <>
                    <LinearProgress
                        variant="determinate"
                        value={progressValue}

                        style={{
                            flex: '1',
                            marginRight: '10px'
                        }} />

                    <EpistoFont fontSize={'fontNormal14'}>
                        {`${Math.round(progressValue)}%`}
                    </EpistoFont>
                </>}
            </Flex>

            {/* other buttons */}
            {footerButtons && footerButtons
                .map(x => footerButton(x.text, x.action))}

            {/* continue button */}
            {showNextButton && footerButton(nextButtonTitle, handleNext, <ArrowForward />)}
        </Flex>
    </Flex>;
};
