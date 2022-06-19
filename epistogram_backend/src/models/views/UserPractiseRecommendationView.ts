import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})

export class UserPractiseRecommendationView {

    @ViewColumn()
    @XViewColumn()
    questionId: number;

    @ViewColumn()
    @XViewColumn()
    videoId: number;

    @ViewColumn()
    @XViewColumn()
    courseVersionId: number;

    @ViewColumn()
    @XViewColumn()
    totalGivenAnswerCount: number;

    @ViewColumn()
    @XViewColumn()
    totalCorrectAnswerCount: number;

    @ViewColumn()
    @XViewColumn()
    userId: number;

    @ViewColumn()
    @XViewColumn()
    lastThreeAnswerAverage: number;

}