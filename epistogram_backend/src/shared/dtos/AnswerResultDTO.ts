import {Id} from '../types/versionId';
import {CoinAcquireResultDTO} from './CoinAcquireResultDTO';

export type AnswerResultDTO = {
    givenAnswerVersionIds: Id<'AnswerVersion'>[];
    correctAnswerVersionIds: Id<'AnswerVersion'>[];
    isCorrect: boolean;
    coinAcquires: CoinAcquireResultDTO[];
}
