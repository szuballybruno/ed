import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

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