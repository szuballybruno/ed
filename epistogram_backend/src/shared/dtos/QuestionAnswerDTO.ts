import { Id } from '../types/versionId';

export type QuestionAnswerDTO = {
    answerSessionId: Id<'AnswerSession'>;
    questionId: Id<'Question'>;
    answerId: Id<'Answer'>;
}