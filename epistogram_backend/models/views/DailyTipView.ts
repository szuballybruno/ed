import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class DailyTipView {

    @ViewColumn()
    dailyTipId: number;

    @ViewColumn()
    description: string;

    @ViewColumn()
    videoFilePath: string;

    @ViewColumn()
    isCurrentTip: boolean;
}