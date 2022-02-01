import { Flex } from "@chakra-ui/react"
import { ExamPlayerDataDTO } from "../../models/shared_models/ExamPlayerDataDTO"
import { ExamQuestions } from "../exam/ExamQuestions"

export const PretestSubpage = () => {

    const asd = {};

    return (
        <ExamQuestions
            exam={exam}
            answerSessionId={answerSessionId}
            onExamFinished={handleExamFinished} />
    )
}