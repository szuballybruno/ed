import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class CoinTransactionView {

    @ViewColumn()
    id: number;

    @ViewColumn()
    userId: number;

    @ViewColumn()
    creationDate: Date;

    @ViewColumn()
    amount: number;

    @ViewColumn()
    videoTitle: string;

    @ViewColumn()
    questionText: string;

    @ViewColumn()
    reason: string;
}