import { useEffect } from 'react';
import { useAnswerPractiseQuestion, usePractiseQuestion } from '../../services/api/questionApiService';
import { Id } from '@episto/commontypes';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { QuesitionView } from '../QuestionView';
import { EpistoConinImage } from '../universal/EpistoCoinImage';
import { NoQuestionsAvailable } from './NoQuestionsAvailable';

export const PractiseQuestions = (props: {
    setCoinsAcquired: (isCoinsAcquired: boolean) => void
}) => {

    const { setCoinsAcquired } = props;

    const {
        practiseQuestion,
        practiseQuestionState,
        refetchPractiseQuestion
    } = usePractiseQuestion();

    const {
        answerQuestionAsync,
        answerResults,
        answerQuestionState,
        clearAnswerResults
    } = useAnswerPractiseQuestion();

    const { coinAcquires } = answerResults ?? { coinAcquires: [] };
    const coinsAcquired = coinAcquires.length > 0;

    const handleAnswerQuestionAsync = async (answerVersionId: Id<'AnswerVersion'>[]) => {

        if (!practiseQuestion)
            return;

        await answerQuestionAsync({
            answerSessionId: -1 as any, // ignore, not used,
            givenAnswer: {
                answerVersionIds: answerVersionId,
                elapsedSeconds: 0,
                questionVersionId: practiseQuestion.questionVersionId
            }
        });
    };

    useEffect(() => {

        setCoinsAcquired(coinsAcquired);
    }, [coinsAcquired]);

    /**
     * Go to next question
     */
    const handleNextQuestion = () => {

        clearAnswerResults();
        refetchPractiseQuestion();
    };

    const isCorrectAnswer = answerResults?.isCorrect;
    const isAnswered = !!answerResults;

    // const gifSource = Environment.getAssetUrl('feedback_gifs/' + (isCorrectAnswer
    //     ? 'correct_' + getRandomInteger(1, 3)
    //     : 'incorrect_' + getRandomInteger(1, 3)) + '.gif');

    /**
     * When no questions are available, 
     * return no more questions view
     */
    if (!practiseQuestion)
        return <NoQuestionsAvailable />;

    /**
     * If questions are available, 
     * return practise questions view 
     */
    return <>

        <EpistoFlex2
            position="absolute"
            top="-35"
            right="10"
            align="center"
            display={isCorrectAnswer ? undefined : 'none'}>

            <EpistoFont>
                {translatableTexts.practiseQuestions.epistoCoinAquired_BeforeCoinIcon}
            </EpistoFont>

            <EpistoConinImage />

            <EpistoFont>
                {translatableTexts.practiseQuestions.epistoCoinAquired_AfterCoinIcon}
            </EpistoFont>
        </EpistoFlex2>

        {/* question section */}
        <EpistoFlex2
            flex="1"
            direction="column"
            margin="auto"
            minWidth="300px">

            <EpistoFont
                style={{
                    display: isAnswered ? undefined : 'none',
                    marginTop: 20,
                    fontSize: 16,
                    alignSelf: 'center'
                }}>

                {practiseQuestion.questionText}
            </EpistoFont>

            <QuesitionView
                isPractise
                answerQuesitonAsync={handleAnswerQuestionAsync}
                loadingProps={{ loadingState: answerQuestionState }}
                question={practiseQuestion}
                onlyShowAnswers={isAnswered}
                answerResult={answerResults} />

            <EpistoFlex2
                justifyContent="center"
                display={isAnswered ? undefined : 'none'}>

                <EpistoFont
                    style={{
                        display: isAnswered ? undefined : 'none',
                        fontSize: 16,
                        marginRight: 15,
                        alignSelf: 'center'
                    }}>

                    {isCorrectAnswer
                        ? translatableTexts.practiseQuestions.answerIsCorrect
                        : translatableTexts.practiseQuestions.answerIsIncorrect}
                </EpistoFont>

                <EpistoButton
                    variant="colored"
                    style={{
                        fontSize: 15
                    }}
                    onClick={handleNextQuestion}>

                    {translatableTexts.practiseQuestions.nextQuestion}
                </EpistoButton>
            </EpistoFlex2>
        </EpistoFlex2>
    </>;
};
