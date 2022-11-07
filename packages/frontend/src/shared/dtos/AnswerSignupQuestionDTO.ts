import {Id} from '../types/versionId';

export type AnswerSignupQuestionDTO = {
    questionVersionId: Id<'QuestionVersion'>;
    answerVersionId: Id<'AnswerVersion'>;
}
