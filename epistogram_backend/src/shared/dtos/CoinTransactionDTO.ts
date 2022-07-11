import { CoinTransaction } from "../../models/entity/CoinTransaction";
import { User } from "../../models/entity/User";
import { Id } from "../types/versionId";

export class CoinTransactionDTO {
    id: Id<'CoinTransaction'>;
    userId: Id<'User'>;
    creationDate: Date;
    amount: number;
    videoTitle: string;
    questionText: string;
    reason: string;
}