import { ExpandMore } from '@mui/icons-material';
import { useLatestExamResults } from '../../../../services/api/examApiService';
import { Id } from '@episto/commontypes';
import { translatableTexts } from '../../../../static/translatableTexts';
import { EpistoFlex2 } from '../../../controls/EpistoFlex';
import { EpistoFont } from '../../../controls/EpistoFont';
import { ExamResultStats } from '../../../exam/ExamResultStats';
import { QuestionAnswer } from '../../../exam/QuestionAnswer';
import { ChipSmall } from '../../courses/ChipSmall';
import { MUI } from '../../../controls/MUIControls';

export const AdminUserExamsMoreInfoControl = (props: {
    answerSessionId?: Id<'AnswerSession'>
}) => {

    const { answerSessionId } = props;

    const { examResults } = useLatestExamResults(answerSessionId!);
    const questionsAnswers = examResults?.questions ?? [];

    return <EpistoFlex2
        overflowY='scroll'
        maxH='100%'>

        <EpistoFlex2
            direction="column"
            className='roundBorders mildShadow'
            width='100%'
            height='100%'
            flex='1'
            background='var(--transparentWhite70)'
            px={'20px'}
            justify='flex-start'>

            {/* title */}
            <EpistoFont
                className="font22"
                style={{
                    padding: '20px 0 20px 0'
                }}>
                {'Modul témazárójának eredménye'}
            </EpistoFont>

            {/* stats */}
            <ExamResultStats
                stats={examResults?.examStats ?? null} />

            {/* results */}
            <EpistoFlex2
                id="resultsRoot"
                flex="1"
                direction="column">

                {/* list header */}
                <EpistoFlex2
                    alignItems={'center'}
                    mt="20px"
                    justifyContent={'space-between'}>

                    <EpistoFlex2 flex='1'>
                        <EpistoFont
                            className="font22">
                            {'Kérdésekre adott válaszok'}
                        </EpistoFont>
                    </EpistoFlex2>

                </EpistoFlex2>

                {/* answers */}
                <EpistoFlex2
                    id="answersRoot"
                    direction={'column'}
                    flex={1}
                    margin={'10px 5px 5px 5px'}
                    pb='100px'
                    height='100%'
                    boxSizing='border-box'>

                    {questionsAnswers
                        .map((question, index) => {

                            const displayState = (() => {

                                if (question.state === 'CORRECT')
                                    return { color: 'var(--mildGreen)', text: translatableTexts.exam.correctAnswer };

                                if (question.state === 'MIXED')
                                    return { color: 'var(--deepOrange)', text: 'Részben helyes' };

                                if (question.state === 'INCORRECT')
                                    return { color: 'var(--mildRed)', text: translatableTexts.exam.incorrectAnswer };

                                throw new Error('Incorrect state!');
                            })();

                            return <MUI.Accordion
                                key={index}>

                                {/* question */}
                                <MUI.AccordionSummary
                                    expandIcon={<ExpandMore />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header">

                                    <EpistoFlex2 flex={'1'}>
                                        <EpistoFont
                                            margin='0 5px 0 0'>
                                            {question.text}
                                        </EpistoFont>
                                    </EpistoFlex2>

                                    <EpistoFlex2
                                        direction={'row'}>

                                        <EpistoFont>

                                            ({question.score}/{question.maxScore} pont)
                                        </EpistoFont>

                                        <ChipSmall
                                            style={{
                                                margin: '0 10px 0 30px'
                                            }}
                                            text={displayState.text}
                                            color={displayState.color} />

                                    </EpistoFlex2>
                                </MUI.AccordionSummary>

                                {/* answers */}
                                <MUI.AccordionDetails>
                                    <EpistoFlex2
                                        direction="column"
                                        flex={1}>
                                        {question
                                            .answers
                                            .map((answer, index) => {

                                                return <QuestionAnswer
                                                    key={index}
                                                    margin="5px"
                                                    answerText={answer.answerText}
                                                    isSelected={answer.isGiven}
                                                    isCorrect={answer.isCorrect} />;
                                            })}
                                    </EpistoFlex2>
                                </MUI.AccordionDetails>
                            </MUI.Accordion>;
                        })}
                </EpistoFlex2>
            </EpistoFlex2>
        </EpistoFlex2>
    </EpistoFlex2>;
};