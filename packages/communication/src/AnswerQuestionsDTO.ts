import { Id } from '@episto/commontypes';
import { GivenAnswerDTO } from './questionAnswer/GivenAnswerDTO';

export type AnswerQuestionsDTO = {
    answerSessionId: Id<'AnswerSession'>;
    givenAnswers: GivenAnswerDTO[];
}
