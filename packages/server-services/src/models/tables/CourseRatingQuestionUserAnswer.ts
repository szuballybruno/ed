import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class CourseRatingQuestionUserAnswer {

    @XViewColumn()
    id: Id<'CourseRatingQuestionUserAnswer'>;

    @XViewColumn()
    text: string | null;

    @XViewColumn()
    value: number | null;

    @XViewColumn()
    courseRatingQuestionId: Id<'CourseRatingQuestion'>;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;
}