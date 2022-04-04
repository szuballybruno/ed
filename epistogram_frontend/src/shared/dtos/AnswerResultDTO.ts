import { CoinAcquireResultDTO } from './CoinAcquireResultDTO';

export type AnswerResultDTO = {
    givenAnswerIds: number[];
    correctAnswerIds: number[];
    isCorrect: boolean;
    coinAcquires: {
        normal: CoinAcquireResultDTO | null;
        bonus: CoinAcquireResultDTO | null;
    };
}