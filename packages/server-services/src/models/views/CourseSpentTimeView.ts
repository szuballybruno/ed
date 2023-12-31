import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class CourseSpentTimeView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    totalExamSessionElapsedTime: number;

    @XViewColumn()
    totalVideoWatchElapsedTime: number;

    @XViewColumn()
    totalVideoQuestionElapsedTime: number;

    @XViewColumn()
    totalPractiseQuestionElapsedTime: number;

    @XViewColumn()
    totalSpentSeconds: number;
}