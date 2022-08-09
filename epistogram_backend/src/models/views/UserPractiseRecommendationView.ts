import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})

export class UserPractiseRecommendationView {

    @ViewColumn()
    @XViewColumn()
    questionId: Id<'Question'>;

    @ViewColumn()
    @XViewColumn()
    videoId: Id<'Video'>;

    @ViewColumn()
    @XViewColumn()
    courseVersionId: Id<'CourseVersion'>;

    @ViewColumn()
    @XViewColumn()
    totalGivenAnswerCount: number;

    @ViewColumn()
    @XViewColumn()
    totalCorrectAnswerCount: number;

    @ViewColumn()
    @XViewColumn()
    userId: Id<'User'>;

    @ViewColumn()
    @XViewColumn()
    lastThreeAnswerAverage: number;

}