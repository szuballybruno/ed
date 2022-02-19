import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class ActivityStreakView {

    @ViewColumn()
    id: number;

    @ViewColumn()
    userId: number;

    @ViewColumn()
    startDate: Date;

    @ViewColumn()
    endDate: Date;

    @ViewColumn()
    isFinalized: boolean;

    @ViewColumn()
    length_days: number;
}
