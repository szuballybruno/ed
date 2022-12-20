import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class CourseOverviewView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    totalSpentSeconds: number;

    @XViewColumn()
    completedVideoCount: number;

    @XViewColumn()
    answeredVideoQuestionCount: number;

    @XViewColumn()
    questionSuccessRate: number;

    @XViewColumn()
    examSuccessRateAverage: number;

    @XViewColumn()
    finalExamSuccessRate: number;

    @XViewColumn()
    coinsAcquired: number;
}