import { Id } from '@episto/commontypes';

export type QuestionAnswerDTO = {
    answerSessionId: Id<'AnswerSession'>;
    questionId: Id<'Question'>;
    answerId: Id<'Answer'>;
}