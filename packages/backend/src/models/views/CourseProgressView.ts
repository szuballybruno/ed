import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { CourseStageNameType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';

export class CourseProgressView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    totalCourseItemCount: number;

    @XViewColumn()
    completedCourseItemCount: number;

    @XViewColumn()
    progressPercentage: number;

    @XViewColumn()
    courseTitle: string;

    @XViewColumn()
    currentItemCode: string;

    @XViewColumn()
    currentStageName: CourseStageNameType;
}