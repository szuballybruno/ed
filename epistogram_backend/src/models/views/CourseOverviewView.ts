import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { Course } from '../entity/course/Course';
import { User } from '../entity/User';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CourseOverviewView {

    @ViewColumn()
    @XViewColumn()
    userId: Id<User>;

    @ViewColumn()
    @XViewColumn()
    courseId: Id<Course>;

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