import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserStatsView {

    @ViewColumn()
    @XViewColumn()
    userId: number;

    @ViewColumn()
    @XViewColumn()
    userEmail: string;

    @ViewColumn()
    @XViewColumn()
    completedVideoCount: number;

    @ViewColumn()
    @XViewColumn()
    completedExamCount: number;

    @ViewColumn()
    @XViewColumn()
    successfulExamCount: number;

    @ViewColumn()
    @XViewColumn()
    totalVideoPlaybackSeconds: number;

    @ViewColumn()
    @XViewColumn()
    totalGivenAnswerCount: number;

    @ViewColumn()
    @XViewColumn()
    totalCorrectGivenAnswerCount: number;

    @ViewColumn()
    @XViewColumn()
    totalSessionLengthSeconds: number;

    @ViewColumn()
    @XViewColumn()
    averageSessionLengthSeconds: number;

    @ViewColumn()
    @XViewColumn()
    totalAnswerSessionSuccessRate: number;

    @ViewColumn()
    @XViewColumn()
    totalCorrectAnswerRate: number;

    @ViewColumn()
    @XViewColumn()
    totalSuccessfulExamRate: number;
}