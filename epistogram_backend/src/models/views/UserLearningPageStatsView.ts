import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserLearningPageStatsView {

    @ViewColumn()
    @XViewColumn()
    userId: number;

    @ViewColumn()
    @XViewColumn()
    userEmail: string;

    @ViewColumn()
    @XViewColumn()
    videosToBeRepeatedCount: number;

    @ViewColumn()
    @XViewColumn()
    questionsToBeRepeatedCount: number;

    @ViewColumn()
    @XViewColumn()
    completedVideoCount: number;

    @ViewColumn()
    @XViewColumn()
    totalSessionLengthSeconds: number;

    @ViewColumn()
    @XViewColumn()
    answeredQuestionsCount: number;

    @ViewColumn()
    @XViewColumn()
    totalCorrectAnswerRate: number;

    @ViewColumn()
    @XViewColumn()
    rankInsideCompany: number;
}