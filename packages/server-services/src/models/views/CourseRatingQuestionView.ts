import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class CourseRatingQuestionView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    groupId: Id<'Group'>;

    @XViewColumn()
    groupName: string;

    @XViewColumn()
    questionId: Id<'CourseRatingQuestion'>;

    @XViewColumn()
    questionText: string;

    @XViewColumn()
    questionType: string;

    @XViewColumn()
    answerValue: number;

    @XViewColumn()
    answerText: string;
}