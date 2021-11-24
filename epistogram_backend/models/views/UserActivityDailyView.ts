import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class UserSessionDailyView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    date: Date;

    @ViewColumn()
    sessionCount: number;
}
