import {Id} from '../types/versionId';
import {CoinAcquireResultDTO} from './CoinAcquireResultDTO';

export type AnswerResultDTO = {
    givenAnswerVersionIds: Id<'AnswerVersion'>[];
    correctAnswerVersionIds: Id<'AnswerVersion'>[];
    isCorrect: boolean;
    coinAcquires: {
        normal: CoinAcquireResultDTO | null;
        bonus: CoinAcquireResultDTO | null;
    };
}
