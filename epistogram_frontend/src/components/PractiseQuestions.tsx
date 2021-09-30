import { Flex } from "@chakra-ui/layout";
import { Typography } from "@mui/material";
import { useAnswerPractiseQuestion, usePractiseQuestion } from "../services/dataService";
import { LoadingFrame } from "./HOC/LoadingFrame";
import { QuesitionView } from "./QuestionView";
import { EpistoButton } from "./universal/EpistoButton";
import NextPlanIcon from '@mui/icons-material/NextPlan';

export const PractiseQuestions = () => {

    const { practiseQuestion, practiseQuestionError, practiseQuestionState, refetchPractiseQuestion } = usePractiseQuestion();
    const { answerQuestionAsync, answerResults, answerQuestionError, answerQuestionState, clearAnswerResults } = useAnswerPractiseQuestion();

    const handleAnswerQuestionAsync = async (answerId) => {

        await answerQuestionAsync(answerId, practiseQuestion!.questionId);
    }

    const handleNextQuestion = () => {

        clearAnswerResults();
        refetchPractiseQuestion();
    }

    return <LoadingFrame
        className="whall"
        loadingState={practiseQuestionState}
        error={practiseQuestionError}>

        {practiseQuestion
            ? <Flex
                direction="column"
                className="whall" >
                <QuesitionView
                    answerQuesitonAsync={handleAnswerQuestionAsync}
                    correctAnswerId={answerResults?.correctAnswerId ?? null}
                    selectedAnswerId={answerResults?.givenAnswerId ?? null}
                    loadingProps={{ loadingState: answerQuestionState, error: answerQuestionError }}
                    question={practiseQuestion} />

                <Flex
                    justifyContent="center"
                    display={answerResults?.correctAnswerId ? undefined : "none"}>

                    <EpistoButton
                        variant="colored"
                        icon={<NextPlanIcon style={{ marginRight: "10px" }}></NextPlanIcon>}
                        onClick={handleNextQuestion}>
                        Kovetkezo kerdes
                    </EpistoButton>
                </Flex>
            </Flex>
            : <Flex>
                <Typography>There are no available practise questions, go watch some videos!</Typography>
            </Flex>}
    </LoadingFrame>
}