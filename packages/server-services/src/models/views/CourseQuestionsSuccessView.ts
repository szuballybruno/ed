import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class CourseQuestionsSuccessView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    totalAnswerCount: number;

    @XViewColumn()
    correctAnswerCount: number;
}