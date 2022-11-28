import { XViewColumn } from '@episto/xorm';
import { CourseRatingQuesitonType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';


export class CourseRatingQuestionView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    groupId: number;

    @XViewColumn()
    groupName: string;

    @XViewColumn()
    questionId: Id<'CourseRatingQuestion'>;

    @XViewColumn()
    questionText: string;

    @XViewColumn()
    questionType: CourseRatingQuesitonType;

    @XViewColumn()
    answerValue: number;

    @XViewColumn()
    answerText: string;
}