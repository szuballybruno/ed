import { Dispatch, SetStateAction, useEffect } from 'react';
import { useCurrentCourseItemCode } from '../../services/api/miscApiService';
import { useAnswerPractiseQuestion, usePractiseQuestion } from '../../services/api/questionApiService';
import { Id } from '../../shared/types/versionId';
import { Environment } from '../../static/Environemnt';
import { getRandomInteger } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { QuesitionView } from '../QuestionView';
import { EpistoConinImage } from '../universal/EpistoCoinImage';
import { Greetings } from './Greetings';
import { NoQuestionsAvailable } from './NoQuestionsAvailable';

export const PractiseQuestions = (props: {
    setCoinsAcquired: Dispatch<SetStateAction<boolean>>
}) => {

    const { setCoinsAcquired } = props;

    const {
        practiseQuestion,
        practiseQuestionError,
        practiseQuestionState,
        refetchPractiseQuestion
    } = usePractiseQuestion();

    const {
        answerQuestionAsync,
        answerResults,
        answerQuestionError,
        answerQuestionState,
        clearAnswerResults
    } = useAnswerPractiseQuestion();

    //const isMobile = useIsMobileView();
    const currentCourseItemCodeWrapper = useCurrentCourseItemCode();
    const currentCourseItemCode = currentCourseItemCodeWrapper?.currentCourseItemCode;

    const handleAnswerQuestionAsync = async (answerVersionId: Id<'AnswerVersion'>[]) => {

        await answerQuestionAsync(answerVersionId, practiseQuestion!.questionVersionId);
    };

    useEffect(() => {
        setCoinsAcquired(!!answerResults?.coinAcquires?.normal?.amount);
    }, [answerResults?.coinAcquires]);

    const handleNextQuestion = () => {

        clearAnswerResults();
        refetchPractiseQuestion();
    };

    const isCorrectAnswer = answerResults?.isCorrect;
    const isAnswered = !!answerResults;

    const gifSource = Environment.getAssetUrl('feedback_gifs/' + (isCorrectAnswer
        ? 'correct_' + getRandomInteger(1, 3)
        : 'incorrect_' + getRandomInteger(1, 3)) + '.gif');

    return <>
        {/* if practise question is found */}
        {practiseQuestion
            ? (
                <EpistoFlex2
                    className="whall"
                    wrap="wrap">

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
                            answerQuesitonAsync={handleAnswerQuestionAsync}
                            correctAnswerVersionIds={answerResults?.correctAnswerVersionIds ?? []}
                            loadingProps={{ loadingState: answerQuestionState, error: answerQuestionError }}
                            question={practiseQuestion}
                            onlyShowAnswers={isAnswered}
                            coinsAcquired={answerResults?.coinAcquires?.normal?.amount ?? null}
                            bonusCoinsAcquired={answerResults?.coinAcquires?.bonus ?? null} />

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
                </EpistoFlex2>
            )
            : currentCourseItemCode
                ? <NoQuestionsAvailable />
                : <Greetings />}
    </>;
};
