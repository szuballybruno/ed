import { Flex, Grid } from "@chakra-ui/react";
import { useState } from "react";
import { getAssetUrl, useIntParam, usePaging } from "../../static/frontendHelpers";
import { translatableTexts } from "../../static/translatableTexts";
import { EpistoFont } from "../controls/EpistoFont";
import { ExamLayout } from "../exam/ExamLayout";
import { ExamLayoutContent } from "../exam/ExamLayoutContent";
import { QuestionAnswer } from "../exam/QuestionAnswer";

export const PrequizSubpage = () => {

    const courseId = useIntParam("courseId");

    const questions = [
        {
            title: "asd",
            answers: [
                {
                    id: 1,
                    title: "as1"
                }
            ]
        },
        {
            title: "asd2",
            answers: [
                {
                    id: 1,
                    title: "as2"
                }
            ]
        }
    ];

    const paging = usePaging(questions);
    const question = paging.currentItem;
    const currentQuestionIndex = paging.currentIndex;
    const totalQuestionsCount = questions.length;

    const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>();
    const hasSelectedAnswer = !!selectedAnswerId;
    const progressPercentage = (currentQuestionIndex + 1) / totalQuestionsCount * 100;

    const handleNextAsync = () => {

        paging.next();
    }

    const handleBackAsync = () => {

        paging.previous();
    }

    return (
        <ExamLayout
            headerLeftItem={<Flex align="center">

                <img
                    alt=""
                    src={getAssetUrl("course_page_icons/curriculum_test.svg")}
                    className="square35" />

                <EpistoFont style={{ marginLeft: "10px" }}>
                    {totalQuestionsCount}/{currentQuestionIndex + 1}
                </EpistoFont>
            </Flex>}
            headerCenterText={"Prequiz courseId:" + courseId}
            handleNext={handleNextAsync}
            showNextButton={hasSelectedAnswer}
            nextButtonTitle={translatableTexts.exam.nextQuestion}
            progressValue={progressPercentage}
            handleBack={currentQuestionIndex !== 0 ? handleBackAsync : undefined}>

            <ExamLayoutContent
                title={question?.title ?? ""}>

                <Grid
                    templateColumns="repeat(2, 1fr)"
                    gridAutoRows="minmax(0,1fr)"
                    direction="column"
                    gridGap="10px"
                    flex="1">

                    {question && question
                        .answers
                        .map((answer, index) => {

                            const isAnswerSelected = answer.id === selectedAnswerId;

                            return <QuestionAnswer
                                onClick={() => setSelectedAnswerId(answer.id)}
                                answerText={answer.title}
                                isSelected={isAnswerSelected} />
                        })}
                </Grid>
            </ExamLayoutContent>
        </ExamLayout>
    )
}