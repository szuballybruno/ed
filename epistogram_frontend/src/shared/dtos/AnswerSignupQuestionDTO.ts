import { Id } from '../types/versionId';

export type AnswerSignupQuestionDTO = {
    questionId: Id<'Question'>;
    answerId: Id<'Answer'>;
}