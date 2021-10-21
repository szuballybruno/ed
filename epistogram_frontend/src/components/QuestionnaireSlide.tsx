import { QuestionDTO } from "../models/shared_models/QuestionDTO";
import { useSaveExamAnswer } from "../services/examService";
import { useShowErrorDialog } from "../services/notifications";
import { QuestionSlides, useQuestionSlidesState } from "./exam/QuestionSlides";
import { LoadingFrame } from "./HOC/LoadingFrame";
import {Divider, Flex, Text} from "@chakra-ui/react";
import {EpistoButton} from "./universal/EpistoButton";
import {getAssetUrl, PagingType, usePaging} from "../frontendHelpers";
import {LinearProgress, Radio, Checkbox, Typography} from "@mui/material";
import {ArrowBack, ArrowForward, Grid4x4} from "@mui/icons-material";
import React from "react";
import classes from "./signup/signupWrapper.module.scss";
import {Grid} from "@chakra-ui/layout";

export const QuestionnaireSlide = (props: {
    slidesState: PagingType<number>
    questions: QuestionDTO[],
    answerSessionId: number,
    onExamFinished: () => void
}) => {

    const {
        questions,
        answerSessionId,
        onExamFinished
    } = props;

    const showError = useShowErrorDialog();

    // save exam answer
    const {
        saveExamAnswer,
        saveExamAnswerState,
        answerResult,
        clearExamAnswerCache
    } = useSaveExamAnswer();

    // handle save selected answer
    const answerQuestionAsync = async (answerId: number, questionId: number) => {

        try {

            await saveExamAnswer({
                answerSessionId: answerSessionId,
                answerId,
                questionId
            });
        } catch (e) {

            showError(e);
        }
    }

    const state = useQuestionSlidesState({
        questions: questions,
        answerQuestionAsync: answerQuestionAsync,
        getSelectedAnswerId: () => answerResult?.givenAnswerId ?? null,
        correctAnswerId: answerResult?.correctAnswerId ?? null,
        onNextOverNavigation: onExamFinished,
        clearAnswerCache: clearExamAnswerCache
    });
    const {
        currentQuestion,
        selectedAnswerId,
        handleNext,
        questionnaireProgressbarValue,
        allowQuickNext
    } = state;


    const handleAnswerSelectedAsync = async (answerId: number) => {

        try {

            await answerQuestionAsync(answerId, currentQuestion!.questionId);

            if (allowQuickNext)
                handleNext();
        } catch (e) {

            showError(e);
        }
    }


    console.log(answerResult);

    return <LoadingFrame
        className="whall"
        loadingState={saveExamAnswerState}
        flex="1">

        <Flex
            direction={"column"}
            alignItems={"center"}
            w={"100%"}
            px={40}
            bgColor={"#7CC0C21A"}
        >
            <Flex
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                w={"100%"}
                h={60}
                pl={5}
            >
                <Flex
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    px={2}
                    w={"20%"}
                    h={60}
                >

                    <Flex mx={3}>
                        <Text as="text">{""}</Text>
                    </Flex>

                </Flex>
                <Flex
                    direction={"column"}
                    flex={1}
                    h={60}
                    maxW={450}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Text
                        as="text"
                        fontSize={"1.1rem"}
                    >{"A vizsga neve"}</Text>
                </Flex>
                <Flex
                    justifyContent={"flex-end"}
                    w={"20%"}
                >
                    <EpistoButton style={{
                        minWidth: 170
                    }} variant={"outlined"}>
                        Kilépek a tesztből
                    </EpistoButton>
                </Flex>
            </Flex>
            <Divider w={"100%"} h={1} bgColor={"grey"} />
            <Flex direction={"column"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  w={"80%"}
                  flex={1}>
                <Flex
                    justifyContent={"center"}
                    alignItems={"flex-end"}

                >
                    <Flex
                        justifyContent={"flex-start"}
                        w={"80%"}
                        flexWrap={"wrap-reverse"}
                        alignItems={"center"}
                    >
                        <Flex
                            justifyContent={"flex-end"}
                            maxH={300}>
                            <img
                                src={getAssetUrl("/images/examCover.jpg")}
                                alt={""}
                                style={{
                                    objectFit: "contain",
                                    maxHeight: 300
                                }}
                            />
                        </Flex>
                        <Flex
                            direction={"column"}
                            justifyContent={"flex-end"}
                            alignItems={"flex-start"}
                            w={"100%"}
                            px={7}
                            flex={1}
                            minW={300}
                        >
                            <Flex
                                direction={"column"}
                                alignItems={"center"}
                                justifyContent={"center"}
                                maxW={800}
                            >
                                <Text
                                    as="text"
                                    fontSize={"1.3rem"}
                                >
                                    {currentQuestion!.questionText}
                                </Text>
                            </Flex>
                            <Flex
                                direction={"column"}
                                alignItems={"center"}
                                justifyContent={"center"}
                                maxW={600}
                                py={20}
                            >
                                <Text
                                    as="text"
                                    fontSize={"1.1rem"}
                                >
                                    {"De benne van az is, hogy a kérdés értelmezéséhez szükség van valamilyen kisebb-nagyon descriptionre is, például ha jogászokat akarunk képezni (márpedig akarunk), akkor egy-egy törvény paragrafusát ne a headingbe, hanem inkább a descriptionba írják bele az okosok."}
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>


                </Flex>
                <Flex
                    direction={"row"}
                    justifyContent={"center"}
                    pt={10}
                    w={"100%"}
                    mx={200}
                >
                    <Grid
                        templateColumns={"repeat(2, 1fr)"}
                        gridAutoRows={"minmax(0,1fr)"}
                        direction={"column"}
                        gridGap={15}
                        flex={1}
                    >
                        {currentQuestion!.answers.map((answer, index) => {
                            return <Flex
                                key={answer.answerId}
                                alignItems={"center"}
                                borderRadius={7}
                                minW={150}
                                cursor={"pointer"}
                                onClick={(e) => {
                                    const selectedAnswerId = answer.answerId;
                                    handleAnswerSelectedAsync(selectedAnswerId);
                                }}
                                style={{
                                    backgroundColor: answer.answerId === selectedAnswerId ? "rgba(124,192,194,0.34)" : "unset",
                                    margin: "5px",
                                    padding: "0 0 0 10px",
                                    border: "2px solid var(--epistoTeal)"
                                }}
                            >
                                <Checkbox checked={answer.answerId === selectedAnswerId} size="small" value="advanced" />
                                <Typography style={{ fontSize: "14px"}}>
                                    {answer.answerText}
                                </Typography>
                            </Flex>
                        })}
                    </Grid>
                </Flex>
            </Flex>
            <Flex
                w={"100%"}
                h={80}
                mb={20}
                boxSizing={"border-box"}
                p={10}
            >
                <Flex w={"100%"} h={"100%"}  boxSizing={"border-box"} bgColor={"white"} borderRadius={7} p={8}>
                    <Flex h={46} w={46} alignItems={"center"} justifyContent={"center"}>
                        <EpistoButton
                            onClick={() => {

                            }} style={{
                            backgroundColor: "#7CC0C240",
                            borderRadius: 7,
                            width: 46,
                            height: 46
                        }}  >
                            <ArrowBack />
                        </EpistoButton>
                    </Flex>
                    <Flex flex={1}  px={10} alignItems={"center"}>
                        <LinearProgress variant="determinate" value={questionnaireProgressbarValue} style={{ flex: "1", marginRight: "10px" }} />
                        <Typography variant="body2" className={classes.progressPercentage} >
                            {`${Math.round(questionnaireProgressbarValue,)}%`}
                        </Typography>
                    </Flex>
                    <Flex>

                    </Flex>
                    <Flex>
                        <EpistoButton
                            variant={"colored"}
                            onClick={selectedAnswerId ? handleNext : undefined}
                            style={{
                                width: 200,
                                height: 46
                            }}>
                            Következő
                            <ArrowForward />
                        </EpistoButton>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    </LoadingFrame>
}
