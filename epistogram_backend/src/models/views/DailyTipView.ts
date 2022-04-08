import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class DailyTipView {

    @ViewColumn()
    dailyTipId: number;

    @ViewColumn()
    userId: number;

    @ViewColumn()
    description: string;

    @ViewColumn()
    videoFilePath: string;

    @ViewColumn()
    lastOccurrenceDate: Date;

    @ViewColumn()
    isNew: boolean;

    @ViewColumn()
    isCurrentTip: boolean;
}