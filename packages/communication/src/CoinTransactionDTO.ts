import { Id } from '@episto/commontypes';

export class CoinTransactionDTO {
    id: Id<'CoinTransaction'>;
    userId: Id<'User'>;
    creationDate: Date;
    amount: number;
    videoTitle: string;
    questionText: string;
    reason: string;
}