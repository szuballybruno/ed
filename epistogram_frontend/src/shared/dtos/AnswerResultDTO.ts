import { Answer } from '../../models/entity/answer/Answer';
import { GivenAnswer } from '../../models/entity/GivenAnswer';
import { Id } from '../types/versionId';
import { CoinAcquireResultDTO } from './CoinAcquireResultDTO';

export type AnswerResultDTO = {
    givenAnswerIds: Id<GivenAnswer>[];
    correctAnswerIds: Id<Answer>[];
    isCorrect: boolean;
    coinAcquires: {
        normal: CoinAcquireResultDTO | null;
        bonus: CoinAcquireResultDTO | null;
    };
}