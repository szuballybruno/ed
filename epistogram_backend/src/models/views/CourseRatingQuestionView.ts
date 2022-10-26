import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { CourseRatingQuesitonType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';


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