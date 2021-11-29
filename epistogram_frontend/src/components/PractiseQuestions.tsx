import { Image } from "@chakra-ui/image";
import { Flex, Text } from "@chakra-ui/layout";
import { Player } from "@lottiefiles/react-lottie-player";
import { Typography } from "@mui/material";
import { useContext } from "react";
import { applicationRoutes } from "../configuration/applicationRoutes";
import { getAssetUrl, getRandomInteger } from "../frontendHelpers";
import { useAnswerPractiseQuestion, useCurrentCourseItemCode, usePractiseQuestion } from "../services/dataService";
import { useNavigation } from "../services/navigatior";
import { translatableTexts } from "../translatableTexts";
import { CurrentUserContext } from "./system/AuthenticationFrame";
import { LoadingFrame } from "./system/LoadingFrame";
import { QuesitionView } from "./QuestionView";
import { EpistoButton } from "./universal/EpistoButton";
import { EpistoConinImage } from "./universal/EpistoCoinImage";

const NoQuestionsAvailable = () => {
    const { navigate } = useNavigation()
    return <Flex>
        <Flex direction={"column"}>
            <Text as={"text"} p={"20px 20px 10px 20px"}>
                {translatableTexts.practiseQuestions.noMoreQuestionsGoWatchVideosOne}
            </Text>
            <Text as={"text"} p={"20px 20px 10px 20px"}>
                {translatableTexts.practiseQuestions.noMoreQuestionsGoWatchVideosTwo}
                <Text
                    as="text"
                    onClick={() => navigate("/courses")}
                    color="var(--epistoTeal)"
                    fontWeight="bold"
                    cursor="pointer">
                    {translatableTexts.practiseQuestions.noMoreQuestionsGoWatchVideosButton}
                </Text>
            </Text>

        </Flex>
        <Flex>
            <Player
                autoplay
                loop
                src={getAssetUrl("lottie_json/writing_exam.json")}
                style={{ height: '300px', width: '300px' }}
            />
        </Flex>
    </Flex>
}

const InitialGreetings = () => {

    const { navigate } = useNavigation()
    const firstName = useContext(CurrentUserContext)!.firstName;

    return <Flex
        direction="row"
        alignItems="center">
        <Flex
            direction="column"
            justifyContent="flex-start"
            h="100%">
            <Text as={"text"} p="20px 20px 10px 20px">
                {translatableTexts.practiseQuestions.initialGreetingsFirst + " " + firstName + ","}
            </Text>
            <Text as={"text"} p="20px 20px 10px 20px">
                {translatableTexts.practiseQuestions.initialGreetingsSecond}
            </Text>
            <Text as={"text"} p="20px 20px 10px 20px">
                {translatableTexts.practiseQuestions.initialGreetingsThird}
            </Text>
            <Flex
                direction="column"
                width="100%"
                alignItems="center">
                <EpistoButton
                    variant={"outlined"}
                    onClick={() => {
                        navigate(applicationRoutes.availableCoursesRoute.route)
                    }}>
                    {translatableTexts.practiseQuestions.goToCourses}
                </EpistoButton>
            </Flex>
        </Flex>
        <Flex>
            <Player
                autoplay
                loop
                src={getAssetUrl("lottie_json/initial_greetings.json")}
                style={{ height: '300px', width: '300px' }}
            />
        </Flex>
    </Flex>
}

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

    const currentCourseItemCode = useCurrentCourseItemCode();

    const handleAnswerQuestionAsync = async (answerId: number[]) => {

        await answerQuestionAsync(answerId, practiseQuestion!.questionId);
    }

    const handleNextQuestion = () => {

        clearAnswerResults();
        refetchPractiseQuestion();
    }

    const isCorrectAnswer = answerResults?.isCorrect;
    const isAnswered = !!answerResults;

    const gifSource = getAssetUrl("feedback_gifs/" + (isCorrectAnswer
        ? "correct_" + getRandomInteger(1, 3)
        : "incorrect_" + getRandomInteger(1, 3)) + ".gif");

    return <LoadingFrame
        className="whall"
        loadingState={practiseQuestionState}
        error={practiseQuestionError}>

        {practiseQuestion && <Flex className="whall" wrap="wrap">

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
                    correctAnswerIds={answerResults?.correctAnswerIds ?? []}
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
        </Flex>}

        {(!practiseQuestion && currentCourseItemCode) && <NoQuestionsAvailable />}
        {(!practiseQuestion && !currentCourseItemCode) && <InitialGreetings />}
    </LoadingFrame>
}
