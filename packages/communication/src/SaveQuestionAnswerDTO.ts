import { QuestionAnswerDTO } from './QuestionAnswerDTO';

export type SaveQuestionAnswerDTO = {
    invitationToken: string,
    questionAnswer: QuestionAnswerDTO;
}