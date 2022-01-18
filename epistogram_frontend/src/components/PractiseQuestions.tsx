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
import { EpistoButton } from "./controls/EpistoButton";
import { EpistoConinImage } from "./universal/EpistoCoinImage";
import { useAnswerPractiseQuestion, usePractiseQuestion } from "../services/api/questionApiService";
import { useCurrentCourseItemCode } from "../services/api/miscApiService";
import { EpistoFont } from "./controls/EpistoFont";

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
            height="100%">

            <EpistoFont
                classes={[
                    "fontSmall"
                ]}
                style={{
                    padding: "20px 20px 10px 10px"
                }}>

                {translatableTexts.practiseQuestions.initialGreetingsFirst + " " + firstName + ","}
            </EpistoFont>

            <EpistoFont
                classes={[
                    "fontSmall"
                ]}
                style={{
                    padding: "20px 20px 10px 10px"
                }}>

                {translatableTexts.practiseQuestions.initialGreetingsSecond}
            </EpistoFont>

            <EpistoFont
                classes={[
                    "fontSmall"
                ]}
                style={{
                    padding: "20px 20px 10px 10px"
                }}>

                {translatableTexts.practiseQuestions.initialGreetingsThird}
            </EpistoFont>

            <Flex
                direction="column"
                width="100%"
                alignItems="center"
                mt="10px">

                <EpistoButton
                    variant={"colored"}
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

        {/* if practise question is found */}
        {practiseQuestion
            ? (
                <Flex className="whall" wrap="wrap">

                    <Flex
                        position="absolute"
                        top="-35"
                        right="10"
                        align="center"
                        display={isCorrectAnswer ? undefined : "none"}>

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
                                display: isAnswered ? undefined : "none",
                                marginTop: 10,
                                fontSize: 18,
                                alignSelf: "center"
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
                </Flex>
            )
            : currentCourseItemCode
                ? <NoQuestionsAvailable />
                : <InitialGreetings />}
    </LoadingFrame>
}
