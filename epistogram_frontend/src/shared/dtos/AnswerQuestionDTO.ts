import { Id } from '../types/versionId';
import { GivenAnswerDTO } from './questionAnswer/GivenAnswerDTO';

export type AnswerQuestionsDTO = {
    answerSessionId: Id<'AnswerSession'>;
    givenAnswers: GivenAnswerDTO[];
}
