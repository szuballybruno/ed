import { Flex, Text } from "@chakra-ui/react";
import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import React from 'react';
import { ExamDTO } from "../../models/shared_models/ExamDTO";
import { useExamResults } from "../../services/examService";
import { translatableTexts } from "../../translatableTexts";
import StatisticsCard from "../statisticsCard/StatisticsCard";
import { ExamLayout } from './ExamLayout';
import { QuestionAnswer } from "./QuestionAnswer";
import { getAssetUrl } from "../../frontendHelpers";

export const ExamResultsSlide = (props: {
    exam: ExamDTO,
    continueCourse: () => void,
    answerSessionId: number,
}) => {

    const { answerSessionId, continueCourse, exam } = props;
    const { examResults } = useExamResults(answerSessionId);
    const questionsAnswers = examResults?.questions ?? [];

    const correctAnswersCount = questionsAnswers
        .filter(x => x.answers.some(y => y.isCorrect && y.answerId === x.givenAnswerId))
        .length;

    const questionsCount = questionsAnswers.length;
    const correctPercentage = Math.round((correctAnswersCount / questionsCount) * 100);

    const content = <Flex direction="column" className="whall" p="20px">

        {/* title */}
        <Text
            as="text"
            className="fontHuge"
            style={{
                padding: "20px 0 20px 0"
            }}>
            {translatableTexts.exam.resultsTitle}
        </Text>

        {/* stats */}
        <Flex w={"100%"} h={170} overflow="hidden">
            <StatisticsCard iconPath={getAssetUrl("/icons/exam_result_good_answer_count.svg")} suffix={"%"} title={"Helyes válaszok aránya"} value={"" + correctPercentage} />
            <StatisticsCard iconPath={getAssetUrl("/icons/exam_result_good_answer_percent.svg")} suffix={""} title={"Helyes válasz a kérdésekre"} value={`${correctAnswersCount}/${questionsCount}`} />
            <StatisticsCard iconPath={getAssetUrl("/icons/exam_result_time.svg")} suffix={"perc"} title={"Alatt teljesítetted a tesztet"} value={"66"} />
            <StatisticsCard iconPath={getAssetUrl("/icons/exam_result_top_percent.svg")} suffix={"%"} title={"Az összes felhaszáló között"} value={"top 20"} />
        </Flex>

        {/* results */}
        <Flex id="resultsRoot" flex="1" overflow="hidden" direction="column">

            {/* list header */}
            <Flex
                alignItems={"center"}
                justifyContent={"space-between"}>

                <Text
                    as="text"
                    className="fontHuge">
                    {translatableTexts.exam.questionsLabel}
                </Text>

                <Flex w={"25%"}>
                    <Text
                        as="text"
                        className="fontHuge">
                        {translatableTexts.exam.answerLabel}
                    </Text>
                </Flex>
            </Flex>

            {/* answers */}
            <Flex
                id="answersRoot"
                direction={"column"}
                flex={1}
                mt={10}
                overflowY="scroll">

                {questionsAnswers
                    .map((question, index) => {

                        const isCorrectAnswer = question
                            .answers
                            .some(x => x.answerId === question.givenAnswerId && x.isCorrect);

                        const bgColor = (() => {

                            if (isCorrectAnswer)
                                return "var(--mildGreen)";

                            return "var(--mildRed)";
                        })();

                        return <Accordion>

                            {/* question */}
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                                aria-controls="panel1a-content"
                                id="panel1a-header">

                                <Flex w={"77%"}>
                                    <Typography>
                                        {question.text}
                                    </Typography>
                                </Flex>

                                <Flex w={"23%"}>
                                    <Typography style={{
                                        padding: "2px 15px",
                                        backgroundColor: bgColor,
                                        borderRadius: 7
                                    }}>
                                        {isCorrectAnswer
                                            ? translatableTexts.exam.correctAnswer
                                            : translatableTexts.exam.incorrectAnswer}
                                    </Typography>
                                </Flex>
                            </AccordionSummary>

                            {/* answers */}
                            <AccordionDetails>
                                <Flex
                                    direction="column"
                                    flex={1}>
                                    {question
                                        .answers
                                        .map((answer, index) => {

                                            const isSelected = answer.answerId === question.givenAnswerId;

                                            return <QuestionAnswer
                                                margin="5px"
                                                answerText={answer.answerText}
                                                isSelected={isSelected}
                                                isCorrect={answer.isCorrect} />
                                        })}
                                </Flex>
                            </AccordionDetails>
                        </Accordion>
                    })}
            </Flex>
        </Flex>
    </Flex>;

    return <ExamLayout
        headerCenterText={exam.title}
        handleNext={continueCourse}
        nextButtonTitle={translatableTexts.exam.continueCourse}
        showNextButton
        content={content} />
};
