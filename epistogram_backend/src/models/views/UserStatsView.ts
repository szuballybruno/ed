import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class UserStatsView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    userEmail: string;

    @ViewColumn()
    completedVideoCount: number;

    @ViewColumn()
    completedExamCount: number;

    @ViewColumn()
    successfulExamCount: number;

    @ViewColumn()
    totalVideoPlaybackSeconds: number;

    @ViewColumn()
    totalGivenAnswerCount: number;

    @ViewColumn()
    totalCorrectGivenAnswerCount: number;

    @ViewColumn()
    totalSessionLengthSeconds: number;

    @ViewColumn()
    averageSessionLengthSeconds: number;

    @ViewColumn()
    totalAnswerSessionSuccessRate: number;

    @ViewColumn()
    totalCorrectAnswerRate: number;

    @ViewColumn()
    totalSuccessfulExamRate: number;
}