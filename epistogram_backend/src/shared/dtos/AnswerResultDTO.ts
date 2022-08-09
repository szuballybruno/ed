import { Id } from '../types/versionId';
import { CoinAcquireResultDTO } from './CoinAcquireResultDTO';

export type AnswerResultDTO = {
    givenAnswerIds: Id<'Answer'>[];
    correctAnswerIds: Id<'Answer'>[];
    isCorrect: boolean;
    coinAcquires: {
        normal: CoinAcquireResultDTO | null;
        bonus: CoinAcquireResultDTO | null;
    };
}