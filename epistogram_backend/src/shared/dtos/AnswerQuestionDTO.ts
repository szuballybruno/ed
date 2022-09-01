import {Id} from '../types/versionId';

export type AnswerQuestionDTO = {
    questionVersionId: Id<'QuestionVersion'>;
    answerVersionIds: Id<'AnswerVersion'>[];
    answerSessionId: Id<'AnswerSession'>;
    elapsedSeconds: number;
}
