import {Text, Box, Flex} from "@chakra-ui/layout";
import {Typography} from "@mui/material";
import {useAnswerPractiseQuestion, usePractiseQuestion} from "../services/dataService";
import {LoadingFrame} from "./HOC/LoadingFrame";
import {QuesitionView} from "./QuestionView";
import {EpistoButton} from "./universal/EpistoButton";
import NextPlanIcon from '@mui/icons-material/NextPlan';
import {EpistoConinImage} from "./universal/EpistoCoinImage";
import {Image} from "@chakra-ui/image";
import {getAssetUrl, getRandomInteger} from "../frontendHelpers";
import {translatableTexts} from "../translatableTexts";
import {Player} from "@lottiefiles/react-lottie-player";

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

    const handleAnswerQuestionAsync = async (answerId) => {

        await answerQuestionAsync(answerId, practiseQuestion!.questionId);
    }

    const handleNextQuestion = () => {

        clearAnswerResults();
        refetchPractiseQuestion();
    }

    const isCorrectAnswer = answerResults?.correctAnswerId === answerResults?.givenAnswerId;
    const isAnswered = !!answerResults?.givenAnswerId;

    const gifSource = getAssetUrl("feedback_gifs/" + (isCorrectAnswer
        ? "correct_" + getRandomInteger(1, 3)
        : "incorrect_" + getRandomInteger(1, 3)) + ".gif");

    return <LoadingFrame
        className="whall"
        loadingState={practiseQuestionState}
        error={practiseQuestionError}>

        {practiseQuestion
            ? <Flex className="whall" wrap="wrap">

                {/* gif section */}
                <Flex
                    display={isAnswered ? undefined : "none"}
                    align="center"
                    flex="1">

                    <Flex direction="column">
                        <Image
                            minWidth="200px"
                            minHeight="200px"
                            flex="1"
                            alignSelf="stretch"
                            margin="20px 30px 0 30px"
                            objectFit="contain"
                            src={gifSource} />

                        <Flex
                            align="center"
                            alignSelf="center"
                            flexBasis="50px"
                            display={isCorrectAnswer ? undefined : "none"}>
                            <Typography>
                                {translatableTexts.practiseQuestions.epistoCoinAquired_BeforeCoinIcon}
                            </Typography>

                            <EpistoConinImage />

                            <Typography>
                                {translatableTexts.practiseQuestions.epistoCoinAquired_AfterCoinIcon}
                            </Typography>
                        </Flex>
                    </Flex>
                </Flex>

                {/* question section */}
                <Flex
                    flex="1"
                    direction="column"
                    margin="auto"
                    minWidth="300px">

                    <Typography
                        display={isAnswered ? undefined : "none"}
                        variant="h5"
                        alignSelf="center">
                        {isCorrectAnswer
                            ? translatableTexts.practiseQuestions.answerIsCorrect
                            : translatableTexts.practiseQuestions.answerIsIncorrect}
                    </Typography>

                    <QuesitionView
                        answerQuesitonAsync={handleAnswerQuestionAsync}
                        correctAnswerId={answerResults?.correctAnswerId ?? null}
                        selectedAnswerId={answerResults?.givenAnswerId ?? null}
                        loadingProps={{ loadingState: answerQuestionState, error: answerQuestionError }}
                        question={practiseQuestion}
                        onlyShowAnswers={isAnswered} />

                    <Flex
                        justifyContent="center"
                        display={isAnswered ? undefined : "none"}>

                        <EpistoButton
                            variant="outlined"
                            onClick={handleNextQuestion}>

                            {translatableTexts.practiseQuestions.nextQuestion}
                        </EpistoButton>
                    </Flex>
                </Flex>
            </Flex>
            : <Flex>
                <Flex direction={"column"}>
                    <Text as={"text"} p={20}>
                        {translatableTexts.practiseQuestions.noMoreQuestionsGoWatchVideos}
                    </Text>
                </Flex>
                <Flex>
                    <Player
                        autoplay
                        loop
                        src={getAssetUrl("test_your_knowledge_lotties/writing_exam.json")}
                        style={{height: '300px', width: '300px'}}
                    />
                </Flex>
            </Flex>}
    </LoadingFrame>
}
