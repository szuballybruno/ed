import { Id } from '../types/versionId';
import { GivenAnswerDTO } from './questionAnswer/GivenAnswerDTO';

export type AnswerQuestionDTO = {
    answerSessionId: Id<'AnswerSession'>;
    givenAnswer: GivenAnswerDTO;
}
