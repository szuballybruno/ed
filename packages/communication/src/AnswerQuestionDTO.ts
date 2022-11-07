import { Id } from '@episto/commontypes';
import { GivenAnswerDTO } from './questionAnswer/GivenAnswerDTO';

export type AnswerQuestionDTO = {
    answerSessionId: Id<'AnswerSession'>;
    givenAnswer: GivenAnswerDTO;
}
