import { CoinTransactionReasonType } from '../types/sharedTypes';

export class CoinTransactionDTO {
    id: number;
    userId: number;
    creationDate: Date;
    amount: number;
    videoTitle: string;
    questionText: string;
    reason: CoinTransactionReasonType;
}