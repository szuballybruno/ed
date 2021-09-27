import { Flex } from "@chakra-ui/layout"
import { Typography } from "@mui/material";
import { usePractiseQuestion } from "../services/dataService"
import { LoadingFrame } from "./HOC/LoadingFrame";
import { VideoQuestionnaire } from "./universal/VideoQuestionnaire";

export const PractiseQuestions = () => {

    const { practiseQuestion, practiseQuestionError, practiseQuestionState } = usePractiseQuestion();

    return <LoadingFrame
        className="whall"
        loadingState={practiseQuestionState}
        error={practiseQuestionError}>

        {practiseQuestion
            ? <VideoQuestionnaire
                answerSessionId={-1}
                onAnswered={() => { }}
                question={practiseQuestion!} />
            : <Flex>
                <Typography>There are no available practise questions, go watch some videos!</Typography>
            </Flex>}
    </LoadingFrame>
}