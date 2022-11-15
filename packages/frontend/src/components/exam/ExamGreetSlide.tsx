import { ExamPlayerDataDTO } from '@episto/communication';
import { Responsivity } from '../../helpers/responsivity';
import { Environment } from '../../static/Environemnt';
import { ArrayBuilder } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { ExamLayout } from './ExamLayout';
import { ExamResultStats } from './ExamResultStats';

export const ExamGreetSlide = (props: {
    exam: ExamPlayerDataDTO,
    startExam: () => void
}) => {

    const {
        exam,
        startExam
    } = props;

    const { isMobile } = Responsivity
        .useIsMobileView();

    return <ExamLayout
        className={!isMobile ? 'whall' : undefined}
        justify='flex-start'
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
            //justify='center'
            width={!isMobile ? '100%' : undefined}
            height={!isMobile ? '100%' : undefined}
            background='var(--transparentWhite70)'
            p='20px'
            className="roundBorders mildShadow">

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
            {exam.examStats && <EpistoFlex2
                direction='column'
                width='100%'
                height='100%'>

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
            </EpistoFlex2>}
        </EpistoFlex2>
    </ExamLayout>;
};
