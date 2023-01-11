import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

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