import {Flex} from '@chakra-ui/react';
import React from 'react';
import {ExamPlayerDataDTO} from '../../shared/dtos/ExamPlayerDataDTO';
import {Environment} from '../../static/Environemnt';
import {ArrayBuilder} from '../../static/frontendHelpers';

import {translatableTexts} from '../../static/translatableTexts';
import {EpistoFont} from '../controls/EpistoFont';
import {ExamLayout} from './ExamLayout';
import {ExamResultStats} from './ExamResultStats';

export const ExamGreetSlide = (props: {
    exam: ExamPlayerDataDTO,
    startExam: () => void
}) => {

    const {
        exam,
        startExam
    } = props;

    return <ExamLayout
        className='whall'
        justify='flex-start'
        overflowY='scroll'
        maxH='calc(100vh - 120px)'
        headerCenterText={exam.title}
        footerButtons={new ArrayBuilder()
            .addIf(exam.canTakeAgain, {
                title: exam.examStats ? 'Újrakezdés' : translatableTexts.exam.startExam,
                action: startExam
            })
            .getArray()}>

        <EpistoFlex2
            direction="column"
            align="center"
            justify='center'
            background='var(--transparentWhite70)'
            flex="1"
            p='20px'
            className="whall roundBorders mildShadow">
            <img
                src={Environment.getAssetUrl('/images/examCover.png')}
                alt={''}
                style={{
                    objectFit: 'contain',
                    maxHeight: 200,
                    margin: '30px 0'
                }} />

            <EpistoFont
                fontSize="fontHuge">

                {exam.title}
            </EpistoFont>

            <EpistoFont
                style={{
                    padding: '30px',
                    maxWidth: '500px'
                }}>

                {exam.examStats
                    ? translatableTexts.exam.greetTextRetry
                    : translatableTexts.exam.greetText}
            </EpistoFont>

            {/* if previously completed  */}
            {exam.examStats && <>

                {/* stats label */}
                <EpistoFont>

                    {translatableTexts.exam.statsLabelText}
                </EpistoFont>

                {/* stats */}
                <EpistoFlex2
                    mt="20px"
                    align="center"
                    justify="center"
                    width="100%">

                    <ExamResultStats
                        stats={exam.examStats} />
                </EpistoFlex2>
            </>}
        </EpistoFlex2>
    </ExamLayout>;
};
