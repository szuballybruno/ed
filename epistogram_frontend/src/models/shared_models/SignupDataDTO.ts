import { QuestionAnswerDTO } from "./QuestionAnswerDTO";
import { QuestionDTO } from "./QuestionDTO";

export type SignupDataDTO = {
    questionAnswers: QuestionAnswerDTO[],
    questions: QuestionDTO[]
}