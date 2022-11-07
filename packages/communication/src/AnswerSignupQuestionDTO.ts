import {Id} from '@episto/commontypes';

export type AnswerSignupQuestionDTO = {
    questionVersionId: Id<'QuestionVersion'>;
    answerVersionId: Id<'AnswerVersion'>;
}
