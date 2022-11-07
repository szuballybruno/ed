import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { CourseStageNameType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';

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