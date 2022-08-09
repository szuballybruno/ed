import { Id } from '../types/versionId';

export type AnswerQuestionDTO = {
    questionVersionId: Id<'QuestionVersion'>;
    answerIds: Id<'Answer'>[];
    answerSessionId: Id<'AnswerSession'>;
    elapsedSeconds: number;
}