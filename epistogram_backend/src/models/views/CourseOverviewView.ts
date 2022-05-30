import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CourseOverviewView {

    @ViewColumn()
    @XViewColumn()
    userId: number;

    @ViewColumn()
    @XViewColumn()
    courseId: number;

    @ViewColumn()
    @XViewColumn()
    totalSpentSeconds: number;

    @ViewColumn()
    @XViewColumn()
    completedVideoCount: number;

    @ViewColumn()
    @XViewColumn()
    answeredVideoQuestionCount: number;

    @ViewColumn()
    @XViewColumn()
    questionSuccessRate: number;

    @ViewColumn()
    @XViewColumn()
    examSuccessRateAverage: number;

    @ViewColumn()
    @XViewColumn()
    finalExamSuccessRate: number;

    @ViewColumn()
    @XViewColumn()
    coinsAcquired: number;
}