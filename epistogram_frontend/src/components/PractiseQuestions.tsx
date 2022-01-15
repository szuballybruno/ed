import { Image } from "@chakra-ui/image";
import { Divider, Flex, Text } from "@chakra-ui/layout";
import { Player } from "@lottiefiles/react-lottie-player";
import { Typography } from "@mui/material";
import { useContext } from "react";
import { applicationRoutes } from "../configuration/applicationRoutes";
import { getAssetUrl, getRandomInteger } from "../static/frontendHelpers";
import { useNavigation } from "../services/core/navigatior";
import { translatableTexts } from "../static/translatableTexts";
import { CurrentUserContext } from "./system/AuthenticationFrame";
import { LoadingFrame } from "./system/LoadingFrame";
import { QuesitionView } from "./QuestionView";
import { EpistoButton } from "./universal/EpistoButton";
import { EpistoConinImage } from "./universal/EpistoCoinImage";
import { useAnswerPractiseQuestion, usePractiseQuestion } from "../services/api/questionApiService";
import { useCurrentCourseItemCode } from "../services/api/miscApiService";

const NoQuestionsAvailable = () => {
    const { navigate } = useNavigation()
    return <Flex pr="20px">

        <Flex direction={"column"}>

            <Text as={"text"} p={"20px 20px 10px 10px"} fontSize="13px">
                {translatableTexts.practiseQuestions.noMoreQuestionsGoWatchVideosOne}
            </Text>

            <Text as={"text"} p={"10px 20px 10px 10px"} fontSize="13px">
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
            <img
                src={getAssetUrl("/images/welcome3D.png")}
                alt=""
                style={{
                    objectFit: "contain",
                }} />
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

            <Text as={"text"} p="20px 20px 10px 10px">
                {translatableTexts.practiseQuestions.initialGreetingsFirst + " " + firstName + ","}
            </Text>

            <Text as={"text"} p="20px 20px 10px 10px">
                {translatableTexts.practiseQuestions.initialGreetingsSecond}
            </Text>

            <Text as={"text"} p="20px 20px 10px 10px">
                {translatableTexts.practiseQuestions.initialGreetingsThird}
            </Text>

            <Flex
                direction="column"
                width="100%"
                alignItems="center">

                <EpistoButton
                    variant="outlined"
                    style={{
                        color: "white"
                    }}
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

    const currentCourseItemCodeWrapper = useCurrentCourseItemCode();
    const currentCourseItemCode = currentCourseItemCodeWrapper?.currentCourseItemCode;

    console.log(currentCourseItemCode);

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
        error={practiseQuestionError}>

        {practiseQuestion && <Flex className="whall" wrap="wrap">

            <Flex
                position="absolute"
                top="-35"
                right="10"
                align="center"
                display={isCorrectAnswer ? undefined : "none"}>

                <Typography>
                    {translatableTexts.practiseQuestions.epistoCoinAquired_BeforeCoinIcon}
                </Typography>

                <EpistoConinImage />

                <Typography>
                    {translatableTexts.practiseQuestions.epistoCoinAquired_AfterCoinIcon}
                </Typography>
            </Flex>

            {/* question section */}
            <Flex
                flex="1"
                direction="column"
                margin="auto"
                minWidth="300px">

                <Typography
                    style={{
                        marginTop: 10,
                        fontSize: 18
                    }}
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
                    onlyShowAnswers={isAnswered}
                    coinsAcquired={null}
                    bonusCoinsAcquired={answerResults?.coinAcquires?.bonus ?? null} />

                <Flex
                    justifyContent="center"
                    display={isAnswered ? undefined : "none"}>

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
        </Flex>}

        {(!practiseQuestion && currentCourseItemCode) && <NoQuestionsAvailable />}
        {(!practiseQuestion && !currentCourseItemCode) && <InitialGreetings />}
    </LoadingFrame>
}
