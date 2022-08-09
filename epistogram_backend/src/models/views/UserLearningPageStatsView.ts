import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserLearningPageStatsView {

    @ViewColumn()
    @XViewColumn()
    userId: Id<'User'>;

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