import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserSpentTimeRatioView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    totalExamSessionElapsedTime: number;

    @ViewColumn()
    totalVideoWatchElapsedTime: number;

    @ViewColumn()
    totalQuestionElapsedTime: number;

    @ViewColumn()
    otherTotalSpentSeconds: number;
}
