import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { CourseStageNameType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';


export class AvailableCourseView {

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    canView: boolean;

    @XViewColumn()
    isCompleted: boolean;

    @XViewColumn()
    isStarted: boolean;

    @XViewColumn()
    isFeatured: boolean;

    @XViewColumn()
    isRecommended: boolean;

    @XViewColumn()
    currentItemCode: string;

    @XViewColumn()
    stageName: CourseStageNameType;

    @XViewColumn()
    title: string;

    @XViewColumn()
    filePath: string;

    @XViewColumn()
    categoryId: Id<'CourseCategory'>;

    @XViewColumn()
    categoryName: string;

    @XViewColumn()
    subCategoryId: Id<'CourseCategory'>;

    @XViewColumn()
    subCategoryName: string;

    @XViewColumn()
    teacherFirstName: string;

    @XViewColumn()
    teacherLastName: string;

    @XViewColumn()
    totalVideoSumLengthSeconds: number;

    @XViewColumn()
    totalVideoCount: number;

    @XViewColumn()
    difficulty: number;

    @XViewColumn()
    benchmark: number;

    @XViewColumn()
    completedVideoCount: number;

    @XViewColumn()
    requiredCompletionDate: Date;

    @XViewColumn()
    finalExamScorePercentage: number;
}
