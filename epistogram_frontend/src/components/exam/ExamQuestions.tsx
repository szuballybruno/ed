import { Grid } from "@chakra-ui/layout";
import { Flex, Text } from "@chakra-ui/react";
import { Typography } from "@mui/material";
import React, { useState } from "react";
import { getAssetUrl, PagingType, usePaging } from "../../static/frontendHelpers";
import { QuestionDTO } from "../../models/shared_models/QuestionDTO";
import { QuestionTypeEnum } from "../../models/shared_models/types/sharedTypes";
import { useShowErrorDialog } from "../../services/core/notifications";
import { translatableTexts } from "../../static/translatableTexts";
import { LoadingFrame } from "../system/LoadingFrame";
import { ExamLayout } from "./ExamLayout";
import { QuestionAnswer } from "./QuestionAnswer";
import { useSaveExamAnswer } from "../../services/api/examApiService";
import { ExamPlayerDataDTO } from "../../models/shared_models/ExamPlayerDataDTO";
import { EpistoButton } from "../controls/EpistoButton";
import { EpistoFont } from "../controls/EpistoFont";

export const ExamQuestions = (props: {
    exam: ExamPlayerDataDTO,
    slidesState: PagingType<number>
    questions: QuestionDTO[],
    answerSessionId: number,
    onExamFinished: () => void
}) => {

    const {
        questions,
        answerSessionId,
        onExamFinished,
        exam
    } = props;

    const showError = useShowErrorDialog();
    const { saveExamAnswer, saveExamAnswerState } = useSaveExamAnswer();
    const questionPaging = usePaging(questions, undefined, onExamFinished);
    const currentQuestion = questionPaging.currentItem!;
    const [selectedAnswerIds, setSelectedAnswerIds] = useState<number[]>([]);
    const progressPercentage = (100 / questions.length) * questionPaging.currentIndex;
    const isSingleAnswerMode = currentQuestion.typeId === QuestionTypeEnum.singleAnswer;
    const hasSelectedAnswer = selectedAnswerIds.length > 0;

    const handleNextAsync = async () => {

        try {

            await saveExamAnswer({
                answerSessionId: answerSessionId,
                answerIds: selectedAnswerIds!,
                questionId: currentQuestion.questionId
            });

            setSelectedAnswerIds([]);
            questionPaging.next();
        } catch (e) {

            showError(e);
        }
    }

    const setAnswerSelectedState = (answerId: number, isSelected: boolean) => {

        if (isSelected) {

            if (isSingleAnswerMode) {

                setSelectedAnswerIds([answerId]);
            }
            else {

                setSelectedAnswerIds([...selectedAnswerIds, answerId]);
            }
        }
        else {

            setSelectedAnswerIds(selectedAnswerIds
                .filter(x => x !== answerId));
        }
    }

    return <LoadingFrame
        className="whall"
        loadingState={saveExamAnswerState}
        flex="1"
        direction={"column"}
        alignItems={"center"}
        width="100%"
        px={40}>

        <ExamLayout
            headerLeftItem={<Flex align="center">

                <img
                    alt=""
                    src={getAssetUrl("course_page_icons/curriculum_test.svg")}
                    className="square35" />

                <EpistoFont style={{ marginLeft: "10px" }}>
                    {questions.length}/{questionPaging.currentIndex + 1}
                </EpistoFont>
            </Flex>}
            headerCenterText={exam.title}
            exitExamAction={() => { }}
            handleNext={handleNextAsync}
            showNextButton={hasSelectedAnswer}
            nextButtonTitle={translatableTexts.exam.nextQuestion}
            progressValue={progressPercentage}>

            <Flex
                direction={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                width={"80%"}
                flex={1}>

                <Flex
                    p="20px"
                    align="center">

                    <img
                        style={{
                            borderRadius: "50%",
                            padding: "8px",
                            width: "50px",
                            height: "50px",
                            marginRight: "30px"
                        }}
                        alt=""
                        src="https://static.thenounproject.com/png/92068-200.png"
                        className="tinyShadow" />

                    <Text
                        as="text"
                        fontSize={"1.3rem"}>
                        {currentQuestion.questionText}
                    </Text>
                </Flex>

                {/* answers */}
                <Flex
                    direction={"row"}
                    justifyContent={"center"}
                    pt={10}
                    width="100%"
                    mx={200}>

                    <Grid
                        templateColumns="repeat(2, 1fr)"
                        gridAutoRows="minmax(0,1fr)"
                        gridGap="10px">

                        {currentQuestion
                            .answers
                            .map((answer, index) => {

                                const isAnswerSelected = selectedAnswerIds
                                    .some(x => x === answer.answerId);

                                return <QuestionAnswer
                                    onClick={(isSelected) => setAnswerSelectedState(answer.answerId, isSelected)}
                                    answerText={answer.answerText}
                                    isSelected={isAnswerSelected} />
                            })}
                    </Grid>
                </Flex>
            </Flex>
        </ExamLayout>
    </LoadingFrame>
}
