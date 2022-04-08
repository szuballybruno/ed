import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserSessionDailyView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    sessionCount: number;
}
