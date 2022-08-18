import { Flex } from '@chakra-ui/layout';
import { useCurrentCourseItemCode } from '../../services/api/miscApiService';
import { useAnswerPractiseQuestion, usePractiseQuestion } from '../../services/api/questionApiService';
import { Id } from '../../shared/types/versionId';
import { Environment } from '../../static/Environemnt';
import { getRandomInteger } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFont } from '../controls/EpistoFont';
import { QuesitionView } from '../QuestionView';
import { EpistoConinImage } from '../universal/EpistoCoinImage';
import { Greetings } from './Greetings';
import { NoQuestionsAvailable } from './NoQuestionsAvailable';

export const PractiseQuestions = () => {

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

    const currentCourseItemCodeWrapper = useCurrentCourseItemCode();
    const currentCourseItemCode = currentCourseItemCodeWrapper?.currentCourseItemCode;

    const handleAnswerQuestionAsync = async (answerId: Id<'Answer'>[]) => {

        await answerQuestionAsync(answerId, practiseQuestion!.questionVersionId);
    };

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
                <Flex className="whall"
                    wrap="wrap">

                    <Flex
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
                    </Flex>

                    {/* question section */}
                    <Flex
                        flex="1"
                        direction="column"
                        margin="auto"
                        minWidth="300px">

                        <EpistoFont
                            style={{
                                display: isAnswered ? undefined : 'none',
                                marginTop: 10,
                                fontSize: 18,
                                alignSelf: 'center'
                            }}>

                            {isCorrectAnswer
                                ? translatableTexts.practiseQuestions.answerIsCorrect
                                : translatableTexts.practiseQuestions.answerIsIncorrect}
                        </EpistoFont>

                        <QuesitionView
                            answerQuesitonAsync={handleAnswerQuestionAsync}
                            correctAnswerIds={answerResults?.correctAnswerIds ?? []}
                            loadingProps={{ loadingState: answerQuestionState, error: answerQuestionError }}
                            question={practiseQuestion}
                            onlyShowAnswers={isAnswered}
                            coinsAcquired={answerResults?.coinAcquires?.normal?.amount ?? null}
                            bonusCoinsAcquired={answerResults?.coinAcquires?.bonus ?? null} />

                        <Flex
                            justifyContent="center"
                            display={isAnswered ? undefined : 'none'}>

                            <EpistoButton
                                variant="colored"
                                style={{
                                    fontSize: 15
                                }}
                                onClick={handleNextQuestion}>

                                {translatableTexts.practiseQuestions.nextQuestion}
                            </EpistoButton>
                        </Flex>
                    </Flex>
                </Flex>
            )
            : currentCourseItemCode
                ? <NoQuestionsAvailable />
                : <Greetings />}
    </>;
};
