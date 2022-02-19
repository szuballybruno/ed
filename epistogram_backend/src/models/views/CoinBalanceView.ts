import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class CoinBalanceView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    coinBalance: number;
}
