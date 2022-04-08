import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserSessionView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    sessionStartDate: Date;

    @ViewColumn()
    sessionEndDate: Date;
}
