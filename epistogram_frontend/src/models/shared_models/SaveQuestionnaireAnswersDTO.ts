import { QuestionAnswerDTO } from "./QuestionAnswerDTO";

export type SaveQuestionnaireAnswersDTO = {
    invitationToken: string,
    answers: QuestionAnswerDTO[]
}